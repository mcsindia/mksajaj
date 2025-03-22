import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const ActivityEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract activity data passed from Activity Log page
  const { activity } = location.state || {};

  // Initialize state with the current activity data
  const [formData, setFormData] = useState({
    user_id: activity?.user_id || '',
    ride_id: activity?.ride_id || '',
    action: activity?.action || '',
    description: activity?.description || '',
    timestamp: activity?.timestamp || '',
    status: activity?.status || '',
  });

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

    console.log('Updated Activity:', formData);

    // Simulate updating the data and navigating back
    navigate('/activity-log'); // Redirect back to Activity Log List
  };

  return (
    <AdminLayout>
      <div className='dms-container'>
        <h4>Edit Activity</h4>
        <div className='dms-form-container'>
          <Form onSubmit={handleSubmit}>
            {/* User ID */}
            <Form.Group className="dms-form-group">
              <Form.Label>User ID</Form.Label>
              <Form.Control type="text" name="user_id" value={formData.user_id} onChange={handleChange} required />
            </Form.Group>

            {/* Ride ID */}
            <Form.Group className="dms-form-group">
              <Form.Label>Ride ID</Form.Label>
              <Form.Control type="text" name="ride_id" value={formData.ride_id} onChange={handleChange} required />
            </Form.Group>

            {/* Action */}
            <Form.Group className="dms-form-group">
              <Form.Label>Action</Form.Label>
              <Form.Control type="text" name="action" value={formData.action} onChange={handleChange} required />
            </Form.Group>

            {/* Description with Textarea */}
            <Form.Group className="dms-form-group">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows={4} 
              />
            </Form.Group>

            {/* Timestamp */}
            <Form.Group className="dms-form-group">
              <Form.Label>Timestamp</Form.Label>
              <Form.Control type="datetime-local" name="timestamp" value={formData.timestamp} onChange={handleChange} required />
            </Form.Group>

            {/* Status */}
            <Form.Group className="dms-form-group">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={formData.status} onChange={handleChange} required>
                <option value="">Select Status</option>
                <option value="Success">Success</option>
                <option value="Failed">Failed</option>
                <option value="Pending">Pending</option>
              </Form.Select>
            </Form.Group>

            {/* Buttons */}
            <div className="d-flex">
              <Button type="submit" className="me-2">
                Save Changes
              </Button>
              <Button type="cancel" onClick={() => navigate('/activity-logs')}>
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </AdminLayout>
  );
};
