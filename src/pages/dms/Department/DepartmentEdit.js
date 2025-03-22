import React, { useState } from 'react';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';

export const DepartmentEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve department data from state
  const { department } = location.state || {};

  const [formData, setFormData] = useState({
    id: department?.id || '',
    name: department?.name || '',
    description: department?.description || '',
    createdAt: department?.createdAt || '',
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Save
  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.name) {
      alert('Department Name is required!');
      return;
    }

    console.log('Updated Department:', formData);
    alert(`Department "${formData.name}" updated successfully!`);

    // Handle save logic (e.g., API call or update state)
    navigate('/department'); // Navigate back to department list
  };

  return (
    <AdminLayout>
      <Container className='dms-container'>
        <h4>Edit Department Details</h4>
        <div className='dms-form-container'>
          <Form onSubmit={handleSave}>
            {/* Department Name */}
            <Form.Group className="dms-form-group">
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter department name"
                required
              />
            </Form.Group>

            {/* Description with Textarea */}
            <Form.Group className="dms-form-group">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Enter department description"
              />
            </Form.Group>

            {/* Buttons */}
            <div className="d-flex justify-content-between mt-4">
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
              <Button type="cancel" variant="secondary" onClick={() => navigate('/department')}>
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </AdminLayout>
  );
};
