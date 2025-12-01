// models/Sale.js
const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    agent: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: "User",
          required: true
         },
    product: {
         type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
           required: true 
        },
    quantity: {
         type: Number,
          required: true 
        },
    date: { 
        type: Date,
         default: Date.now 
        }
});

module.exports= mongoose.model("Sale", saleSchema);
