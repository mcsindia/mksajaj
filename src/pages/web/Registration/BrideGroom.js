import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { WebHeader } from "../../../components/web/Header/WebHeader";
import { Footer } from "../../../components/web/Footer/Footer";

export const BrideGroom = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    profilePhoto: null,
    mobile: "",
    alternateContact: "",
    email: "",
    state: "",
    district: "",
    city: "",
    address: "",
    gotra: "",
    fatherName: "",
    motherName: "",
    familyBackground: "",
    familyMembers: "",
    highestQualification: "",
    profession: "",
    organization: "",
    annualIncome: "",
    matchState: "",
    matchEducation: "",
    additionalPreferences: "",
    height: "",
    weight: "",
    bloodGroup: "",
    disability: "",
    hobbies: "",
    languages: "",
    socialMedia: "",
    idProof: null,
    educationCertificate: null,
    otherDocuments: null,
    declaration: false,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
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
    <section className="bride-groom-section">
      <Container>
        <h2 className="text-center mb-4">Bride / Groom Registration</h2>
        <p className="text-center">Register to find a perfect match within our Samaj community.</p>

        <Form onSubmit={handleSubmit} className="bride-groom-form">
          {/* Basic Information */}
          <h4>Basic Information</h4>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" name="fullName" placeholder="Enter full name" value={formData.fullName} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Bride">Bride</option>
                  <option value="Groom">Groom</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" name="dob"  value={formData.dob} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Profile Photo</Form.Label>
            <Form.Control type="file" name="profilePhoto" onChange={handleChange} />
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control type="tel" name="mobile" placeholder="Enter 10 digit number" value={formData.mobile} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Alternate Contact</Form.Label>
                <Form.Control type="tel" name="alternateContact" placeholder="Enter alternative number" value={formData.alternateContact} onChange={handleChange} />
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
                <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Complete Address</Form.Label>
            <Form.Control as="textarea" name="address" value={formData.address} onChange={handleChange} rows={3} required />
          </Form.Group>

          {/* Samaj / Family Details */}
          <h4>Samaj / Family Details</h4>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Gotra / Kul</Form.Label>
                <Form.Control type="text" name="gotra" value={formData.gotra} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Father’s Name</Form.Label>
                <Form.Control type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Mother’s Name</Form.Label>
                <Form.Control type="text" name="motherName" value={formData.motherName} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Number of Family Members</Form.Label>
                <Form.Control type="number" name="familyMembers" value={formData.familyMembers} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          {/* Education & Occupation */}
          <h4>Education & Occupation</h4>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Highest Qualification</Form.Label>
                <Form.Control type="text" name="highestQualification" value={formData.highestQualification} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Profession / Job Title</Form.Label>
                <Form.Control type="text" name="profession" value={formData.profession} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Organization Name (Optional)</Form.Label>
                <Form.Control type="text" name="organization" value={formData.organization} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Annual Income (Optional)</Form.Label>
                <Form.Control type="number" name="annualIncome" value={formData.annualIncome} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <h4>Additional Details</h4>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Weight (Optional)</Form.Label>
                <Form.Control type="text" name="weight" value={formData.weight} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Blood Group (Optional)</Form.Label>
                <Form.Control type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Any Physical Disability</Form.Label>
                <Form.Control type="text" name="disability" value={formData.disability} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Hobbies / Interests</Form.Label>
            <Form.Control type="text" name="hobbies" value={formData.hobbies} onChange={handleChange} />
          </Form.Group>

          {/* Declaration */}
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="I hereby declare that all the information provided is true to the best of my knowledge."
              name="declaration"
              checked={formData.declaration}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Submit Button */}
          <div className="text-center">
            <Button className="me-2 registration-btn">
              Register Bride/Groom
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
