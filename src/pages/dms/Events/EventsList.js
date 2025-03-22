import React, { useState } from 'react';
import { Button, Table, InputGroup, Form, Pagination, Dropdown, DropdownButton } from 'react-bootstrap';
import { FaFileExport, FaFileExcel, FaFilePdf, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const EventsList = () => {
  // Initial Events Data with Images
  const initialEvents = [
    { 
      id: 1, 
      event_name: 'Tech Conference 2025', 
      description: 'A tech conference on the future of AI.', 
      date_time: '2025-02-10 09:00:00', 
      venue: 'Conference Hall A', 
      organizer: 'Tech Corp', 
      status: 'Scheduled',
      image: 'https://placehold.co/100',
      state_id: 101, district_id: 201, tehsil_id: 301, 
    },
    { 
      id: 2, 
      event_name: 'Marketing Meetup', 
      description: 'A meetup for digital marketers.', 
      date_time: '2025-02-15 14:00:00', 
      venue: 'Venue B', 
      organizer: 'Marketing Co.', 
      status: 'Completed',
      image: 'https://placehold.co/100',
      state_id: 102, district_id: 202, tehsil_id: 302,
    },
    { 
      id: 3, 
      event_name: 'Startup Expo', 
      description: 'An expo for startups and investors.', 
      date_time: '2025-03-20 10:00:00', 
      venue: 'Exhibition Center', 
      organizer: 'Startup Hub', 
      status: 'Scheduled',
      image: 'https://placehold.co/100',
      state_id: 103, district_id: 203, tehsil_id: 303 ,
    },
  ];

  const navigate = useNavigate();
  const [events, setEvents] = useState(initialEvents);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Search Functionality
  const handleSearch = (e) => setSearch(e.target.value);

  // Filter Events
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.event_name.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase()) ||
      event.venue.toLowerCase().includes(search.toLowerCase()) ||
      event.organizer.toLowerCase().includes(search.toLowerCase()) ||
      event.status.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter ? event.status === filter : true;
    return matchesSearch && matchesFilter;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // View, Edit, Delete Actions
  const handleView = (eventId) => {
    navigate(`/events/view/${eventId}`);
  };

  const handleEdit = (eventId) => {
    const event = events.find((event) => event.id === eventId);
    navigate(`/events/edit`, { state: { event } });
  };  

  const handleDelete = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  return (
    <AdminLayout>
      <div className="eventslist-container p-3">
        {/* Header Options */}
        <div className="dms-pages-header sticky-header">
          <h3>Events List</h3>
          <div className="d-flex">
            <DropdownButton variant="primary" title={<><FaFileExport /> Export</>} className="me-2">
              <Dropdown.Item><FaFileExcel className="icon-green" /> Export to Excel</Dropdown.Item>
              <Dropdown.Item><FaFilePdf className="icon-red" /> Export to PDF</Dropdown.Item>
            </DropdownButton>
            <DropdownButton variant="primary" title={<><FaFileExport /> Import</>} className="me-2">
              <Dropdown.Item> <FaFileExcel className="icon-green" /> Import from Excel</Dropdown.Item>
              <Dropdown.Item> <FaFilePdf className="icon-red" /> Import from PDF</Dropdown.Item>
            </DropdownButton>
            <Button variant="primary" onClick={() => navigate('/events/add')}>
              <FaPlus /> Add Event
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="d-flex justify-content-between mb-3">
          <DropdownButton variant="primary" title={`Filter: ${filter || 'All'}`} id="filter-dropdown">
            <Dropdown.Item onClick={() => setFilter('')}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('Scheduled')}>Scheduled</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('Completed')}>Completed</Dropdown.Item>
            <Dropdown.Item className='text-custom-danger' onClick={() => setFilter('')}>Cancel</Dropdown.Item>
          </DropdownButton>

          <InputGroup className="dms-custom-width">
            <Form.Control
            id="search-events"
              placeholder="Search events..."
              value={search}
              onChange={handleSearch}
            />
          </InputGroup>
        </div>

        {/* Table */}
        <div className="dms-table-container">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Image</th>
                <th>Event Name</th>
                <th>Description</th>
                <th>Date & Time</th>
                <th>Venue</th>
                <th>Organizer</th>
                <th>Status</th>
                <th>State ID</th>  
                <th>District ID</th>  
                <th>Tehsil ID</th> 
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEvents.length > 0 ? (
                currentEvents.map((event, index) => (
                  <tr key={event.id}>
                    <td>
                      <img 
                        src={event.image} 
                        alt={event.event_name} 
                        className="event-img" 
                        style={{ width: '50px', height: '50px', borderRadius: '5px' }}
                      />
                    </td>
                    <td>{event.event_name}</td>
                    <td>{event.description}</td>
                    <td>{event.date_time}</td>
                    <td>{event.venue}</td>
                    <td>{event.organizer}</td>
                    <td>{event.status}</td>
                    <td>{event.state_id}</td> 
                    <td>{event.district_id}</td>
                    <td>{event.tehsil_id}</td>
                    <td>
                      <FaEye title="View" className="icon-blue me-2" onClick={() => handleView(event.id)} />
                      <FaEdit title="Edit" className="icon-green me-2" onClick={() => handleEdit(event.id)} />
                      <FaTrash title="Delete" className="icon-red" onClick={() => handleDelete(event.id)} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center">No events found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        <Pagination className="justify-content-center">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </AdminLayout>
  );
};
