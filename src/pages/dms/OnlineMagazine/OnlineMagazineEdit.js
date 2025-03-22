import React, { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const OnlineMagazineEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const magazine = location.state?.magazine || {};

  // State for form fields
  const [formData, setFormData] = useState({
    id: magazine.id || '',
    title: magazine.title || '',
    content: magazine.content || '',
    authorId: magazine.authorId || '',
    publishedAt: magazine.publishedAt || '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (!magazine.id) {
      setError('No magazine selected for editing.');
    }
  }, [magazine]);

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

    console.log('Updated Magazine:', formData);

    // Simulate updating the data and navigating back
    navigate('/online-magazine'); // Redirect back to Magazine List
  };

  return (
    <AdminLayout>
      <div className='dms-container'>
        <h4>Edit Online Magazine</h4>
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
                Update Magazine
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
