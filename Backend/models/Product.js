const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: [{
            type: String,
            enum: ['veg', 'non-veg']
        }],
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    bestseller: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true
    },
    
    firm: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Firm'
    }]


});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
