import React, { useState } from 'react';
import { Button, Table, InputGroup, Form, Pagination, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye, FaFileExport, FaPlus, FaFileExcel, FaFilePdf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const EmployeeList = () => {
  const navigate = useNavigate();

  const initialEmployees = [
    { id: 1, name: 'John Doe', mobile: '1234567890',  designation: 'Software Engineer', department: 'IT', status: 'Active' },
    { id: 2, name: 'Jane Smith', mobile: '9876543210', designation: 'HR Manager', department: 'Human Resources', status: 'Inactive' },
    { id: 3, name: 'Alice Wonder', mobile: '4567891230',  designation: 'Developer', department: 'IT', status: 'Active' },
    { id: 4, name: 'Bob Builder', mobile: '7894561230',  designation: ' HR Manager', department: 'Operations', status: 'Active' },
  ];

  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control the modal visibility
  const [employeeToDelete, setEmployeeToDelete] = useState(null); // Store the employee being deleted

  const itemsPerPage = 3;

  const handleSearch = (e) => setSearch(e.target.value);

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.mobile.includes(search) ||
      employee.designation.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter ? employee.designation === filter : true;
    return matchesSearch && matchesFilter;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    setEmployeeToDelete(id); // Set the employee id to delete
    setShowDeleteModal(true); // Show the delete confirmation modal
  };

  const handleToggleStatus = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === id ? { ...employee, status: employee.status === 'Active' ? 'Inactive' : 'Active' } : employee
      )
    );
  };

  const confirmDelete = () => {
    // Delete the employee and hide the modal
    const updatedEmployees = employees.filter((employee) => employee.id !== employeeToDelete);
    setEmployees(updatedEmployees);
    setShowDeleteModal(false);
    setEmployeeToDelete(null); // Clear the employee to delete
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setEmployeeToDelete(null); // Clear the employee to delete if cancelled
  };

  return (
    <AdminLayout>
      <div className="employee-container p-3">
        <div className="dms-pages-header sticky-header">
          <h3>Employee</h3>
          <div className="d-flex">
            <DropdownButton variant="primary" title={<><FaFileExport /> Export</>} className="me-2">
              <Dropdown.Item> <FaFileExcel className="icon-green" /> Export to Excel</Dropdown.Item>
              <Dropdown.Item> <FaFilePdf className="icon-red" /> Export to PDF</Dropdown.Item>
            </DropdownButton>
            <DropdownButton variant="primary" title={<><FaFileExport /> Import</>} className="me-2">
              <Dropdown.Item> <FaFileExcel className="icon-green" /> Import from Excel</Dropdown.Item>
              <Dropdown.Item> <FaFilePdf className="icon-red" /> Import from PDF</Dropdown.Item>
            </DropdownButton>
            <Button variant="primary" onClick={() => navigate('/employee/add')}>
              <FaPlus /> Add Employee
            </Button>
          </div>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <DropdownButton variant="primary" title="Filter" id="filter-dropdown">
            <Dropdown.Item onClick={() => setFilter('')}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('Software Engineer')}>Software Engineer</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('HR Manager')}>HR Manager</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('Developer')}>Developer</Dropdown.Item>
            <Dropdown.Item className="text-custom-danger" onClick={() => setFilter("")}>Cancel</Dropdown.Item>
          </DropdownButton>
          <InputGroup className="dms-custom-width">
            <Form.Control
              placeholder="Search employees..."
              value={search}
              onChange={handleSearch}
            />
          </InputGroup>
        </div>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.mobile}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.department}</td>
                  <td>
                    <Form.Check 
                      type="switch"
                      id={`status-switch-${employee.id}`}
                      checked={employee.status === 'Active'}
                      onChange={() => handleToggleStatus(employee.id)}
                    />
                  </td>
                  <td>
                    <FaEye title="View" className="icon-blue me-2" onClick={() => alert(`Viewing: ${employee.name}`)} />
                    <FaEdit title="Edit" className="icon-green me-2" onClick={() => navigate("/employee/edit", { state: { employee } })} />
                    <FaTrash title="Delete" className="icon-red" onClick={() => handleDelete(employee.id)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No employees found.</td>
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

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={cancelDelete}>
          <Modal.Body>Are you sure you want to delete this employee?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="primary" onClick={confirmDelete}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </AdminLayout>
  );
};
