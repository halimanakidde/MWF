const mongoose = require('mongoose');

const furnituresaleSchema = new mongoose.Schema({
    customerName:{
        type: String,
    },
    productType:{
        type: String,
    },
    productName:{
        type: String,
    },
    quantity:{
        type: String,
    },
    unitprice:{
        type: Number,
    },
    date:{
        type: Date,
    },
   paymentType:{
        type: String,
    },
   salesAgent:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Registration'
    },
    transportProvided:{
        type: String,
    },
    totalprice:{
        type: Number,
    },
     
}, {timestamps: true});

module.exports=mongoose.model('furnitureSale', furnituresaleSchema)