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
    date:{
        type: Date,
    },
   paymentType:{
        type: Number,
    },
   salesAgent:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Registration'
    },
    transportProvided:{
        type: String,
    },
    totalPrice:{
        type: Number,
    }
});

module.exports=mongoose.model('furnitureSale', furnituresaleSchema)