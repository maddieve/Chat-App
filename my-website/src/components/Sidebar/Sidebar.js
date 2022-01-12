import React, {useState} from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import { useHistory } from "react-router"
import './Sidebar.css'
import axios from 'axios';
import {server} from '../../GlobalVariables'
import { Modal, Button } from "react-bootstrap";
import GoogleTranslate from '../GoogleTranslate';

function MyVerticallyCenteredModal(props) {

    const [active, setActive] = React.useState('chat');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleCreate = (e) => {
      if(e.target.innerText === 'Creează canal') {
        axios.post(`${server}/api/chatroom/create`, {
          name: name,
          description: description
        }).then((res) => {
          console.log(res)
        }).catch((err) => {
          console.error(err)
        })
      } else {
        axios.post(`${server}/api/chat/create`, {
          name: name,
          description: description
        }).then((res) => {
          console.log(res)
        }).catch((err) => {
          console.error(err)
        })
      }
    }

    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.heading}
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          
          <div className="btn-group" role="group" aria-label="Basic example">
        <button id='chat' type="button" className="btn btn-outline-warning" onClick={() => setActive('canal')}>Canal</button>
        <button id='channel' type="button" className="btn btn-outline-warning" onClick={() => setActive('cameră')}>Cameră</button>
  
        </div>
        <div>
        <label htmlFor="nameFormControlInput">{active === 'canal' ? 'Nume canal' : 'Nume cameră'}</label>
        <input type="text" className="form-control" id="nameFormControlInput" placeholder="Nume"
          onChange={(e) => {setName(e.target.value)}}/>
        <label htmlFor="descFormControlInput"> {active === 'canal' ? 'Descriere canal' : 'Descriere cameră'}</label>
        <input type="text" className="form-control" id="descFormControlInput" placeholder="Descriere"
          onChange={(e) => {setDescription(e.target.value)}}/>

        </div>
        </Modal.Body>
        <Modal.Footer>
            <Button 
              className="btn-creare-camera"
              onClick={(e) => {handleCreate(e)}}> {active === 'canal' ? 'Creează canal' : 'Creează cameră'}
              
              </Button>
          {/* <Button onClick={props.onHide}>Închide</Button> */}
        </Modal.Footer>
      </Modal>
    );
  }

const Sidebar = (props) => {

const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const [modalShow, setModalShow] = React.useState(false);

const user = JSON.parse(localStorage.getItem('user'))
const history = useHistory()

const handleLogout = (event) => {
    event.preventDefault();

    console.log(user)
    axios.post(`${server}/api/user/logout`, {
        email: user.email
    })
    .then(res => {
        console.log(res)
        localStorage.clear()
        // history.push('/')
        window.location.href ='/'
        
    })
   
} 

const [chats, setChats] = useState([]);
const getChats = () =>{
  axios.get(`${server}/api/chat`, {
  headers: {
      'Authorization': "Bearer " + localStorage.getItem("token"),
  },
  })
  .then((response)=>{
      setChats(response.data);
  })
  .catch((err) => {
      setTimeout(getChats, 3000);
  });
};

const [chatrooms, setChatrooms] = React.useState([]);
const getChatrooms = () =>{
    axios.get(`${server}/api/chatroom`, {
    headers: {
        'Authorization': "Bearer " + localStorage.getItem("token"),
    },
    })
    .then((response)=>{
        setChatrooms(response.data);
    })
    .catch((err) => {
        setTimeout(getChatrooms, 3000);
    });
};

React.useEffect(() =>{
    getChatrooms();
    getChats();
    //eslint-disable-next-line
}, []); 

function refreshChat(e) {
    window.location.reload(); 
  }


    return (
        
            // channels
            <div className=' sidebar-container d-grid bg-light text-dark p-1 rounded'>
                <div className='row align-items-center'>
                    <div className='col text-center'> CANALE </div>
                    <div className='col'>
                     <div className='col btn btn-warning rounded'> <i className="fas fa-plus" onClick={() => setModalShow(true)}></i> </div>                      
                    </div>
                </div>
                
                <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            heading={'Selectează opțiunule dorite'} />

                <div> 
                    {chatrooms.map((chatroom) => (
                        <div key={chatroom._id} className="chatroom" onClick={refreshChat}>
                     
                            <Link to={"/chatroom/" + chatroom._id } query={{name: chatroom.name}} > 
                            <div className='join'  > 👪 {chatroom.name} </div> 
                            </Link>
                        </div>
                    ))}
                </div>
               

                {/* msj private */}
                <div className='row align-items-center'>
                    <div className='col text-center text-start'> MESAJE </div>
                    <div className='col'>
                        <div className='col btn btn-warning rounded'> <i className="fas fa-plus" onClick={() => setModalShow(true)}></i> </div>                   
                    </div>
                </div>
                
                {chats.map((chat) => (
                        <div key={chat._id} className="chatroom" onClick={refreshChat}>
                     
                            <Link to={"/chat/" + chat._id } query={{name: chat.name}} > 
                            <div className='join'  > 🧑 {chat.name} </div> 
                            </Link>
                        </div>
                ))}
   
                <div className='row ml-3'> </div>
    
                <div className='fixed-bottom btn btn-dark btn-sm d-flex justify-content-center align-items-center'
                    onClick={(e) => handleLogout(e)}> DECONECTARE </div>

                    



            </div>
      
    );
}

export default Sidebar;




