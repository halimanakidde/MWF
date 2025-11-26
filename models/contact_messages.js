const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address']
    },
    message: {
        type: String,
        required: true
    },
    receivedAt: {
        type: Date,
        default: Date.now
    },
    isRead: { // Helps the manager track new messages
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('ContactMessage', ContactMessageSchema);