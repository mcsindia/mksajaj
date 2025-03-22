import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const RolePermissionEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Extract permission data passed from Employee Permissions page
    const { permission } = location.state || {};

    // Initialize state with the current permission data
    const [role, setRole] = useState(permission?.role || '');
    const [department, setDepartment] = useState(permission?.department || '');
    const [designation, setDesignation] = useState(permission?.designation || '');

    // Handle form submission (Update permission)
    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform validation or API call to update permission
        console.log('Updated permission:', { role, department, designation });

        // Navigate back to the employee permissions list page after updating
        navigate('/role-permission');
    };

    return (
        <AdminLayout>
            <div className="dms-container">
                <h4>Edit Employee Permission</h4>
                <div className="dms-form-container">
                    <Form onSubmit={handleSubmit}>
                        {/* Department */}
                        <Form.Group controlId="department" className="dms-form-group">
                            <Form.Label>Department</Form.Label>
                            <Form.Select
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                required
                            >
                                <option value="">Select Department</option>
                                <option value="HR">HR</option>
                                <option value="IT">IT</option>
                                <option value="Sales">Sales</option>
                                <option value="Finance">Finance</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Designation */}
                        <Form.Group controlId="designation" className="dms-form-group">
                            <Form.Label>Designation</Form.Label>
                            <Form.Select
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                                required
                            >
                                <option value="">Select Designation</option>
                                <option value="Manager">Manager</option>
                                <option value="Developer">Developer</option>
                                <option value="HR Executive">HR Executive</option>
                                <option value="Designer">Designer</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Role */}
                        <Form.Group controlId="role" className="dms-form-group">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* Buttons */}
                        <div className="d-flex">
                            <Button type="submit" className="me-2">
                                Save Changes
                            </Button>
                            <Button type="cancel" className="ms-2" onClick={() => navigate('/role-permission')}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </AdminLayout>
    );
};