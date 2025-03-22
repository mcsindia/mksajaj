import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const EmployeeRoleAdd = () => {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    role_name: '',
    responsibility: '',
    department: '',
    designation: '',
  });

  const [error, setError] = useState('');

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Form Validation
    if (!formData.role_name || !formData.department || !formData.designation) {
      setError('All fields (Role Name, Department, and Designation) are required.');
      return;
    }

    console.log('Form Submitted', formData);

    // Simulate saving the data and navigating back
    navigate('/employee-roles'); // Redirect back to User Roles List
  };

  return (
    <AdminLayout>
      <div className='dms-container'>
        <h4>Add New Role</h4>
        <div className='dms-form-container'>
          {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* Department */}
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

            {/* Designation */}
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

            {/* Role Name */}
            <Form.Group className="dms-form-group">
              <Form.Label>Role Name</Form.Label>
              <Form.Control type="text" name="role_name" placeholder="Enter role name" value={formData.role_name} onChange={handleChange} required />
            </Form.Group>

            {/* Responsibility with Textarea */}
            <Form.Group className="dms-form-group">
              <Form.Label>Responsibility</Form.Label>
              <Form.Control 
                as="textarea" 
                name="responsibility" 
                placeholder="Enter responsibility details" 
                value={formData.responsibility} 
                onChange={handleChange} 
                rows={4} 
              />
            </Form.Group>

            {/* Buttons */}
            <div className="d-flex">
              <Button type="submit" className="me-2">
                Save Role
              </Button>
              <Button type="cancel" onClick={() => navigate('/employee-roles')}>
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </AdminLayout>
  );
};
