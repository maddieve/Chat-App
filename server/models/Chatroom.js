const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is required!",
  }, 
  description: {
    type: String, 
  }, 
  users: {
    type: mongoose.Schema.Types.Array,
  }
});

module.exports = mongoose.model("Chatroom", chatroomSchema);

