const mongoose = require('mongoose');

const furnituresaleSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
    },
    productType: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,       
        required: true,
    },
    unitprice: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,  
    },
    paymentType: {
        type: String,
        required: true,
    },
    salesAgent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Registration'
    },
    transportProvided: {
        type: String,
        default: "No"
    },
    totalprice: {
        type: Number,      
    }
}, { timestamps: true });

module.exports = mongoose.model('furnitureSale', furnituresaleSchema);
