import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const UserAdd = () => {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    state_id: '',
    district_id: '',
    tehsil_id: '',
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

    // Generate a random password
    const generatePassword = () => {
        const length = 8;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let password = '';
        for (let i = 0; i < length; i++) {
          password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setFormData({ ...formData, password });
      };
    

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Form Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.role || !formData.state_id || !formData.district_id || !formData.tehsil_id) {
      setError('All fields are required.');
      return;
    }

    console.log('Form Submitted', formData);

    // Simulate saving the data and navigating back
    navigate('/user'); // Redirect back to User List
  };

  return (
    <AdminLayout>
      <div className='dms-container'>
        <h4>Add New User</h4>
        <div className='dms-form-container'>
          {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* Name */}
            <Form.Group className="dms-form-group">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange} required />
            </Form.Group>

            {/* Email */}
            <Form.Group className="dms-form-group">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} required />
            </Form.Group>

            {/* Phone */}
            <Form.Group className="dms-form-group">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} required />
            </Form.Group>

            {/* Role */}
            <Form.Group className="dms-form-group">
              <Form.Label>Role</Form.Label>
              <Form.Select name="role" value={formData.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="State Coordinator">State Coordinator</option>
                <option value="District Coordinator">District Coordinator</option>
                <option value="Member">Member</option>
              </Form.Select>
            </Form.Group>

            {/* State ID */}
            <Form.Group className="dms-form-group">
              <Form.Label>State ID</Form.Label>
              <Form.Control type="text" name="state_id" placeholder="Enter State ID" value={formData.state_id} onChange={handleChange} required />
            </Form.Group>

            {/* District ID */}
            <Form.Group className="dms-form-group">
              <Form.Label>District ID</Form.Label>
              <Form.Control type="text" name="district_id" placeholder="Enter District ID" value={formData.district_id} onChange={handleChange} required />
            </Form.Group>

            {/* Tehsil ID */}
            <Form.Group className="dms-form-group">
              <Form.Label>Tehsil ID</Form.Label>
              <Form.Control type="text" name="tehsil_id" placeholder="Enter Tehsil ID" value={formData.tehsil_id} onChange={handleChange} required />
            </Form.Group>

              {/* Password */}
              <Form.Group className="dms-form-group">
              <Form.Label>Password</Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className='me-3'
                />
                <Button
                  variant="success"
                  onClick={generatePassword}
                  className="flex-shrink-0"
                >
                  Generate
                </Button>
              </div>
            </Form.Group>

            {/* Buttons */}
            <div className="d-flex">
              <Button type="submit" className="me-2">
                Save User
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
