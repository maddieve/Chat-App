import React from 'react'
import NavigationBar from '../components/Navbar/NavigationBar'
import Sidebar from '../components/Sidebar/Sidebar'
import imagine_profil from '../assets/profil_icon.png'
import { useState, useEffect } from 'react'
import '../App.css'
import axios from 'axios'
import { server } from '../GlobalVariables'

const ProfilePage = () => {


  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const [password, setPassword] = useState(user.password);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [disability, setDisability] = useState(user.disability);

  const handleSave = (e) => {
      e.preventDefault()
      console.log('clicked btn')
      console.log(firstName, lastName, password, email, disability)
      axios.put(`${server}/api/user/update`, {
        firstName: firstName,
        lastName: lastName,
        email: user.email,
        password: password,
        disability: disability,
        username: user.username
      }).then((res) => {
          console.log(res)
          setUser(res.data.user)
          localStorage.setItem('user', JSON.stringify(res.data.user))
      }).catch((err) => {
          console.error(err)
      })
      setUser(localStorage.getItem('user'));
  }
  
    return(
    <div className="ProfilePage">
        <div className="d-grid">
          <div className="row"><NavigationBar></NavigationBar></div>
          <div className="row"> 
          <div className="col-2 col"><Sidebar></Sidebar></div>

<div className="container">
          <div className="row" style={{padding: '20px 0 0 0px'}}>

            <div className="col col-4 text-wrap align-items-center justify-content-center d-flex flex-column" style={{ padding: '0 0 0 25px'}}>
              <h2 style={{fontWeight: 'normal'}}> Bună, <strong className='text-warning'> {user.username} </strong> </h2>
              <p style={{padding: '30px 0 0 10px'}}> <img className="imagine_profil" src={imagine_profil} alt="Imagine" style={{height:'250px', width:'250px'}}/> </p>
            </div>

          <div className="col mt-4 mr-5"> 

          <form className='mt-3'>
          <div className="form-group row">
              <label htmlFor="inputNume" className="col-sm-2 col-form-label ">Nume</label>
              <div className="col-sm-10">
                <input type="text" className="form-control rounded-pill shadow-sm" id="inputNume" defaultValue={user.lastName}
                onChange={(e) => setLastName(e.target.value)}/>
              </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputPrenume" className="col-sm-2 col-form-label">Prenume</label>
            <div className="col-sm-10">
              <input type="text" className="form-control rounded-pill shadow-sm" id="inputPrenume" defaultValue={user.firstName}
              onChange={(e) => setFirstName(e.target.value)}/>
            </div>
          </div>

          <div className="form-group row">
              <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
              <div className="col-sm-10">
                <input type="email" className="form-control rounded-pill shadow-sm" id="inputEmail" value={user.email}
                onChange={(e) => setEmail(e.target.value)}/>
              </div>
          </div>

          <div className="form-group row">
              <label htmlFor="inputParola" className="col-sm-2 col-form-label">Parola</label>
              <div className="col-sm-10">
                <input type="password" className="form-control rounded-pill shadow-sm" id="inputParola" defaultValue={user.password}
                onChange={(e) => setPassword(e.target.value)}/>
              </div>
          </div>

          <div className="form-group row">
              <label htmlFor="inputDizabilitate" className="col-sm-2 col-form-label">Dizabilitate</label>
              <div className="col-sm-10">
                <input type="text" className="form-control rounded-pill shadow-sm" id="inputDizabilitate" defaultValue={user.disability}
                onChange={(e) => setDisability(e.target.value)}/>
              </div>
          </div>

          </form>
            
                
          </div>  
      </div>  
             <div className="d-grid butoane-profil">
               <div className='row'> 
                <button 
                          type='button'
                          className='btn btn-warning btn-sm rounded-pill shadow-sm m-1 mt-5'
                          onClick={(e) => {
                            if(e.target.innerHTML === 'Editează profilul') {
                              e.target.innerHTML = 'Salvează';
                              e.target.classList.remove('btn-warning');
                              e.target.classList.add('btn-outline-dark')  
                            } else {

                              handleSave(e);
                              e.target.innerHTML = 'Editează profilul';
                              e.target.classList.remove('btn-outline-dark');
                              e.target.classList.add('btn-warning') 

                            }
                          }}>
                          Editează profilul
                  </button> 
               </div>

             </div>
    </div>   
    </div>
    </div>
    </div>
    
);
    
}

export default ProfilePage;