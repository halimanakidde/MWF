// Ensure you have body-parser or Express built-in middleware for parsing form data
// app.use(express.urlencoded({ extended: true })); 
const router = require('express').Router();
const ContactMessage = require('../models/contact_messages'); // Import the model

// POST route to handle form submission
router.post('/sendMessage', async (req, res) => {
    console.log("--- 2. Data received in req.body: ---", req.body); // <-- ADD THIS
    // ... rest of the code

    // 1. Capture the data from the request body (req.body)
    const { fullName, email, message } = req.body;

    // Basic validation (optional, as required='' is in Pug)
    if (!fullName || !email || !message) {
        // Send a temporary error message back to the user
        return res.status(400).send('Please fill in all fields.');
    }

    try {
        // 2. Create a new document instance using the captured data
        const newMessage = new ContactMessage({
            fullName: fullName,
            email: email,
            message: message
        });
        console.log("--- 3. Message saved successfully! ---");
        // 3. Save the new message to the database
        await newMessage.save();

        // 4. Send a confirmation response to the user
        // You might redirect them back to the contact page with a success message
        req.flash('success', 'Your message has been sent successfully! We will be in touch soon.');
        res.redirect('/#contactus'); 

    } catch (error) {
        console.error("Error saving contact message:", error);
        // Handle database or server errors
        req.flash('error', 'There was an error sending your message. Please try again.');
        res.redirect('/#contactus'); 
    }
});

// ... existing manager routes setup ...

// GET route for the manager to view all contact messages
router.get('/messages', async (req, res) => {
    try {
        // Fetch all messages, sorted by most recent first
        const messages = await ContactMessage.find().sort({ receivedAt: -1 });

        // Render a new Pug template to display the messages
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