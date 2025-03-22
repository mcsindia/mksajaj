import React, { useState } from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const DepartmentAdd = () => {
  const navigate = useNavigate(); 

  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const [error, setError] = useState('');

  const departmentOptions = ['HR', 'Finance', 'Engineering', 'Marketing', 'Sales', 'Operations'];

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

    // Validation
    if (!formData.name) {
      setError('Department Name is required.');
      return;
    }

    if (!formData.description.trim()) {
      setError('Description is required.');
      return;
    }

    console.log('New Department Added:', formData);
    alert(`Department "${formData.name}" added successfully!`);

    // Redirect to department list
    navigate('/department');
  };

  return (
    <AdminLayout>
      <Container className='dms-container'>
        <h4>Add New Department</h4>
        <div className='dms-form-container'>
          {/* Error Message */}
          {error && (
            <Alert variant="danger" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Department Name */}
            <Form.Group className="dms-form-group">
              <Form.Label>Department Name</Form.Label>
              <Form.Select name="name" value={formData.name} onChange={handleChange} required>
                <option value="">Select a department</option>
                {departmentOptions.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Description  */}
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
              <Button type="cancel" onClick={() => navigate('/department')}>
                <FaArrowLeft /> Back
              </Button>
              <Button type="submit">
                <FaSave /> Save Department
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </AdminLayout>
  );
};
