import React, { useState } from 'react';
import { Button, Form, Alert, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const RolePermissionAdd = () => {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    role_name: '',
    department: '',
    designation: '',
  });

  const [error, setError] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState({});

  const roleOptions = ['Admin', 'Manager', 'Developer', 'HR Executive', 'Designer'];

  const permissions = [
    {
      feature: "Dashboard",
      subFeatures: [
        { name: "Dashboard", capabilities: ["View"] }
      ]
    },
    {
      feature: "User",
      subFeatures: [
        { name: "User List", capabilities: ["View", "Add", "Edit", "Delete"] },
      ]
    },
    {
      feature: "Riders",
      subFeatures: [
        { name: "View Riders", capabilities: ["View", "Add", "Edit", "Delete"] },
        { name: "Rider Feedback", capabilities: ["View", "Add", "Edit", "Delete"] },
        { name: "Ride History", capabilities: ["View", "Add", "Edit", "Delete"] }
      ]
    },
    {
      feature: "Drivers",
      subFeatures: [
        { name: "View Drivers", capabilities: ["View", "Add", "Edit", "Delete"] },
        { name: "Driver Feedback", capabilities: ["View", "Add", "Edit", "Delete"] },
        { name: "Driver Ride History", capabilities: ["View", "Add", "Edit", "Delete"] }
      ]
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePermissionChange = (feature, subFeature, scope, capability) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [feature]: {
        ...prev[feature],
        [subFeature]: {
          ...prev[feature]?.[subFeature],
          [scope]: {
            ...prev[feature]?.[subFeature]?.[scope],
            [capability]: !prev[feature]?.[subFeature]?.[scope]?.[capability],
          },
        },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.role_name || !formData.department || !formData.designation) {
      setError('All fields (Role Name, Department, and Designation) are required.');
      return;
    }
    console.log('Form Submitted', formData, selectedPermissions);
    navigate('/role-permission');
  };

  return (
    <AdminLayout>
      <div className='dms-container'>
        <h4>Add New Role Permission</h4>
        <div className='dms-form-container'>
          {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="dms-form-group">
              <Form.Label>Role Name</Form.Label>
              <Form.Select name="role_name" value={formData.role_name} onChange={handleChange} required>
                <option value="">Select Role</option>
                {roleOptions.map((role, index) => (
                  <option key={index} value={role}>{role}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="dms-form-group">
              <Form.Label>Department</Form.Label>
              <Form.Select name="department" value={formData.department} onChange={handleChange} required>
                <option value="">Select Department</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="dms-form-group">
              <Form.Label>Designation</Form.Label>
              <Form.Select name="designation" value={formData.designation} onChange={handleChange} required>
                <option value="">Select Designation</option>
                <option value="Manager">Manager</option>
                <option value="Developer">Developer</option>
                <option value="HR Executive">HR Executive</option>
                <option value="Designer">Designer</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center">
              <h5>Select Permissions</h5>
            </div>

            <Table bordered>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Scope</th>
                  <th>Capabilities</th>
                </tr>
              </thead>
              <tbody>
                {permissions.map(({ feature, subFeatures }) => (
                  <React.Fragment key={feature}>
                    <tr><td colSpan="4" className="bg-light fw-bold">{feature}</td></tr>
                    {subFeatures.map(({ name, capabilities }) => (
                      <React.Fragment key={name}>
                        <tr>
                          <td rowSpan="2">{name}</td>
                          <td>Self</td>
                          <td>
                            {capabilities.map((capability) => (
                              <Form.Check
                                inline
                                key={`self-${capability}`}
                                type="checkbox"
                                label={capability}
                                onChange={() => handlePermissionChange(feature, name, "Self", capability)}
                                checked={selectedPermissions[feature]?.[name]?.["Self"]?.[capability] || false}
                              />
                            ))}
                          </td>
                        </tr>
                        <tr>
                          <td>Global</td>
                          <td>
                            {capabilities.map((capability) => (
                              <Form.Check
                                inline
                                key={`global-${capability}`}
                                type="checkbox"
                                label={capability}
                                onChange={() => handlePermissionChange(feature, name, "Global", capability)}
                                checked={selectedPermissions[feature]?.[name]?.["Global"]?.[capability] || false}
                              />
                            ))}
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </Table>

            <div className="d-flex">
              <Button type="submit" className="me-2">Save Permission</Button>
            </div>
          </Form>
        </div>
      </div>
    </AdminLayout>
  );
};
