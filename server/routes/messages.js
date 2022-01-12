const router = require("express").Router();
const Message = require("../models/message");

//get

router.get("/:chatroomId", async (req, res) => {
    try {
      const messages = await message.find({
        chatroomId: req.params.chatroomId,
      });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;