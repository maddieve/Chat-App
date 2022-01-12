import React, { useState } from 'react';
import logoNume from '../assets/logo-nume.png';
import logo from '../assets/logo.png';
import {Link, useHistory} from 'react-router-dom';
import GoogleTranslate from '../components/GoogleTranslate';
import axios from 'axios'
import { server } from '../GlobalVariables'
import Form from 'react-bootstrap/Form'


const RegisterPage = () => {
let history = useHistory();

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [disability, setDisability] = useState('');

const handleSubmit = (e) => {
    e.preventDefault()
    
    let body = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
        disability: disability
    }

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    };
    console.log(body)
    axios.post(`${server}/api/auth/register`, body, axiosConfig)
    .then((res) => {
        console.log(res)
        if(res.status === 200) {
            localStorage.setItem('user', JSON.stringify(res.data.user))
            history.push('/login')
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

const handleFirstNameChange = (e) => {                                
    setFirstName(e.target.value)
    if(e.target.value.length < 4) {
        document.getElementById('firstName-input').classList.remove('is-valid') 
        document.getElementById('firstName-input').classList.add('is-invalid')
    }
    else {
        document.getElementById('firstName-input').classList.remove('is-invalid')
        document.getElementById('firstName-input').classList.add('is-valid')
    }
}

const handleLastNameChange = (e) => {                                
    setLastName(e.target.value)
    if(e.target.value.length < 4) {
        document.getElementById('lastName-input').classList.remove('is-valid') 
        document.getElementById('lastName-input').classList.add('is-invalid')
    }
    else {
        document.getElementById('lastName-input').classList.remove('is-invalid')
        document.getElementById('lastName-input').classList.add('is-valid')
    }
}

const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if(e.target.value.includes('@gmail.com') || e.target.value.includes('@yahoo.com') || e.target.value.includes('@stud.ase.ro')) {
        document.getElementById('email-input').classList.add('is-valid') 
        document.getElementById('email-input').classList.remove('is-invalid')
    }
    else {
        document.getElementById('email-input').classList.add('is-invalid')
        document.getElementById('email-input').classList.remove('is-valid')
    }
}

const handleUsernameChange = (e) => {
    setUsername(e.target.value)
    if(e.target.value.length < 8) {
        document.getElementById('username-input').classList.add('is-valid') 
        document.getElementById('username-input').classList.remove('is-invalid')
    }
    else {
        document.getElementById('username-input').classList.add('is-invalid')
        document.getElementById('username-input').classList.remove('is-valid')
    }
}


const handlePasswordChange = (e) => {                                 
    setPassword(e.target.value)
    if(e.target.value.length < 5) {
        document.getElementById('password-input').classList.remove('is-valid') 
        document.getElementById('password-input').classList.add('is-invalid')
    }
    else {
        document.getElementById('password-input').classList.remove('is-invalid')
        document.getElementById('password-input').classList.add('is-valid')
    }

}

const handleDisabilityChange = (e) => {
    e.preventDefault();
    let selected = document.getElementById("disability-input");
    setDisability(selected.options[selected.selectedIndex].text);

}

    return (
        <div className="maincontainer">
        <div className="container-fluid">
            <div className="row no-gutter">
               
                <div className="col-md-6 d-none d-md-flex bg-image-register"></div>
                
                <div className="col-md-6 bg-light">
                    <div className="login d-flex align-items-center py-3">
                       
                    <div className="container">
                            <div className="row">
                            <div className="google-translate-login" aria-label="Selectează o limbă în care să traduci pagina" tabIndex="0">
                                <GoogleTranslate></GoogleTranslate>
                                </div>
                                <div className="col-lg-10 col-xl-7 mx-auto">
                                    <div className="logo-login mb-3">
                                       <img src={logo} className="logo-login" tabIndex="0" aria-label="Logo aplicație"/>
                                   </div>
                                  < img src={logoNume} className= "logo-nume" tabIndex="0" aria-label="Logo cu numele aplicației"/>
                                    <p className="text-muted mb-4"> </p>
                                      <Form> 
                                      <div className='user-wrapper d-flex flex-column form-floating mb-3 '>
                                         <Form.Control 
                                        as='input'
                                        required
                                        type='text' 
                                        className='form-control rounded-pill border-0 shadow-sm px-4' 
                                        id='firstName-input' 
                                        placeholder='Nume'
                                        onChange={(e) => handleFirstNameChange(e)}/>
                                 
                                <div className="valid-feedback">
                                     Numele este valid!   
                                </div>
                                <div className="invalid-feedback">
                                    Numele trebuie să conțină cel puțin 4 caractere!
                                  </div>
                                </div>
                                          
                                <div className='user-wrapper d-flex flex-column form-floating mb-3 '>
                                         <Form.Control 
                                        as='input'
                                        required
                                        type='text' 
                                        className='form-control rounded-pill border-0 shadow-sm px-4' 
                                        id='lastName-input' 
                                        placeholder='Prenume'
                                        onChange={(e) => handleLastNameChange(e)}/>
                                 
                                <div className="valid-feedback">
                                     Prenumele este valid!   
                                </div>
                                <div className="invalid-feedback">
                                    Prenumele trebuie să conțină cel puțin 4 caractere!
                                  </div>
                                </div>

                                <div className='user-wrapper d-flex flex-column form-floating mb-3 '>
                                         <Form.Control 
                                        as='input'
                                        required
                                        type='text' 
                                        className='form-control rounded-pill border-0 shadow-sm px-4' 
                                        id='email-input' 
                                        placeholder='Adresă de email'
                                        onChange={(e) => handleEmailChange(e)}/>
                                 
                                <div className="valid-feedback">
                                     Adresa de email este valid!   
                                </div>
                                <div className="invalid-feedback">
                                    Adresa de email trebuie să conțină un valid!
                                  </div>
                                </div>

                                <div className='user-wrapper d-flex flex-column form-floating mb-3 '>
                                         <Form.Control 
                                        as='input'
                                        required
                                        type='text' 
                                        className='form-control rounded-pill border-0 shadow-sm px-4' 
                                        id='username-input' 
                                        placeholder='Nume de utilizator'
                                        onChange={(e) => handleUsernameChange(e)}/>
                                 
                                <div className="valid-feedback">
                                    Numele de utilizator este valid!   
                                </div>
                                <div className="invalid-feedback">
                                    Numele de utilizator trebuie să conțină maxim 8 caractere!
                                  </div>
                                </div>

                                <div className='user-wrapper d-flex flex-column form-floating mb-3 '>
                                         <Form.Control 
                                        as='input'
                                        required
                                        type='password' 
                                        value={password}
                                        className='form-control rounded-pill border-0 shadow-sm px-4' 
                                        id='password-input' 
                                        placeholder='Parolă'
                                        onChange={(e) => handlePasswordChange(e)}/>
                                 
                                <div className="valid-feedback">
                                     Parola este validă!   
                                </div>
                                <div className="invalid-feedback">
                                    Parola trebuie să conțină cel puțin 5 caractere!
                                  </div>
                                </div>

                                <div className='user-wrapper d-flex flex-column form-floating mb-3 '>
                                      
                                    <select id= "disability-input" required onChange={(e) => handleDisabilityChange(e)} className="form-select-lg mb-4 rounded-pill border-0 shadow-sm px-4 text-secondary w-100 p-2"  tabIndex="0" aria-label="Selectează o opțiune din următorul meniu">
                                     <option selected >Selectează o opțiune... (opțional)</option>
                                     <option value="1">Nu prezint nicio dizabilitate</option>
                                     <option value="2">Nu pot să văd</option>
                                    <option value="3">Nu pot să aud</option>
                                    <option value="4">Nu pot să vorbesc</option>
                                    </select>
                                                                   
                                <div className="valid-feedback">
                                     Ai selectat o opțiune!   
                                </div>
                                <div className="invalid-feedback">
                                    Selectează o opțiune!
                                  </div>
                                </div>   
                                 
                                         <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                                        onClick = {(e) => handleSubmit(e)}
                                        >Creare cont</button>
                                        <div className="font-weight-light">
                                        <div> Ai deja un cont de utilizator? <a href="/login" aria-label="Buton înregistrare" className="font-italic text-muted">  <u>Înapoi</u> </a></div>
                                        </div>
                                       
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
}

export default RegisterPage;