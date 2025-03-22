import React, { useState } from 'react';
import { Button, Table, InputGroup, Form, Pagination, Dropdown, DropdownButton} from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye, FaFileExport, FaPlus, FaFileExcel, FaFilePdf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const ActivityList = () => {
  const navigate = useNavigate();

  const initialActivities = [
    { id: 1, user_id: 'U001', ride_id: 'R1001', action: 'Ride Requested', description: 'User requested a ride.', timestamp: '2025-03-13 10:30 AM', status: 'Success' },
    { id: 2, user_id: 'U002', ride_id: 'R1002', action: 'Ride Accepted', description: 'activity accepted the ride.', timestamp: '2025-03-13 11:00 AM', status: 'Pending' },
    { id: 3, user_id: 'U003', ride_id: 'R1003', action: 'Ride Completed', description: 'Ride completed successfully.', timestamp: '2025-03-13 12:15 PM', status: 'Success' },
  ];

  const [activities, setActivities] = useState(initialActivities);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState(null);

  const itemsPerPage = 3;

  const handleSearch = (e) => setSearch(e.target.value);

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.action.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter ? activity.status === filter : true;
    return matchesSearch && matchesFilter;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentActivities = filteredActivities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    setActivityToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updatedActivities = activities.filter((activity) => activity.id !== activityToDelete);
    setActivities(updatedActivities);
    setShowDeleteModal(false);
    setActivityToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setActivityToDelete(null);
  };

  return (
    <AdminLayout>
      <div className="activity-list-container p-3">
        <div className="dms-pages-header sticky-header">
          <h3>Activity List</h3>
          <div className="d-flex">
            <DropdownButton variant="primary" title={<><FaFileExport /> Export</>} className="me-2">
              <Dropdown.Item> <FaFileExcel className="icon-green" /> Export to Excel</Dropdown.Item>
              <Dropdown.Item> <FaFilePdf className="icon-red" /> Export to PDF</Dropdown.Item>
            </DropdownButton>
            <DropdownButton variant="primary" title={<><FaFileExport /> Import</>} className="me-2">
              <Dropdown.Item> <FaFileExcel className="icon-green" /> Import from Excel</Dropdown.Item>
              <Dropdown.Item> <FaFilePdf className="icon-red" /> Import from PDF</Dropdown.Item>
            </DropdownButton>
            <Button variant="primary" onClick={() => navigate('/activity-logs/add')}>
              <FaPlus /> Add Activity
            </Button>
          </div>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <DropdownButton variant="primary" title="Filter" id="filter-dropdown">
            <Dropdown.Item onClick={() => setFilter('')}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('Success')}>Success</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('Failed')}>Failed</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('Pending')}>Pending</Dropdown.Item>
          </DropdownButton>
          <InputGroup className="dms-custom-width">
            <Form.Control
              placeholder="Search activities..."
              value={search}
              onChange={handleSearch}
            />
          </InputGroup>
        </div>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>SNo</th>
              <th>User ID</th>
              <th>Ride ID</th>
              <th>Action</th>
              <th>Description</th>
              <th>Timestamp</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentActivities.length > 0 ? (
              currentActivities.map((activity, index) => (
                <tr key={activity.id}>
                  <td>{index + 1}</td>
                  <td>
                    <a href='#' role="button" className='user-id-link' onClick={() => navigate('/user/profile', { state: { user: activity } })}>
                      {activity.user_id}
                    </a>
                  </td>
                  <td>
                    <a href='#' role="button" className='rider-id-link' onClick={() => navigate('/rider/profile', { state: { rider: activity } })}>
                      {activity.ride_id}
                    </a>
                  </td>
                  <td>{activity.action}</td>
                  <td>{activity.description}</td>
                  <td>{activity.timestamp}</td>
                  <td>{activity.status}</td>
                  <td>
                    <FaEye title="View" className="icon-blue me-2" onClick={() => navigate("/activity-logs/view", { state: { activity } })} />
                    <FaEdit title="Edit" className="icon-green me-2" onClick={() => navigate("/activity-logs/edit", { state: { activity } })} />
                    <FaTrash title="Delete" className="icon-red" onClick={() => handleDelete(activity.id)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No activities found.</td>
              </tr>
            )}
          </tbody>
        </Table>

        <Pagination className="justify-content-center">
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>
    </AdminLayout>
  );
};