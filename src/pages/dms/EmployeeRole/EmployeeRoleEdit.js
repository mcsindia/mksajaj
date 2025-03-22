import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const EmployeeRoleEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Extract role data passed from UserRoles page
    const { role } = location.state || {};

    // Initialize state with the current role data
    const [roleName, setRoleName] = useState(role?.role_name || '');
    const [responsibilities, setResponsibilities] = useState(role?.description || '');
    const [department, setDepartment] = useState(role?.department || '');
    const [designation, setDesignation] = useState(role?.designation || '');

    // Handle form submission (Update role)
    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform validation or API call to update role
        console.log('Updated role:', { roleName, responsibilities, department, designation });

        // Navigate back to the user roles list page after updating
        navigate('/employee-roles');
    };

    return (
        <AdminLayout>
            <div className="dms-container">
                <h4>Edit Role</h4>
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

                        {/* Role Name */}
                        <Form.Group controlId="roleName" className="dms-form-group">
                            <Form.Label>Role Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter role name"
                                value={roleName}
                                onChange={(e) => setRoleName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* Responsibilities */}
                        <Form.Group controlId="responsibilities" className="dms-form-group">
                            <Form.Label>Responsibilities</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Enter responsibilities"
                                value={responsibilities}
                                onChange={(e) => setResponsibilities(e.target.value)}
                            />
                        </Form.Group>

                        {/* Buttons */}
                        <div className="d-flex">
                            <Button type="submit" className="me-2">
                                Save Changes
                            </Button>
                            <Button type="cancel" className="ms-2" onClick={() => navigate('/employee-roles')}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </AdminLayout>
    );
}
