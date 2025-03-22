import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { WebHeader } from "../../../components/web/Header/WebHeader";
import { Footer } from "../../../components/web/Footer/Footer";

export const Member = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    mobile: "",
    alternateNumber: "",
    state: "",
    district: "",
    city: "",
    address: "",
    gotra: "",
    occupation: "",
    education: "",
    samajRole: "Member",
    suggestions: "",
    declaration: false,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.declaration) {
      alert("Please confirm the declaration before submitting.");
      return;
    }
    console.log("Form submitted:", formData);
    alert("Registration Successful!");
  };

  return (
    <>
    <WebHeader/>
    <section className="registration-section">
      <Container>
        <h2 className="text-center mb-4">Samaj Member Registration</h2>
        <p className="text-center">Join our community by filling out the registration form below.</p>

        <Form onSubmit={handleSubmit} className="registration-form">
          {/* Personal Details */}
          <h4>Personal Details</h4>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" name="dob" value={formData.dob} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
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
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Alternate Number (Optional)</Form.Label>
                <Form.Control
                  type="tel"
                  name="alternateNumber"
                  value={formData.alternateNumber}
                  onChange={handleChange}
                  placeholder="Enter alternate number"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Address Details */}
          <h4>Address Details</h4>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Select name="state" value={formData.state} onChange={handleChange} required>
                  <option value="">Select State</option>
                  <option value="State1">State 1</option>
                  <option value="State2">State 2</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>District</Form.Label>
                <Form.Select name="district" value={formData.district} onChange={handleChange} required>
                  <option value="">Select District</option>
                  <option value="District1">District 1</option>
                  <option value="District2">District 2</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>City / Village</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city or village"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Complete Address / Landmark</Form.Label>
            <Form.Control as="textarea" name="address" value={formData.address} onChange={handleChange} rows={3} required />
          </Form.Group>

          {/* Samaj Details */}
          <h4>Samaj Details</h4>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Gotra / Kul (Optional)</Form.Label>
                <Form.Control type="text" name="gotra" value={formData.gotra} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Occupation / Profession</Form.Label>
                <Form.Control type="text" name="occupation" value={formData.occupation} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Education Qualification</Form.Label>
                <Form.Control type="text" name="education" value={formData.education} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Samaj Role</Form.Label>
                <Form.Select name="samajRole" value={formData.samajRole} onChange={handleChange}>
                  <option value="Member">Member</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="Youth">Youth</option>
                  <option value="Committee Member">Committee Member</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Any Suggestions for the Samaj?</Form.Label>
            <Form.Control as="textarea" name="suggestions" value={formData.suggestions} onChange={handleChange} rows={3} />
          </Form.Group>

          {/* Declaration Checkbox */}
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="I confirm that the information provided above is true to the best of my knowledge."
              name="declaration"
              checked={formData.declaration}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Submit & Reset Buttons */}
          <div className="text-center">
            <Button  className="me-2 registration-btn">
              Register Now
            </Button>
            <Button className="reset-btn" onClick={() => setFormData({})}>
              Reset Form
            </Button>
          </div>
        </Form>
      </Container>
    </section>
    <Footer/>
    </>
  );
};
