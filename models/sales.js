// models/Sale.js
import mongoose from "mongoose";

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

export default mongoose.model("Sale", saleSchema);
