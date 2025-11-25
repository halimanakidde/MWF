const mongoose = require('mongoose');

const woodsaleSchema = new mongoose.Schema({
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
        type: Number,
    },
    quality:{
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
    transportprovided:{
        type:String,
        default: 'No',
    },
   salesAgent:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Registration'
    },
    totalprice:{
        type: String,
    },
    notes:{
        type: String,
    }
});

module.exports=mongoose.model('woodSale', woodsaleSchema)