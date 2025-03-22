import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const TehsilAdd = () => {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    district_id: '',
    name: '',
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
    if (!formData.district_id || !formData.name) {
      setError('All fields are required.');
      return;
    }

    console.log('Tehsil Added:', formData);

    // Simulate saving the data and navigating back
    navigate('/tehsil'); // Redirect back to Tehsil List
  };

  return (
    <AdminLayout>
      <div className='dms-container'>
        <h4>Add New Tehsil</h4>
        <div className='dms-form-container'>
          {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* District ID */}
            <Form.Group className="dms-form-group">
              <Form.Label>District ID</Form.Label>
              <Form.Control type="text" name="district_id" placeholder="Enter District ID" value={formData.district_id} onChange={handleChange} required />
            </Form.Group>

            {/* Tehsil Name */}
            <Form.Group className="dms-form-group">
              <Form.Label>Tehsil Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter Tehsil Name" value={formData.name} onChange={handleChange} required />
            </Form.Group>

            {/* Buttons */}
            <div className="d-flex">
              <Button type="submit" className="me-2">
                Save Tehsil
              </Button>
              <Button type='cancel' onClick={() => navigate('/tehsil')}>
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </AdminLayout>
  );
};
