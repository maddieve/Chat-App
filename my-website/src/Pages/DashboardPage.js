import React, {useState, useEffect} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import Messenger from '../components/Messenger/Messenger';
import Sidebar from '../components/Sidebar/Sidebar';
// import User from './screens/user/User'
import NavigationBar from '../components/Navbar/NavigationBar';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './../App.css'
import imagine_undraw from '../assets/undraw_web_browsing_p77h.svg'
import imagine_tab from '../assets/tab.png'
import imagine_google_translate from '../assets/google_translate_icon.png'
import imagine_toggle_accesibility from '../assets/toggle_accesibility.PNG'
import imagine_flip_icon from '../assets/flip_icon.jpg'

function DashboardPage(props) {

console.log(props.socket);


    return (

      <Router>
             
      <div className="dashboard"> 
      
        <div className="d-grid">
          <div className="row"><NavigationBar></NavigationBar></div>
          <div className="row"> 
          <div className="col-2 col"><Sidebar></Sidebar></div>
          
         
         <div className="container">
              <div className="row">
                  <div className="col-sm col-3 text-wrap" style={{ padding: '0 0 0 45px'}}>
                  <h2><span className="badge badge-warning w-25" style={{ fontWeight: '400', fontFamily:'Poppins'}}> Ghid </span></h2>
                    <h3> <b> CUM FUNCȚIONEAZĂ </b></h3>
                    <p> 1. Navighează cu ajutorul tastei
                      <img className="imagine_tab" src={imagine_tab} alt="Imagine" style={{height:'25px', width:'45px', margin:'10px'}}/> </p>
                    <p> 2. Pentru a traduce pagina, selectați limba dorită din lista de mai sus
                      <img className="imagine_google_translate" src={imagine_google_translate} alt="Imagine" style={{height:'30px', width:'30px', margin:'10px'}}/> </p>
                    <p> 3. Apăsați butonul 
                      <img className="imagine_toggle_accesibility" src={imagine_toggle_accesibility} alt="Imagine" style={{height:'35px', width:'32px', margin:'10px'}}/> 
                      pentru a modifica setările paginii </p>
                    <p> 4. Accesați pagina destinată limbajului semnelor pentru a învăța aflabetul viitorilor tăi prieteni
                      <img className="imagine_flip_icon" src={imagine_flip_icon} alt="Imagine" style={{height:'35px', width:'35px', margin:'10px'}}/> </p>
                     </div>
         <div className="col-sm" >
                   <img className="imagine_dash" src={imagine_undraw} alt="Imagine" style={{height:'400px', width:'500px'}}/>
                  </div>

                   <div className="row">
                   <div className="col-sm col-3 text-wrap" style={{ padding: '0 0 0 45px'}}>
                    <h3> <b> ÎNTREBĂRI FRECVENTE  </b></h3>
                    <p> <b> Pot să folosesc aplicația și dacă nu prezint dizabilități?</b> </p>
                    <p> Da, aplicația noastră este destinată tuturor persoanelor care vor să socializeze într-un mediu multicultural și prietenos. </p>
                    </div>
                  </div>
                
                </div>
    
        </div>
         
        </div>
        </div>
     </div> 
     
     
      </Router>


        
                               
      
    )
  }
  
  export default DashboardPage