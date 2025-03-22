import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const StatesAdd = () => {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    code: '',
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
    if (!formData.id || !formData.name || !formData.code || !formData.capital || !formData.region || !formData.population) {
      setError('All fields are required.');
      return;
    }

    console.log('State Added:', formData);

    // Simulate saving the data and navigating back
    navigate('/state'); // Redirect back to State List
  };

  return (
    <AdminLayout>
      <div className='dms-container'>
        <h4>Add New State</h4>
        <div className='dms-form-container'>
          {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* State ID */}
            <Form.Group className="dms-form-group">
              <Form.Label>State ID</Form.Label>
              <Form.Control type="text" name="id" placeholder="Enter State ID" value={formData.id} onChange={handleChange} required />
            </Form.Group>

            {/* State Name */}
            <Form.Group className="dms-form-group">
              <Form.Label>State Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter State Name" value={formData.name} onChange={handleChange} required />
            </Form.Group>

            {/* State Code */}
            <Form.Group className="dms-form-group">
              <Form.Label>State Code</Form.Label>
              <Form.Control type="text" name="code" placeholder="Enter State Code (e.g., UP, MH)" value={formData.code} onChange={handleChange} required />
            </Form.Group>

            {/* Buttons */}
            <div className="d-flex">
              <Button type="submit" className="me-2">
                Save State
              </Button>
              <Button type="cancel" onClick={() => navigate('/state')}>
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </AdminLayout>
  );
};
