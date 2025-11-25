const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
    fullName: { 
        type: String,
         required: true },

    email: { 
        type: String, 
        required: true },

    message: { 
        type: String,
         required: true },
    read: { 
        type: Boolean,
         default: false },

    dateSent: { 
        type: Date, 
        default: Date.now }
});

module.exports = mongoose.model("ContactMessage", contactMessageSchema);
