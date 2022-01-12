const mongoose = require("mongoose");
const Chat = require('../models/chat')

exports.createChat = async (req, res) => {
  const { name } = req.body;
  const { description } = req.body;


  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) throw "Chat name can contain only alphabets.";

  const ChatExists = await Chat.findOne({ name });

  if (ChatExists) throw "Chat with that name already exists!";

  const chat = new Chat({
    name,
    description
  });

  await chat.save();

  res.json({
    message: "Chat created!",
  });
};

exports.getAllChats = async (req, res) => {
  const Chats = await Chat.find({});

  res.json(Chats);
};

exports.getById = async (req, res) => {
  const Chat = await Chat.findOne({_id: req.params.id});
  if(Chat) res.status(200).send(Chat)
  else res.status(404).send('not found')
}