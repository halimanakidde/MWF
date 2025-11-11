const mongoose = require('mongoose');

const woodstockSchema = new mongoose.Schema({
    woodName:{
        type:String,
    },
    woodType:{
        type:String,
    },
    woodcolor:{
        type:String,
    },
    measurements:{
        type:String,
    },
    quality:{
        type:String,
    },
        quantity:{
        type:Number,
    },
    unitprice:{
        type:Number,
    },
    supplier:{
        type:String,
    },
    contact:{
        type:Number,
    },
    warehouseLocation:{
        type:String,
    },

});
module.exports=mongoose.model('woodStock', woodstockSchema)