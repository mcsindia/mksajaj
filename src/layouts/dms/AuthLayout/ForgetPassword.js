import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ForgetPassword = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleReset = (e) => {
        e.preventDefault();
        console.log("Reset password link sent to:", username);
    };

    return (
        <div className="dms-auth-wrapper">
        <Container className="d-flex justify-content-center align-items-center vh-100" style={{backgroundColor: "#f7f7f7"}}>
            <Card className="p-4 shadow-sm" style={{ width: "350px", borderRadius: "10px" }}>
                <Card.Body>
                    <h4 className="text-center mb-4">
                        Forgot Password
                    </h4>
                    <p className="text-center text-muted">
                        Enter your username to reset your password.
                    </p>
                    <Form onSubmit={handleReset}>
                        {/* Username */}
                        <Form.Group className='dms-form-group'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* Reset Button */}
                        <Button
                            type="submit"
                            className="w-100 mb-2"
                            onClick={() => navigate("/reset-password")}
                        >
                            Reset
                        </Button>
                        <Button
                            type="cancel"
                            className="w-100"
                            onClick={() => navigate("/login")}
                        >
                            Back
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
        </div>
    );
};


