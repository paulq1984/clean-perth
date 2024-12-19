import React from 'react'

import { Nav, Navbar, Container} from 'react-bootstrap';

 function NavigationBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#home">Clean Perth</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav>
        <Nav.Link href="#features">Home</Nav.Link>
        <Nav.Link href="#pricing">Tip</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavigationBar