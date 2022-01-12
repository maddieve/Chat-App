import React from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardPage from './Pages/DashboardPage';
import TestPage from './Pages/TestPage';
import ProfilePage from './Pages/ProfilePage';
import ChatroomPage from './Pages/ChatroomPage';
import ChatPage from './Pages/ChatPage';
import LimbajulSemnelorPage from './Pages/LimbajulSemnelorPage';
// import Title from './components/Title/Title';
import io from 'socket.io-client';
import makeToast from './Toaster';


function App() {
     
  const [socket, setSocket] = React.useState(null);
  
  
  const setupSocket = () => {
    const token = localStorage.getItem("token");
    if (token && !socket) {
      const newSocket = io("http://localhost:8000", {
        query: {
          token: localStorage.getItem("token"),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast("error", "Sunteți deconectat!");
      });

      newSocket.on("connect", () => {
        makeToast("success", "Sunteți conectat!");
      });

      setSocket(newSocket);
    }
  };

  React.useEffect(() => {
    setupSocket();
    //eslint-disable-next-line
  }, []);

    return (
      
     <BrowserRouter>
     <Switch>

       {/* <Route path="/testpg" exact component={TestPg} /> */}
       <Route exact path="/"  component={LoginPage} />
       {/* <Link to="/register" className="btn btn-link">Register</Link> */}
       <Route exact path="/register" component={RegisterPage} />
       {/* <Route
          path="/login"
          render={() => <LoginPage setupSocket={setupSocket} />}
          exact
        /> */}
        <Route exact path="/login" component={LoginPage}/>
        
<Route
          path="/dashboard"
          render={() => <DashboardPage socket={socket} />}
          exact
        />
        <Route
          path="/chatroom/:id"
          render={() => <ChatroomPage socket={socket} />}
          exact
        />
         <Route
          path="/chat/:id"
          render={() => <ChatPage socket={socket} />}
          exact
        />
       <Route path="/profile" component={ProfilePage} />
       <Route path="/lbsemne" component={LimbajulSemnelorPage} />
       <Route path="/test/" component={TestPage} />
     </Switch>
     
     
   </BrowserRouter>
    )
};

export default App;