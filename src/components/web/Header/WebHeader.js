import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import logoS from "../../../assets/images/letter-s1.png";

export const WebHeader = () => {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="/web" className="brand-logo">
          <img src={logoS} alt="S Logo" className="logo-img" />
          amaj
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/web">Home</Nav.Link>
            <Nav.Link href="/web/about-us">About Us</Nav.Link>
            <NavDropdown title="Registration" id="registration-dropdown" className="custom-dropdown">
              <NavDropdown.Item href="/web/registration/members">Member</NavDropdown.Item>
              <NavDropdown.Item href="/web/registration/bride-groom">Bride/Groom Registration</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/web/news">News</Nav.Link>
            <Nav.Link href="/web/events">Events</Nav.Link>
            <Nav.Link href="/web/contact">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
