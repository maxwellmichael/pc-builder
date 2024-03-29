import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {MainContext} from '../contexts/MainContexts';
import Cookies from 'js-cookie';


class NavBar extends Component{

    static contextType = MainContext;

    render(){

        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">PC-Builder</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">

                    <Link className="nav-link" to="/">Home</Link>
                    {Cookies.get('csrf_access_token') ? <Link className="nav-link" to="/builds">Builds</Link> : null}
                    <Link className="nav-link" to="/userauthenticate">Login/SignUp</Link>
                    <Link className="nav-link" to="/test">Test</Link>
                    {Cookies.get('csrf_access_token') ? <Link onClick={()=>this.context.setLogout()} to="/userauthenticate" className="nav-link">Logout</Link> : null}
                    
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Nav>
                    <Nav.Link href="#deets">More deets</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes">
                        Dank memes
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}


export default NavBar;