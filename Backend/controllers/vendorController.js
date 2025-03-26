const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.SECRET_KEY;
//Token based authentication
//for vendor registration
const vendorRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try { 
    const vendorEmail = await Vendor.findOne({ email });
    if (vendorEmail) {
      return res.status(400).json("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newVendor = new Vendor({
      username,
      email,
      password: hashedPassword
    });
    await newVendor.save();
    res.status(201).json({ message: "Vendor registered successfully" });
    console.log("Vendor registered successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
// for login
const vendorLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    } 
    //generating token
    const token = jwt.sign({ vendorId: vendor._id }, secretKey, { expiresIn: '24h' });
    const vendorId = vendor._id;
    res.status(200).json({
      message: "Login successful",
      token: token,
      vendorId: vendorId,
      firmId: vendor.firm.length > 0 ? vendor.firm[0]._id : null
    });
    console.log(email, "this is token", token);
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Internal server error"});
  }
}
const getAllvendors = async(req,res)=>{
  try{
    const vendors = await Vendor.find().populate('firm');
    res.status(200).json({vendors});
    console.log("All vendors fetched successfully");

  }catch(error)
  {
    console.log(error);
    res.status(500).json({error:"Internal server error"});
    console.log("Error in fetching vendors");
  }
}

//to fetch vendor individual details
const getVendorById = async(req,res)=>{
  const vendorId = req.params.id;
  try{
    const vendor = await Vendor.findById(vendorId).populate('firm');
    if(!vendor){
      return res.status(404).json({error:"Vendor not found"});
    }
    const vendorFirmId = vendor.firm[0]._id;
    res.status(200).json({vendor,vendorFirmId});
    console.log(vendor,vendorFirmId);
    console.log("Vendor details fetched successfully");
  }catch(error)
  {
    console.log(error);
    res.status(500).json({error:"Internal server error"});
    console.log("Error in fetching vendor details");
  }
   
  
}

module.exports = { vendorRegister, vendorLogin, getAllvendors, getVendorById };


 