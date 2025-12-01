const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productName: 
  {
     type: String,
      required: true 
    },
  quantity: {
     type: Number,
      required: true 
    },
  customerName: {
     type: String,
      required: true 
    },
  phone: {
     type: String,
      required: true 
    },
  notes: { 
    type: String }
}, { timestamps: true });

module.exports= mongoose.model("Order", orderSchema);
