const mongoose = require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');

const RegistrationSchema = new mongoose.Schema({
   fullname:{
        type: String,
        trim:true,
    },
    email:{
        type:String,
         trim:true,
         unique:true,
         required:true,
    },
    role:{
        type:String,
         trim:true,
    },
});

RegistrationSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});
module.exports=mongoose.model('Registration', RegistrationSchema);