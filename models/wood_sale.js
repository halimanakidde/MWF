const mongoose = require('mongoose');

const woodsaleSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,        
        
        required: true
    },
    quality: {
        type: String,
    },
    unitprice: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,  
    },
    paymentType: {
        type: String,
        required: true
    },
    transportprovided: {
        type: String,
        default: "No"
    },
    salesAgent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Registration'
    },
    totalprice: {
        type: Number,      
    },
    notes: {
        type: String
    }
});

module.exports = mongoose.model('woodSale', woodsaleSchema);
