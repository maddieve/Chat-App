const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: "Name is required!",
    }, 
    description: {
        type: String, 
    }, 
    users: {
        type: mongoose.Schema.Types.Array,
    },
     messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    timestamp: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model("Chat", chatSchema);