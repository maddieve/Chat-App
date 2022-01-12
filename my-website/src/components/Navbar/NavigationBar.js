import React from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import logoNume from '../../assets/logo-nume.png';
import GoogleTranslate from '../GoogleTranslate';


const Styles = styled.div`
  .navbar { background-color: white; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #001D3D;
    
    &:hover { color: #003566; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #001D3D;
  
  }

  .logo-nume-nav
  {
  width: 65%;
  margin-bottom: 5%;
  margin-left: 3%;
  }



`;

const translateStyle = {
  position: 'absolute', 
  top: '20%',
  right: '8%'
}

 const NavigationBar = () => (
  <Styles>

    <Navbar expand="lg">   
    <div className="d-grid">
      <div className="row">
      <Navbar.Brand className="col-2" href="/dashboard" >
      < img src={logoNume} className= "logo-nume-nav" tabIndex="0" aria-label="Apasă pentru a te duce pe pagina principală"/>
      </Navbar.Brand>
     
      <Form className="form-center col-3">

        <FormControl type="text" tabIndex="0" aria-label="Bară de căutare în aplicație" placeholder="Caută" className="search" />
      </Form>
      
     
  
      <Nav.Item className="buton-acasa col-1" tabIndex="0" aria-label="Buton către pagina de început"><Nav.Link href="/dashboard">ACASĂ</Nav.Link></Nav.Item> 
      <Nav.Item className = "buton-profil col-1" tabIndex="0" aria-label="Buton către pagina de profil"><Nav.Link href="/profile" >PROFIL</Nav.Link></Nav.Item>
      <Nav.Item className = "buton-lb-semne col-2" tabIndex="0" aria-label="Buton către pagina de mimică gestuală"><Nav.Link href="/lbsemne" >LIMBAJUL SEMNELOR</Nav.Link></Nav.Item>
      <Nav.Item className = "buton-google-trans col-2"> <GoogleTranslate className="google-translate-nav" style={translateStyle} ></GoogleTranslate> </Nav.Item>
 </div>
 </div>  
     
    </Navbar>
  </Styles>
)

export default NavigationBar;

