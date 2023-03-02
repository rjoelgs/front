import React, {useContext, useState, useEffect} from 'react'
import { UserContext } from '../context/userContext'
import { CartContext } from '../context/cartContext'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Badge from 'react-bootstrap/Badge';
import {Person, DoorOpen, Cart4} from 'react-bootstrap-icons'

import { accountInfo } from '../services/user.service';

const MenuBar = () => {
  const {token, deleteSession} = useContext( UserContext )
  const [user, setUser] = useState(null)
  const {cart, cartResume} = useContext( CartContext )

  const laodAccountInfo = async(token) => {
    const response = await accountInfo(token);
    if( response.status == 200 ) {
      setUser(response.data);
    } 
  }

  useEffect(()=>{
    if(token != null)
      laodAccountInfo(token)
  }, [token])

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">UCamp Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/productos">Productos</Nav.Link>
            {
              cart && (
                <Nav.Link href="/carrito"><Cart4 className='me-1'></Cart4><Badge>{cart.length}</Badge></Nav.Link>
              )
            }
            
            {
              user && (
                <>
                  <NavDropdown title={user.name} id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1"><Person></Person>Cuenta</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={()=>deleteSession()}><DoorOpen></DoorOpen>Salir</NavDropdown.Item>
                  </NavDropdown>
                </>
              )
            }
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MenuBar
