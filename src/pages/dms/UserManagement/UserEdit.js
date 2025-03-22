import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const UserEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Extract user data passed from the User List page
    const { user } = location.state || {};

    // Initialize state with the current user data
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [role, setRole] = useState(user?.role || '');
    const [stateId, setStateId] = useState(user?.state_id || '');
    const [districtId, setDistrictId] = useState(user?.district_id || '');
    const [tehsilId, setTehsilId] = useState(user?.tehsil_id || '');

    // Handle form submission (Update user)
    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform validation or API call to update user
        console.log('Updated user:', { name, email, phone, role, stateId, districtId, tehsilId });

        // Navigate back to the user list page after updating
        navigate('/user');
    };

    return (
        <AdminLayout>
            <div className="dms-container">
                <h4>Edit User</h4>
                <div className="dms-form-container">
                    <Form onSubmit={handleSubmit}>
                        {/* Name */}
                        <Form.Group controlId="name" className="dms-form-group">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* Email */}
                        <Form.Group controlId="email" className="dms-form-group">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* Phone */}
                        <Form.Group controlId="phone" className="dms-form-group">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* Role */}
                        <Form.Group controlId="role" className="dms-form-group">
                            <Form.Label>Role</Form.Label>
                            <Form.Select value={role} onChange={(e) => setRole(e.target.value)} required>
                                <option value="">Select Role</option>
                                <option value="Admin">Admin</option>
                                <option value="State Coordinator">State Coordinator</option>
                                <option value="District Coordinator">District Coordinator</option>
                                <option value="Member">Member</option>
                            </Form.Select>
                        </Form.Group>

                        {/* State ID */}
                        <Form.Group controlId="stateId" className="dms-form-group">
                            <Form.Label>State ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter State ID"
                                value={stateId}
                                onChange={(e) => setStateId(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* District ID */}
                        <Form.Group controlId="districtId" className="dms-form-group">
                            <Form.Label>District ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter District ID"
                                value={districtId}
                                onChange={(e) => setDistrictId(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* Tehsil ID */}
                        <Form.Group controlId="tehsilId" className="dms-form-group">
                            <Form.Label>Tehsil ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Tehsil ID"
                                value={tehsilId}
                                onChange={(e) => setTehsilId(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* Buttons */}
                        <div className="d-flex">
                            <Button type="submit" className="me-2">
                                Save Changes
                            </Button>
                            <Button type="cancel" onClick={() => navigate('/user')}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </AdminLayout>
    );
};
