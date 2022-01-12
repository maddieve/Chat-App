import React, { useState} from 'react';
import {Link, useHistory, withRouter} from 'react-router-dom';
import logoNume from '../assets/logo-nume.png';
import logo from '../assets/logo.png';
import axios from 'axios';
import {server} from '../GlobalVariables'
import GoogleTranslate from '../components/GoogleTranslate';


const LoginPage = (props) => {
   const [email, setEmail] = useState('');
   const[password, setPassword] = useState('');
   const [user, setUser] = useState({});

   let history = useHistory();

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    };

const handleLogin = (data) => {
    setUser(data.user);
    localStorage.setItem('token', JSON.stringify(data.token));

}

const handleSubmit = async (event)  => {
    event.preventDefault();

    if(document.getElementById('inputEmail').value === '') {
        document.getElementById('inputEmail').classList.add('is-invalid')
    } 
    if(document.getElementById('inputPassword').value === '') {
        document.getElementById('inputPassword').classList.add('is-invalid')
    } 
    
    try {
        
        axios.post(`${server}/api/auth/login`, {
            email: email, 
            password: password
        }, axiosConfig)
        .then((res) => {
            if(res.status === 200) {
                console.log('status 200')
                if(res.data.user) {
                    handleLogin(res.data)
                    if (document.getElementById('inputEmail').classList.contains('is-invalid')) {
                        document.getElementById('inputEmail').classList.remove('is-invalid') 
                        document.getElementById('inputEmail').classList.add('is-valid')
                    } else {
                        document.getElementById('inputEmail').classList.add('is-valid')
                    }

                    if (document.getElementById('inputPassword').classList.contains('is-invalid')) { 
                        document.getElementById('inputPassword').classList.remove('is-invalid') 
                        document.getElementById('inputPassword').classList.add('is-valid')
                    } else {
                        document.getElementById('inputPassword').classList.add('is-valid')
                    }
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    setUser(res.data.user)
                    setTimeout(() => history.push({
                                        pathname: '/dashboard', 
                                        state: { token: res.data.token}}), 1000)
                    props.setupSocket();
                }
            } else { 
                if(res.status === 401)
                    document.getElementById('inputEmail').classList.add('is-invalid')
                else if( res.status === 402)  document.getElementById('inputPassword').classList.add('is-invalid')
            }
        })        
        .catch((error) => {
            console.log(error)
            if (document.getElementById('inputEmail').classList.contains('is-valid')) 
                document.getElementById('inputEmail').classList.remove('is-valid')  
            if (document.getElementById('inputPassword').classList.contains('is-valid')) 
                document.getElementById('inputPassword').classList.remove('is-valid') 
            document.getElementById('inputEmail').classList.add('is-invalid')  
            document.getElementById('inputPassword').classList.add('is-invalid')
        })
    } catch (e) {
        alert(e.message);
    }


}


return(
        <div className="maincontainer">

        <div className="container-fluid">
            <div className="row no-gutter">
               
                <div tabIndex="0" className="col-md-6 d-none d-md-flex bg-image-login" aria-label="Imagine pagină de autentificară cu o barcă și stele"></div>
                
                <div className="col-md-6 bg-light">
                    
                    <div className="login d-flex align-items-center py-5">
                       
                        <div className="container"> <div className="google-translate-login" aria-label="Selectează o limbă în care să traduci pagina" tabIndex="0">
                                <GoogleTranslate></GoogleTranslate>
                                </div>
                            <div className="row">
                          
                                <div className="col-lg-10 col-xl-7 mx-auto">
                                
                                    <div className="logo-login mb-3">
                                       <img src={logo} className="logo-login" tabIndex="0" aria-label="Logo aplicație"/>
                                   </div>
                                  < img src={logoNume} className= "logo-nume" tabIndex="0" aria-label="Logo cu numele aplicației"/>
                                    <p className="text-muted mb-4"> </p>
                                    <form>
                                        <div className="form-group mb-3">
                                            <input id="inputEmail"  aria-label="Introdu adresa de e-mail cu care te-ai înregistrat" type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Adresă de e-mail" required  className="form-control rounded-pill border-0 shadow-sm px-4" />
                                    

                                            
                                        </div>
                                        <div className="form-group mb-3">
                                            <input id="inputPassword" aria-label="Introdu parola" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Parolă" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                  
                                        </div>
                                        <div className="custom-control custom-checkbox mb-3">
                                            <input id="customCheck1" type="checkbox" className="custom-control-input" value="" />
                                            <label htmlFor="customCheck1" className="custom-control-label">Salvează parola</label>
                                        </div>
                                        
                                        <button aria-label= "Autentificare" type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                                        onClick={(e) => {
                                            handleSubmit(e);
                                        }}
                                        >AUTENTIFICARE</button>
                                        
                                       
                   
                                         <div className="font-weight-light">
                                       <div> Nu ai cont? <a href="/register" aria-label="Buton înregistrare" className="font-italic text-muted">  <u>Înregistrează-te</u> </a></div>
                </div>
                                    </form>
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


export default withRouter(LoginPage);