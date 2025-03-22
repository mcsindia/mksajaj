import React, { useState } from 'react';
import { Button, Table, InputGroup, Form, Pagination, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye, FaFileExport, FaPlus, FaFileExcel, FaFilePdf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const StatesList = () => {
    const navigate = useNavigate();

    const initialStates = [
        { id: 101, name: 'Uttar Pradesh', code: 'UP' },
        { id: 102, name: 'Maharashtra', code: 'MH' },
        { id: 103, name: 'Rajasthan', code: 'RJ' },
        { id: 104, name: 'Gujarat', code: 'GJ' },
    ];

    const [states, setStates] = useState(initialStates);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [stateToDelete, setStateToDelete] = useState(null);

    const itemsPerPage = 3;

    const handleSearch = (e) => setSearch(e.target.value);

    const filteredStates = states.filter((state) =>
        state.name.toLowerCase().includes(search.toLowerCase()) || 
        state.code.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentStates = filteredStates.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredStates.length / itemsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handleDelete = (id) => {
        setStateToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setStates(states.filter((state) => state.id !== stateToDelete));
        setShowDeleteModal(false);
        setStateToDelete(null);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setStateToDelete(null);
    };

    return (
        <AdminLayout>
            <div className="state-container p-3">
                <div className="dms-pages-header sticky-header">
                    <h3>State List</h3>
                    <div className="d-flex">
                        <DropdownButton variant="primary" title={<><FaFileExport /> Export</>} className="me-2">
                            <Dropdown.Item> <FaFileExcel className="icon-green" /> Export to Excel</Dropdown.Item>
                            <Dropdown.Item> <FaFilePdf className="icon-red" /> Export to PDF</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton variant="primary" title={<><FaFileExport /> Import</>} className="me-2">
                            <Dropdown.Item> <FaFileExcel className="icon-green" /> Import from Excel</Dropdown.Item>
                            <Dropdown.Item> <FaFilePdf className="icon-red" /> Import from PDF</Dropdown.Item>
                        </DropdownButton>
                        <Button variant="primary" onClick={() => navigate('/state/add')}>
                            <FaPlus /> Add State
                        </Button>
                    </div>
                </div>

                <div className="d-flex justify-content-between mb-3">
                    <InputGroup className="dms-custom-width">
                        <Form.Control placeholder="Search by state name or code..." value={search} onChange={handleSearch} />
                    </InputGroup>
                </div>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Code</th>
                            <th>State Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStates.length > 0 ? (
                            currentStates.map((state, index) => (
                                <tr key={state.id}>
                                    <td>{index + 1}</td>
                                    <td>{state.code}</td>
                                    <td>{state.name}</td>
                                    <td>
                                        <FaEye title="View" className="icon-blue me-2" onClick={() => alert(`Viewing: ${state.name}`)} />
                                        <FaEdit title="Edit" className="icon-green me-2" onClick={() => navigate("/state/edit", { state: { state } })} />
                                        <FaTrash title="Delete" className="icon-red" onClick={() => handleDelete(state.id)} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No states found.</td>
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
                    <Modal.Body>Are you sure you want to delete this state?</Modal.Body>
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
