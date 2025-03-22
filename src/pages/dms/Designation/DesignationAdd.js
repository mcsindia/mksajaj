import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const DesignationAdd = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    departmentId: '',
  });

  const departmentOptions = [
    'HR', 'Finance', 'Engineering', 'Marketing', 'Sales', 'Operations'
  ];

  // Handle Form Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AdminLayout>
      <Container className='dms-container'>
      <h4>Add Designation</h4>
      <div className='dms-form-container'>
      <Form>
        <Form.Group className="dms-form-group">
          <Form.Label>Department</Form.Label>
          <Form.Control
            as="select"
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
            required
          >
            <option value="">Select a department</option>
            {departmentOptions.map((dept, index) => (
              <option key={index} value={dept}>{dept}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className='dms-form-group'>
          <Form.Label>Designation Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Designation Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Buttons */}
         <div className="d-flex justify-content-between mt-4">
                <Button type='cancel' onClick={() => navigate('/designation')}>
                  <FaArrowLeft /> Back
                </Button>
                <Button  type="submit">
                  <FaSave /> Save Designation
                </Button>
              </div>
      </Form>
      </div>
      </Container>
    </AdminLayout>
  );
};
