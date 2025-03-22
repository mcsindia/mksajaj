import React, { useState } from 'react';
import { Button, Form, ProgressBar, Row, Col } from 'react-bootstrap';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaPlus } from 'react-icons/fa';

export const EventAdd = () => {
  const [event, setEvent] = useState({
    event_name: '',
    description: '',
    date_time: '',
    venue: '',
    organizer: '',
    status: '',
    state_id: '',
    district_id: '',
    tehsil_id: '',
  });

  const navigate = useNavigate();

  const [imageFields, setImageFields] = useState([
    { title: '', images: [], progress: 0 },
  ]);

  const handleFileChange = (e) => {
    setEvent({
      ...event,
      imageFile: e.target.files[0],
    });
  };

  const handleImageFieldChange = (index, field, value) => {
    const updatedFields = [...imageFields];
    updatedFields[index][field] = value;
    setImageFields(updatedFields);
  };

  const handleImageUpload = (index, files) => {
    const updatedFields = [...imageFields];
    updatedFields[index].images = Array.from(files);

    let progress = 0;
    const interval = setInterval(() => {
      if (progress >= 100) {
        clearInterval(interval);
      } else {
        progress += 10;
        updatedFields[index].progress = progress;
        setImageFields([...updatedFields]);
      }
    }, 200);
  };

  const addImageField = () => {
    setImageFields([...imageFields, { title: '', images: [], progress: 0 }]);
  };

  const removeImageField = (index) => {
    const updatedFields = imageFields.filter((_, i) => i !== index);
    setImageFields(updatedFields);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event added:', event);
    navigate('/events');
  };

  return (
    <AdminLayout>
      <div className="dms-container">
        <h3 className="mb-4">Add Event</h3>

        <div className="dms-form-container">
          <Form onSubmit={handleSubmit}>
            {/* State, District, and Tehsil Fields */}
            <Form.Group className="dms-form-group" controlId="state_id">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state_id"
                value={event.state_id}
                onChange={handleChange}
                placeholder="Enter State ID"
                required
              />
            </Form.Group>

            <Form.Group className="dms-form-group" controlId="district_id">
              <Form.Label>District</Form.Label>
              <Form.Control
                type="text"
                name="district_id"
                value={event.district_id}
                onChange={handleChange}
                placeholder="Enter District ID"
                required
              />
            </Form.Group>

            <Form.Group className="dms-form-group" controlId="tehsil_id">
              <Form.Label>Tehsil</Form.Label>
              <Form.Control
                type="text"
                name="tehsil_id"
                value={event.tehsil_id}
                onChange={handleChange}
                placeholder="Enter Tehsil ID"
                required
              />
            </Form.Group>

            <Form.Group className="dms-form-group" controlId="event_name">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                name="event_name"
                value={event.event_name}
                onChange={handleChange}
                placeholder="Enter event name"
                required
              />
            </Form.Group>

            <Form.Group className="dms-form-group" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={event.description}
                onChange={handleChange}
                placeholder="Enter event description"
                required
              />
            </Form.Group>

            <Form.Group className="dms-form-group" controlId="date_time">
              <Form.Label>Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="date_time"
                value={event.date_time}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="dms-form-group" controlId="venue">
              <Form.Label>Venue</Form.Label>
              <Form.Control
                type="text"
                name="venue"
                value={event.venue}
                onChange={handleChange}
                placeholder="Enter event venue"
                required
              />
            </Form.Group>

            <Form.Group className="dms-form-group" controlId="organizer">
              <Form.Label>Organizer</Form.Label>
              <Form.Control
                type="text"
                name="organizer"
                value={event.organizer}
                onChange={handleChange}
                placeholder="Enter event organizer"
                required
              />
            </Form.Group>

            <Form.Group className="dms-form-group" controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={event.status}
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </Form.Group>

            {/* Thumbnail Image */}
            <Form.Group className="dms-form-group">
              <Form.Label>Upload Thumbnail Image</Form.Label>
              <Form.Control
                type="file"
                name="imageFile"
                onChange={handleFileChange}
                required
              />
            </Form.Group>

            {/* Multiple Image Fields */}
            <Row className="align-items-center mb-3">
              <Col>
                <h5>Add Multiple Images</h5>
              </Col>
              <Col className="text-end">
                <Button variant="none" onClick={addImageField}>
                  <FaPlus />
                </Button>
              </Col>
            </Row>

            {imageFields.map((field, index) => (
              <div key={index} className="d-flex align-items-center mb-3">
                <Form.Control
                  as="textarea"
                  placeholder="Enter image description"
                  value={field.title}
                  onChange={(e) => handleImageFieldChange(index, 'title', e.target.value)}
                  className="me-2"
                  rows={2}
                  required
                />
                <Form.Control
                  type="file"
                  multiple
                  onChange={(e) => handleImageUpload(index, e.target.files)}
                  className="me-2"
                  required
                />
                <ProgressBar
                  now={field.progress}
                  label={`${field.progress}%`}
                  className="me-2"
                  style={{ width: '150px' }}
                />
                <Button variant="none" onClick={() => removeImageField(index)}>
                  <FaTimes />
                </Button>
              </div>
            ))}

            <Button type="submit">Add Event</Button>
            <Button type='cancel' className="ms-3" onClick={() => navigate('/events')}>
              Cancel
            </Button>
          </Form>
        </div>
      </div>
    </AdminLayout>
  );
};
