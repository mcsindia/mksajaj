import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const DesignationEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name, departmentId } = location.state;

  const [formData, setFormData] = useState({ id, name, departmentId });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log('Saved:', formData);
    navigate('/designation');
  };

  return (
    <AdminLayout>
      <Container className='dms-container'>
      <h4>Edit Designation Details</h4>
      <div className='dms-form-container'>
      <Form>
      <Form.Group className="dms-form-group">
          <Form.Label>Department ID</Form.Label>
          <Form.Control
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="dms-form-group">
          <Form.Label>Designation Name</Form.Label>
          <Form.Control
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>
        
        {/* Add margin-top for padding above buttons */}
        <div className="mt-3">
          <Button type='submit' onClick={handleSave}>
            Save Changes
          </Button>
          <Button
            type='cancel'
            className="ms-2"
            onClick={() => navigate('/designation')}
          >
            Cancel
          </Button>
        </div>
      </Form>
      </div>
      </Container>
    </AdminLayout>
  );
};