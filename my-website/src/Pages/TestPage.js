import React from 'react'
import ReactDOM from 'react-dom'
import '../Pages/TestPage.css'

// import 'emoji-picker-react';
// import SendIcon from  '@material-ui/icons/Send';
// import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticonIcon';
// import CancelIcon from '@material-ui/icons/Cancel';
// import CustomInput from '';
// import  propTypes from 'prop-types';
// import Emoji from '';
// import {defaultAvatar} from '';
// import {ChatContainer} from '';

// import React, {createRef, useEffect, useState} from 'react';

// import '..Pages/TestPage.css'
import Fireflies from '../components/Fireflies'

// ReactDOM.render(<Fireflies />, document.getElementById('root'))



const TestPage = () => {


//     const inputRef = createRef();
//     const [message, setMessage] = useState('');
//     const [showEmojis, setShowEmojis] = useState();
//     const [cursorPosition, setCursorPosition] = useState();
    
// const pickEmoji = (e, {emoji}) => {
//   const ref = inputRef.current;
//   ref.focus();
//   const start = message.substring(0, ref.selectionStart);
//   const end = message.substring(ref.selectionStart);
//   const text = start + emoji + end;
//   setMessage(text);
//   setCursorPosition(start.length+emoji.length);
// };

// const handleChange = e => {
//   setMessage(e.target.value);
// };

// const handleShowEmojis =() =>{
//   inputRef.current.focus();
//   setShowEmojis(!showEmojis);
// };

// useEffect(() =>{
//   inputRef.current.selectionStart = cursorPosition;
// }, [cursorPosition]);




    return(
    <div className="wrapper">
        <div className="TestPage">
        <h1>Test</h1> 

        
        <Fireflies>  </Fireflies>

</div>
{/* <ChatContainer showEmojis={showEmojis}>
    <div className="chat-head"> */}
      {/* <div className="avatar"> */}
        {/* <img src={remoteAvatar ? remoteAvatar: defaultAvatar} alt=""/>
      </div> */}
{/* <div className="name">
  <span> Madalina Andreea </span>
</div>

<div className="flex"></div>
<div className="close-chat">
  <CancelIcon></CancelIcon>
</div>

    </div>

<div className="chat-body">
  <div className="remote-message">
    <span> Hei </span>
  </div>
  <div className="local-message">
    <span> Buna </span>
  </div>
</div>

{
  <div className={`emoji-list ${!showEmojis && 'hidden'}`}>
    <Emoji pickEmoji={pickEmoji}/>
  </div>
}


      <div className="chat-footer">
        <div className="emoji-icon">
          <InsertEmoticonIcon onClick={handleShowEmojis}/>
        </div>
        <div className= "input-field">
          <CustomInput rows={2} aria-label="Căsuță pentru textul mesajului" value={message} onChange={handleChange} ref={inputRef}/> 
        </div>
        <div className=" send-button" aria-label="Buton de trimitere">
          <SendIcon/>
        </div>
      </div>

      </ChatContainer>
</div> */}


      </div>

    );
    

}

// ChatroomPage.prototype = {
//     remoteAvatar: propTypes.string
//   };
  

export default TestPage;