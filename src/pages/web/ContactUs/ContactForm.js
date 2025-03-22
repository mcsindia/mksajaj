import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    enquiryType: "General",
    message: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Your enquiry has been submitted. We'll get back to you soon!");
  };

  return (
    <section className="contact-form-section">
      <Container>
        <h2 className="text-center mb-4">Get in Touch</h2>
        <p className="text-center">We’re here to assist you. Please fill out the form below, and we’ll get back to you as soon as possible.</p>

        <Form onSubmit={handleSubmit} className="contact-form">
          <Row>
            {/* Name Input */}
            <Col md={6}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>
            </Col>

            {/* Mobile Number Input */}
            <Col md={6}>
              <Form.Group controlId="mobile" className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {/* Enquiry Type Dropdown */}
            <Col md={6}>
              <Form.Group controlId="enquiryType" className="mb-3">
                <Form.Label>Enquiry Type</Form.Label>
                <Form.Select name="enquiryType" value={formData.enquiryType} onChange={handleChange}>
                  <option value="General">General</option>
                  <option value="Membership">Membership</option>
                  <option value="Event">Event</option>
                  <option value="Support">Support</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Message / Enquiry Textarea */}
          <Form.Group controlId="message" className="mb-3">
            <Form.Label>Message / Enquiry</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Write your message here..."
              required
            />
          </Form.Group>

          {/* Submit Button */}
          <div className="text-center">
            <Button  type="submit" className="contact-submit-btn">
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </section>
  );
};
