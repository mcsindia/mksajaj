import React, { useState } from 'react';
import { Button, Table, InputGroup, Form, Pagination, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye, FaFileExport, FaPlus, FaFileExcel, FaFilePdf} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const RolePermission = () => {
  const navigate = useNavigate();

  const initialPermissions = [
    { id: 1, role: 'Admin', department: 'HR', designation: 'Manager' },
    { id: 2, role: 'User', department: 'IT', designation: 'Developer' },
    { id: 3, role: 'Manager', department: 'Sales', designation: 'Team Lead' },
    { id: 4, role: 'HR', department: 'HR', designation: 'HR Executive' },
  ];

  const [permissions, setPermissions] = useState(initialPermissions);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [permissionToDelete, setPermissionToDelete] = useState(null);

  const itemsPerPage = 3;

  const handleSearch = (e) => setSearch(e.target.value);

  const filteredPermissions = permissions.filter((permission) => {
    const matchesSearch = permission.role.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter ? permission.role === filter : true;
    return matchesSearch && matchesFilter;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPermissions = filteredPermissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPermissions.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    setPermissionToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updatedPermissions = permissions.filter((permission) => permission.id !== permissionToDelete);
    setPermissions(updatedPermissions);
    setShowDeleteModal(false);
    setPermissionToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPermissionToDelete(null);
  };

  return (
    <AdminLayout>
      <div className="employee-permissions-container p-3">
        <div className="dms-pages-header sticky-header">
          <h3> Role Permission</h3>
          <div className="d-flex">
            <DropdownButton variant="primary" title={<><FaFileExport /> Export</>} className="me-2">
              <Dropdown.Item> <FaFileExcel className="icon-green" /> Export to Excel</Dropdown.Item>
              <Dropdown.Item> <FaFilePdf className="icon-red" /> Export to PDF</Dropdown.Item>
            </DropdownButton>
            <DropdownButton variant="primary" title={<><FaFileExport /> Import</>} className="me-2">
              <Dropdown.Item> <FaFileExcel className="icon-green" /> Import from Excel</Dropdown.Item>
              <Dropdown.Item> <FaFilePdf className="icon-red" /> Import from PDF</Dropdown.Item>
            </DropdownButton>
            <Button variant="primary" onClick={() => navigate('/role-permisssion/add')}>
              <FaPlus /> Add Permission
            </Button>
          </div>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <DropdownButton variant="primary" title={<>Filter</>} id="filter-dropdown">
            <Dropdown.Item onClick={() => setFilter('')}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('Admin')}>Admin</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('User')}>User</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('Manager')}>Manager</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('HR')}>HR</Dropdown.Item>
            <Dropdown.Item className="text-custom-danger" onClick={() => setFilter('')}>Cancel</Dropdown.Item>
          </DropdownButton>
          <InputGroup className="dms-custom-width">
            <Form.Control
              placeholder="Search permissions..."
              value={search}
              onChange={handleSearch}
            />
          </InputGroup>
        </div>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>SNo</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPermissions.length > 0 ? (
              currentPermissions.map((permission, index) => (
                <tr key={permission.id}>
                  <td>{index + 1}</td>
                  <td>{permission.department}</td>
                  <td>{permission.designation}</td>
                  <td>{permission.role}</td>
                  <td>
                    <FaEye title="View" className="icon-blue me-2" onClick={() => navigate("/role-permission/view", { state: { permission } })} />
                    <FaEdit title="Edit" className="icon-green me-2" onClick={() => navigate("/role-permission/edit", { state: { permission } })} />
                    <FaTrash title="Delete" className="icon-red" onClick={() => handleDelete(permission.id)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No permissions found.</td>
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

        <Modal show={showDeleteModal} onHide={cancelDelete}>
          <Modal.Body>Are you sure you want to delete this permission?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelDelete}>Cancel</Button>
            <Button variant="primary" onClick={confirmDelete}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </AdminLayout>
  );
};
