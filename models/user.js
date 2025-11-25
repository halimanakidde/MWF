// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
         type: String,
          required: true
         },
    role: {
         type: String, 
         enum: ["manager", "agent"],
          required: true 
        },
});

export default mongoose.model("User", userSchema);
