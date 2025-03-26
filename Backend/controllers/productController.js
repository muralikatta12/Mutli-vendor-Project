const path = require('path');
const multer = require('multer');
const Product = require('../models/Product');
const Firm = require('../models/Firm');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
    try {
        const { productName, price, description, category, bestSeller } = req.body;
        const firmId = req.params.firmId;
        const image = req.file ? `uploads/${req.file.filename}` : '';
        let parsedCategory;
        try {
            parsedCategory = JSON.parse(category);
        } catch (e) {
            parsedCategory = [];
        }

        const product = new Product({
            productName,
            price,
            description,
            category: parsedCategory,
            bestSeller: bestSeller === 'true',
            image,
            firm: firmId
        });

        const savedProduct = await product.save();
        console.log(savedProduct);
        const firm = await Firm.findById(firmId);
        if (!firm) {
            return res.status(404).json({ error: "Firm not found" });
        }
        firm.products.push(savedProduct._id);
        await firm.save();

        res.status(201).json({
            message: 'Product added successfully',
            product: savedProduct
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getproductByFirm = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);
        if (!firm) {
            return res.status(404).json({ error: "No firm found" });
        }

        const products = await Product.find({ firm: firmId });
        res.status(200).json({ firmName: firm.firmName, products });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: "No product found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { addProduct: [upload.single('image'), addProduct], getproductByFirm, deleteProductById };
