import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const StatesEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract state data passed from the State List page
  const { state } = location.state || {};

  // Initialize state with the current state data
  const [id, setId] = useState(state?.id || '');
  const [name, setName] = useState(state?.name || '');
  const [code, setCode] = useState(state?.code || '');

  // Handle form submission (Update state)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation or API call to update state
    console.log('Updated state:', { id, name, code });

    // Navigate back to the state list page after updating
    navigate('/state');
  };

  return (
    <AdminLayout>
      <div className="dms-container">
        <h4>Edit State</h4>
        <div className="dms-form-container">
          <Form onSubmit={handleSubmit}>
            {/* State ID (Read-only) */}
            <Form.Group controlId="id" className="dms-form-group">
              <Form.Label>State ID</Form.Label>
              <Form.Control type="text" value={id} readOnly />
            </Form.Group>

            {/* State Name */}
            <Form.Group controlId="name" className="dms-form-group">
              <Form.Label>State Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter State Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            {/* State Code */}
            <Form.Group controlId="code" className="dms-form-group">
              <Form.Label>State Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter State Code (e.g., UP, MH)"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </Form.Group>

            {/* Buttons */}
            <div className="d-flex">
              <Button type="submit" className="me-2">
                Save Changes
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
