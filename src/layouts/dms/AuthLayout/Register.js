import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        password: "",
        mode: "Admin"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        navigate("/login");
    };

    return (
        <div className="dms-auth-wrapper">
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Card className="p-4 shadow-sm" style={{ width: "400px", borderRadius: "10px" }}>
                    <Card.Body>
                        {/* Header */}
                        <h3 className="text-center mb-3">Register Form</h3>

                        {/* Form */}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='dms-form-group'>
                                <Form.Label>Name:</Form.Label>
                                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                            </Form.Group>

                            <Form.Group className='dms-form-group'>
                                <Form.Label>Mobile:</Form.Label>
                                <Form.Control type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
                            </Form.Group>

                            <Form.Group className='dms-form-group'>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </Form.Group>

                            <Form.Group className='dms-form-group'>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                            </Form.Group>

                            <Form.Group className='dms-form-group'>
                                <Form.Label>Mode:</Form.Label>
                                <Form.Select name="mode" value={formData.mode} onChange={handleChange}>
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                </Form.Select>
                            </Form.Group>

                            {/* Buttons */}
                            <div className="d-flex justify-content-between mt-3">
                                <Button type="submit">Submit</Button>
                                <Button type="cancel">Cancel</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};
