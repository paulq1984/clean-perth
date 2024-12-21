import React, { useState } from "react";
import { Nav, Navbar, Container, Button, Modal } from "react-bootstrap";

function NavigationBar() {
  // State for controlling modal visibility
  const [showModal, setShowModal] = useState(false);

  // Functions to handle modal visibility
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      {/* NAVBAR */}
      <Navbar collapseOnSelect expand='lg' className='bg-secondary bg-gradient'>
        <Container>
          <Navbar.Brand>Clean Perth</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse
            id='responsive-navbar-nav'
            className='justify-content-end'>
            <Nav>
              <Button onClick={handleShow}>Landfill Information</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* model */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Landfill Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>666 Wildlife Road, Perth, ON</p>
          <p>Hours of operation:</p>
          <ul>
            <li>Tuesday, Wednesday, and Friday from 8 a.m. - 4:30 p.m</li>
            <li>Saturday from 8 a.m. - 12 p.m.</li>
            <li>
              If a holiday falls on a Monday, the Landfill will be closed on the
              following Tuesday. Check perth.ca/landfill for holiday closures.
            </li>
            <li>
              Available to Town of Perth residents only. Proof of residency
              required. For a list of fees and charges, visit perth.ca/landfill.{" "}
            </li>
          </ul>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavigationBar;
