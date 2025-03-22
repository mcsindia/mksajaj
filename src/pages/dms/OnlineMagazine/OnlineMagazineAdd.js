import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const OnlineMagazineAdd = () => {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    authorId: '',
    publishedAt: '',
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
    if (!formData.title || !formData.content || !formData.authorId || !formData.publishedAt) {
      setError('All fields are required.');
      return;
    }

    console.log('Form Submitted', formData);

    // Simulate saving the data and navigating back
    navigate('/online-magazine'); // Redirect back to Magazine List
  };

  return (
    <AdminLayout>
      <div className='dms-container'>
        <h4>Add New Online Magazine</h4>
        <div className='dms-form-container'>
          {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* Title */}
            <Form.Group className="dms-form-group">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" placeholder="Enter title" value={formData.title} onChange={handleChange} required />
            </Form.Group>

            {/* Content */}
            <Form.Group className="dms-form-group">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={5} name="content" placeholder="Enter content" value={formData.content} onChange={handleChange} required />
            </Form.Group>

            {/* Author ID */}
            <Form.Group className="dms-form-group">
              <Form.Label>Author ID</Form.Label>
              <Form.Control type="text" name="authorId" placeholder="Enter Author ID" value={formData.authorId} onChange={handleChange} required />
            </Form.Group>

            {/* Published Date */}
            <Form.Group className="dms-form-group">
              <Form.Label>Published Date</Form.Label>
              <Form.Control type="datetime-local" name="publishedAt" value={formData.publishedAt} onChange={handleChange} required />
            </Form.Group>

            {/* Buttons */}
            <div className="d-flex">
              <Button type="submit" className="me-2">
                Save Magazine
              </Button>
              <Button type='cancel' onClick={() => navigate('/online-magazine')}>
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </AdminLayout>
  );
};
