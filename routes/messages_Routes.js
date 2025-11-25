const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/contact_messages");

//  CREATE MESSAGE 
router.post("/sendMessage", async (req, res) => {
  try {
    console.log("Received body:", req.body); // DEBUG

    const { fullName, email, message } = req.body;

    const saved = await ContactMessage.create({ fullName, email, message });
    console.log("Saved to DB:", saved); // DEBUG

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).send("Server Error");
  }
});



// GET ALL MESSAGES (MANAGER VIEW) 
router.get("/manager/messages", async (req, res) => {
    try {
        const messages = await ContactMessage.find().sort({ dateSent: -1 });
        return res.render("messages", { messages });

    } catch (err) {
        console.error("Fetch Messages Error:", err);
        return res.status(500).send("Server Error");
    }
});


// MARK MESSAGE AS READ 
router.post("/manager/messages/:id/mark-read", async (req, res) => {
    try {
        await ContactMessage.findByIdAndUpdate(req.params.id, { read: true });
        return res.redirect("/manager/messages");

    } catch (err) {
        console.error("Mark Read Error:", err);
        return res.status(500).send("Server Error");
    }
});


// DELETE MESSAGE 
router.post("/manager/messages/:id/delete", async (req, res) => {
    try {
        await ContactMessage.findByIdAndDelete(req.params.id);
        return res.redirect("/manager/messages");

    } catch (err) {
        console.error("Delete Error:", err);
        return res.status(500).send("Server Error");
    }
});


module.exports = router;
