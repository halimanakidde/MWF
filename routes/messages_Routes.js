const router = require('express').Router();
const ContactMessage = require('../models/contact_messages')

//route to handle form submission
router.post('/sendMessage', async (req, res) => {
    console.log(" Data received in req.body:", req.body);

    // Captures data from the request body
    const { fullName, email, message } = req.body;

    //validation
    if (!fullName || !email || !message) {
        return res.status(400).send('Please fill in all fields.');
    }

    try {
        // create a new document instance using the captured data
        const newMessage = new ContactMessage({
            fullName: fullName,
            email: email,
            message: message
        });
        console.log(" Message saved successfully!");
        await newMessage.save();//Save the new message to the database

        
        req.flash('success', 'Your message has been sent successfully! We will be in touch soon.');
        res.redirect('/#contactus'); 

    } catch (error) {
        console.error("Error saving contact message:", error);
      
        req.flash('error', 'There was an error sending your message. Please try again.');
        res.redirect('/#contactus'); 
    }
});



// GET route for the manager to view all contact messages
router.get('/messages', async (req, res) => {
    try {
        const messages = await ContactMessage.find().sort({ receivedAt: -1 }); // Fetch all messages, sorted by most recent first

        res.render('message_list', { 
            title: 'Customer Messages',
            messages: messages
        });

    } catch (error) {
        console.error("Error fetching contact messages:", error);
        res.status(500).send("Could not load messages.");
    }
});

 module.exports = router;