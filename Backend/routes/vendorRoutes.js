const vendorController = require('../controllers/vendorController'); // Double-check the path
const express = require('express');

const router = express.Router();
//route created for vendor registration
router.post('/register',vendorController.vendorRegister);
router.post('/login',vendorController.vendorLogin);

router.get('/all-vendors',vendorController.getAllvendors);
router.get('/single-vendor/:id',vendorController.getVendorById);
module.exports = router;
