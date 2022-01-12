const express = require('express');
const app = express();
const routes = require('./routes');
const mongoose = require ('mongoose');
//Socket.io has to use the http server
const server = require('http').createServer(app);
const cors = require('cors')
require('dotenv').config();


const port=8000;
// const server = app.listen(port, () => console.log('Server is running on' + port));
server.listen(port, () => console.log('Server is running on' + port));

//Socket.io
const io = require('socket.io')(server, {
  allowEIO3: true,
  cors: {
    origin: "*"
    // credentials: true,
    // methods:[ "GET" ,"POST","PUT","DELETE"]
  }});

const jwt = require("jsonwebtoken");
const Message = require("./models/message");
const User = require("./models/user");

// DE PE CEVA FORUM
// io.use(function(socket, next){
//   if (socket.handshake.query && socket.handshake.query.token){
//     jwt.verify(socket.handshake.query.token, 'TOKEN_SECRET', function(err, decoded) {
//       if (err) return next(new Error(err));
//       socket.decoded = decoded;
//       next();
//     });
//   }
//   else {
//     next(new Error('Authentication error'));
//   }    
// })
// io.use(async (socket, next)=>{
//   try {
//     const token = socket.handshake.query.token;
//     const payload = await jwt.verify(token, process.env.TOKEN_SECRET);
//     socket.userId = payload._id;
//     next();
//   } catch (err) {
//     console.log(err)
//   }

  
// });

// io.use((socket, next) => {
//   const token = socket.handshake.headers['authorization'].split(' ');
//   if (token === undefined || token === null || token[0] !== 'Bearer')
//     return next(new Error('Invalid Token'));
//   jwt.verify(token[1], process.env.TOKEN_SECRET, (err, decoded) => {
//     if (err) {
//       console.log(err)
//       return;
//     } //next(new Error('Invalid Token'));
//     console.log(decoded);
//     next();
//   });
// });

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true})

mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection ERROR:" + err.message);
});

mongoose.connection.once("open", () => {
    console.log("MongoDB connected!")
})

//Aducem models
require("./models/user");
require("./models/message");
require("./models/chat");
require("./models/Chatroom");

io.on('connection', (socket) => {
  console.log(socket.id + ' Connected');
});

io.on("connection", (socket) => {
  console.log("New user connected!" + socket.client.conn.id);

  socket.on("disconnect", () =>{
    console.log("User disconnected!" + socket.userId);
  });

  socket.on("joinRoom", ({ chatroomId }) => {
    
      console.log("A user joined chatroom: " + chatroomId);
      socket.join(chatroomId); 
      
  });

  socket.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log("A user left chatroom: " + chatroomId);
  });

  socket.on("chatroomMessage", async ({chatroomId, message, user}) => {
    console.log(message) 
    if(message.trim().length >0){
        // const user = await User.findOne({id: socket.userId});
       
        const newMessage = new Message({
          chatroom: chatroomId,
          user: user,
          message: message,
        })
    
    socket.to(chatroomId).emit("newMessage", {
        message,
        name: user.username,
        userId: socket.userId,
      });
    
        await newMessage.save();

    }
  });
});

app.use(express.json())
app.use(cors({ credentials: true }, "http://localhost:3000"));
app.use(express.urlencoded({extended: true}));

app.use('/api', routes)

app.io = io;

//setup error handlers
const errorHandlers = require('./handlers/errorHandler');
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongooseErrors);
if (process.env.ENV === "DEVELOPMENT"){
  app.use(errorHandlers.developmentErrors);
} else{
  app.use(errorHandlers.productionErrors);
}

module.exports = app;