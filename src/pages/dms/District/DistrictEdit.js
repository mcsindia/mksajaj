import React, { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const DistrictEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve district data from location state (Assumes navigation passes data)
  const districtData = location.state?.district || {
    id: '',
    name: '',
    state_id: '',
  };

  // State for form fields
  const [formData, setFormData] = useState(districtData);
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
    if (!formData.name || !formData.state_id || !formData.population || !formData.area) {
      setError('All fields are required.');
      return;
    }

    console.log('Updated District Data:', formData);

    // Simulate saving the data and navigating back
    navigate('/district'); // Redirect back to District List
  };

  return (
    <AdminLayout>
      <div className='dms-container'>
        <h4>Edit District</h4>
        <div className='dms-form-container'>
          {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* District Name */}
            <Form.Group className="dms-form-group">
              <Form.Label>District Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter District Name" value={formData.name} onChange={handleChange} required />
            </Form.Group>

            {/* State ID */}
            <Form.Group className="dms-form-group">
              <Form.Label>State ID</Form.Label>
              <Form.Control type="text" name="state_id" placeholder="Enter State ID" value={formData.state_id} onChange={handleChange} required />
            </Form.Group>

            {/* Buttons */}
            <div className="d-flex">
              <Button type="submit" className="me-2">
                Update District
              </Button>
              <Button type='cancel' onClick={() => navigate('/district')}>
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </AdminLayout>
  );
};
