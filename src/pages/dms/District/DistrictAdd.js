import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const DistrictAdd = () => {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    state_id: '',
    population: '',
    area: '',
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
    if (!formData.name || !formData.state_id || !formData.population || !formData.area) {
      setError('All fields are required.');
      return;
    }

    console.log('Form Submitted', formData);

    // Simulate saving the data and navigating back
    navigate('/district'); // Redirect back to District List
  };

  return (
    <AdminLayout>
      <div className='dms-container'>
        <h4>Add New District</h4>
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
                Save District
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
