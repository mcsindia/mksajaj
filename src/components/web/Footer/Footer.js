import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export const Footer = () => {
  return (
    <footer className="custom-footer">
      <Container>
        <Row className="align-items-center">
          {/* Links Section */}
          <Col md={8}>
            <Row className="web-footer-right-cols">
              <Col md={4} className="web-footer-col">
                <h5 className="web-footer-heading">Partnership</h5>
                <ul>
                  <li><a href="/websites" className="web-footer-link">Websites</a></li>
                  <li><a href="/social-media" className="web-footer-link">Social Media</a></li>
                  <li><a href="/branding" className="web-footer-link">Branding</a></li>
                </ul>
              </Col>
              <Col md={4} className="web-footer-col">
                <h5 className="web-footer-heading">About</h5>
                <ul>
                  <li><a href="/projects" className="web-footer-link">Our Projects</a></li>
                  <li><a href="/careers" className="web-footer-link">Careers</a></li>
                </ul>
              </Col>
              <Col md={4} className="web-footer-col">
                <h5 className="web-footer-heading">Support</h5>
                <ul>
                  <li><a href="/support" className="web-footer-link">Support Request</a></li>
                  <li><a href="/contact" className="web-footer-link">Contact</a></li>
                </ul>
              </Col>
            </Row>
          </Col>

          {/* Search Bar Section */}
          <Col md={4} className="footer-search-container">
            <Form className="d-flex">
              <Form.Control
                type="text"
                placeholder="Search..."
                className="footer-search-input"
              />
              <Button variant="light" className="footer-search-button">
                Search
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Footer Bottom Section */}
        <Row className="footer-bottom">
          <Col md={6}>
            <p>All rights reserved © 2025</p>
          </Col>
          <Col md={6} className="social-icons">
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
