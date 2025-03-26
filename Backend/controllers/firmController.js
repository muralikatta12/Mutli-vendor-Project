const express = require("express");
const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path');

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/"); // Destination folder where the uploaded files will be stored
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)); // Generating unique filename
    }
});

// Upload Middleware
const upload = multer({ storage: storage });

// Add Firm Function
const addFirm = async (req, res) => {
    try {
        const { firmName, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : undefined;

        // Find the Vendor by ID
        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found.' });
        }

        // Check if the Vendor already has a firm
        if (vendor.firm.length > 0) {
            return res.status(400).json({ message: "Vendor can only have one firm." });
        }

        // Create a new Firm
        const firm = new Firm({
            firmName,
            area,
            category,
            region,
            offer,
            image,
            vendor: vendor._id
        });

        // Save the Firm and Update the Vendor
        const savedFirm = await firm.save();
        vendor.firm.push(savedFirm._id);
        await vendor.save();

        console.log("Firm added successfully with ID:", savedFirm._id);
        return res.status(201).json({ message: 'Firm added successfully.', data: savedFirm._id });

    } catch (error) {
        console.error("Error in addFirm:", error);
        return res.status(500).json({ message: 'Error adding firm', error: error.message });
    }
};

// Delete Firm Function
const deleteFirmById = async (req, res) => {
    try {
        const firmId = req.params.firmId;

        // Find and Delete the Firm
        const deletedFirm = await Firm.findByIdAndDelete(firmId);
        if (!deletedFirm) {
            return res.status(404).json({ error: "No firm found" });
        }

        // Remove the firm reference from Vendor
        const vendor = await Vendor.findOneAndUpdate(
            { firm: firmId },
            { $pull: { firm: firmId } },
            { new: true }
        );

        res.status(200).json({ message: "Firm deleted successfully." });

    } catch (error) {
        console.error("Error in deleteFirmById:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Export Functions
module.exports = { 
    addFirm: [upload.single('image'), addFirm], 
    deleteFirmById 
};
