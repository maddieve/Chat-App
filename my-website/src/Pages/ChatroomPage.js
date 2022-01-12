import React, {createRef, useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';
import NavigationBar from '../components/Navbar/NavigationBar';
import Sidebar from '../components/Sidebar/Sidebar';
import './chatroom.css'
import 'emoji-picker-element';
import uuid from 'react-uuid'
import axios from 'axios'
import { server } from '../GlobalVariables';

const ChatroomPage = ({ match, socket }) => { 
  
 
  const chatroomId = match.params.id;
  const [messages, setMessages] = React.useState([]);
  const messageRef = React.useRef();
  // const descriptionRef = React.useRef();
  const [userId, setUserId] = React.useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [user, setUser] = useState([])
  const [didMount, setDidMount] = useState(false);
  const [chatroomName, setChatroomName] = useState('') 

  useEffect(() => {
    axios.get(`${server}/api/chatroom/${chatroomId}`)
    .then((res) => {
      setChatroomName(res.data.name)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  }, [])

  const sendMessage = () => {

    const messageToSend = {
      name:  user.username, 
      message: messageRef.current.value
    }
    
        const newMessages = [...messages, messageToSend];
        console.log(newMessages)
        setMessages(newMessages);
    
      if (socket) {
        socket.emit("chatroomMessage", {
          chatroomId,
          message: messageRef.current.value,
          user: user
        });
      }
      messageRef.current.value = "";
    
  };
  

React.useEffect(() => {

    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
      setUser(JSON.parse(localStorage.getItem('user')))
    }
    if (socket) {
      
      socket.on("newMessage", (message) => {
        console.log(message)
        let newMessages = [...messages, message];
        console.log(newMessages)
        setMessages(newMessages)

      });
      
    }
    //eslint-disable-next-line
  }, [messages]);

  React.useEffect(() => {
    if (socket) {
        socket.emit("joinRoom",{ 
        chatroomId,
  
      });
    }
  }, [user])

  React.useEffect(() => {
    if(showEmojis === true) {
      document.querySelector('emoji-picker').addEventListener('emoji-click', event => {
        document.getElementById("message-input").value+=event.detail.emoji.unicode
        console.error(event.detail)
      });
    }
  }, [showEmojis])

  React.useEffect(() =>{

    if(document.querySelector('emoji-picker')) {
      document.querySelector('emoji-picker').addEventListener('emoji-click', event => {
        document.getElementById("message-input").value+=event.detail.emoji.unicode
        console.error(event.detail)
      });
    }
 

    return() => {
      //Component Unmount
      // socket.emit("leaveRoom", {
      //   chatroomId,
      // });
    //eslint-disable-next-line
  };
 }, []);

 
   
  return(
    <div className="chatroomPage">

      <NavigationBar></NavigationBar>
      <Sidebar></Sidebar>

      <div className="chatroomSection">
        <div className="cardHeader"> {chatroomName} </div>


        <div className="chatroomContent">
        
          {messages.map(item => (
            <div key={uuid()}> {item.name} : {item.message} </div>
          ))}

        <div className="chatroomActions">
          <div>
          <div className="input-mesaj-emoji">
            <input
              id="message-input"
              type="text"
              name="message"
              placeholder="Say something!"
              ref={messageRef}
              
            /> 
              <button className="buton-send" onClick={sendMessage} type='submit'>
                  TRIMITE
              </button>
                <button className="btn-emoji" onClick={ () => {
                  setShowEmojis(!showEmojis)
                }}>
                  <i className="far fa-smile"></i>
              </button>
               
            </div>
          </div>
        </div>
        </div>

          {showEmojis && (
            <emoji-picker className="emoji-pick"></emoji-picker>     
          )}
       </div>

    // </div>
    // </div>
  


  );

};

 
  export default withRouter(ChatroomPage);