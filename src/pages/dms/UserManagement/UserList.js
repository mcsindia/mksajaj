import React, { useState } from 'react';
import { Button, Table, InputGroup, Form, Pagination, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye, FaFileExport, FaPlus, FaFileExcel, FaFilePdf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const UserList = () => {
    const navigate = useNavigate();

    const initialUsers = [
        { id: 1, name: 'Amit Verma', email: 'amit.verma@example.com', phone: '9876543210', role: 'Admin', stateId: '101', districtId: '201', tehsilId: '301', createdAt: '2025-03-18 10:00 AM' },
        { id: 2, name: 'Ravi Kumar', email: 'ravi.kumar@example.com', phone: '9123456780', role: 'State Coordinator', stateId: '102', districtId: '202', tehsilId: '302', createdAt: '2025-03-17 09:30 AM' },
        { id: 3, name: 'Sunita Sharma', email: 'sunita.sharma@example.com', phone: '9988776655', role: 'District Coordinator', stateId: '103', districtId: '203', tehsilId: '303', createdAt: '2025-03-16 02:15 PM' },
        { id: 4, name: 'Priya Singh', email: 'priya.singh@example.com', phone: '8899001122', role: 'Member', stateId: '104', districtId: '204', tehsilId: '304', createdAt: '2025-03-15 11:45 AM' },
    ];

    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const itemsPerPage = 3;

    const handleSearch = (e) => setSearch(e.target.value);
    const handleFilter = (role) => setFilter(role);

    const filteredUsers = users.filter((user) =>
        (user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.phone.includes(search)) &&
        (filter ? user.role === filter : true)
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handleDelete = (id) => {
        setUserToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setUsers(users.filter((user) => user.id !== userToDelete));
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    return (
        <AdminLayout>
            <div className="user-container p-3">
                <div className="dms-pages-header sticky-header">
                    <h3>User List</h3>
                    <div className="d-flex">
                        <DropdownButton variant="primary" title={<><FaFileExport /> Export</>} className="me-2">
                            <Dropdown.Item> <FaFileExcel className="icon-green" /> Export to Excel</Dropdown.Item>
                            <Dropdown.Item> <FaFilePdf className="icon-red" /> Export to PDF</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton variant="primary" title={<><FaFileExport /> Import</>} className="me-2">
                            <Dropdown.Item> <FaFileExcel className="icon-green" /> Import from Excel</Dropdown.Item>
                            <Dropdown.Item> <FaFilePdf className="icon-red" /> Import from PDF</Dropdown.Item>
                        </DropdownButton>
                        <Button variant="primary" onClick={() => navigate('/user/add')}>
                            <FaPlus /> Add User
                        </Button>
                    </div>
                </div>

                <div className="d-flex justify-content-between mb-3">
                    <DropdownButton variant="primary" title="Filter" id="filter-dropdown">
                        <Dropdown.Item onClick={() => handleFilter('')}>All</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilter('Admin')}>Admin</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilter('State Coordinator')}>State Coordinator</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilter('District Coordinator')}>District Coordinator</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilter('Member')}>Member</Dropdown.Item>
                        <Dropdown.Item className="text-custom-danger" onClick={() => handleFilter('')}>Cancel</Dropdown.Item>
                    </DropdownButton>
                    <InputGroup className="dms-custom-width">
                        <Form.Control placeholder="Search users..." value={search} onChange={handleSearch} />
                    </InputGroup>
                </div>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>State ID</th>
                            <th>District ID</th>
                            <th>Tehsil ID</th>
                            <th>Created Date/Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.length > 0 ? (
                            currentUsers.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.role}</td>
                                    <td>{user.stateId}</td>
                                    <td>{user.districtId}</td>
                                    <td>{user.tehsilId}</td>
                                    <td>{user.createdAt}</td>
                                    <td>
                                        <FaEye title="View" className="icon-blue me-2" onClick={() => alert(`Viewing: ${user.name}`)} />
                                        <FaEdit title="Edit" className="icon-green me-2" onClick={() => navigate("/user/edit", { state: { user } })} />
                                        <FaTrash title="Delete" className="icon-red" onClick={() => handleDelete(user.id)} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="text-center">No users found.</td>
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
                    <Modal.Body>Are you sure you want to delete this user role?</Modal.Body>
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

