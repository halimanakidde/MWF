const mongoose = require('mongoose');

const furniturestockSchema = new mongoose.Schema({
    furnitureType:{
        type: String,
    },
    furnitureimage:{
        type: String,
    },
    category:{
        type: String,
    },
    material:{
        type: String,
    },
    quantity:{
        type: Number,
    },
    unitprice:{
        type: Number
    },
});

module.exports=mongoose.model('furnitureStock', furniturestockSchema)