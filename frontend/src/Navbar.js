import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

function logout() {
    localStorage.removeItem("token");
    window.location.reload(false);
}

function MyNavbar(props) {
    
    function searchInput() {
        props.handleSubmit(document.getElementById("mySearch").value);
    }
    
    return (
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/">The Free Stuff App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/submit">Submit a product</Nav.Link>
                    <Nav.Link href="/register">Register </Nav.Link>
                    <Nav.Link href="/login">Login </Nav.Link>
                    <NavDropdown title="User" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick = {() => logout()}> Logout </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <form className="d-flex">
                <input className="form-control me-2" type="search" id="mySearch" placeholder="Search" aria-label="Search">
                </input>
                <button className="btn btn-outline-success" type="submit" onClick={() => searchInput()}>Search</button>
                </form>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}
    

export default MyNavbar;
