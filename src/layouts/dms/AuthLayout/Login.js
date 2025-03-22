import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    navigate("/otp"); // Redirect to OTP page
  };

  return (
    <div className="dms-auth-wrapper">
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="p-4 shadow-sm" style={{ width: "350px", borderRadius: "10px" }}>
          <Card.Body>
            {/* Header */}
            <h3 className="text-center mb-2">Login Form</h3>
            
            {/* Form */}
            <Form onSubmit={handleSubmit}>
              {/* Email */}
              <Form.Group className='dms-form-group'>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Password */}
              <Form.Group className='dms-form-group'>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Buttons */}
              <div className="d-flex justify-content-between mt-3">
                <Button type="submit" className="w-45">Send</Button>
                <Button type="cancel"  onClick={() => setEmail('') || setPassword('')}>Cancel</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
