import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const OTP = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const handleChange = (index, value) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input if value is entered
        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    return (
        <div className="dms-auth-wrapper">
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Card className="p-4 shadow-sm" style={{ width: "350px", borderRadius: "10px" }}>
                    <Card.Body>
                        {/* Header */}
                        <h3 className="text-center mb-3">OTP Form</h3>

                        {/* Form */}
                        <Form>
                            <Form.Group className='dms-form-group'>
                                <Form.Label>Enter OTP</Form.Label>
                                <div className="d-flex justify-content-center mb-3">
                                    {otp.map((digit, index) => (
                                        <Form.Control
                                            key={index}
                                            id={`otp-${index}`}
                                            type="text"
                                            maxLength="1"
                                            className="text-center mx-1"
                                            style={{ width: "40px" }}
                                            value={digit}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                        />
                                    ))}
                                </div>
                            </Form.Group>
                            
                            {/* Buttons */}
                            <div className="d-flex justify-content-between">
                                <Button type="submit"  onClick={() => navigate("/")}>Send</Button>
                                <Button type="cancel"  onClick={() => navigate("/login")}>Cancel</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};
