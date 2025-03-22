import React, { useState } from 'react';
import { Button, Table, InputGroup, Form, Pagination, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye, FaFileExport, FaPlus, FaFileExcel, FaFilePdf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const TehsilList = () => {
    const navigate = useNavigate();

    // Sample Tehsil Data
    const initialTehsils = [
        { id: 1, district_id: '201', name: 'Tehsil A' },
        { id: 2, district_id: '202', name: 'Tehsil B' },
        { id: 3, district_id: '203', name: 'Tehsil C' },
        { id: 4, district_id: '204', name: 'Tehsil D' },
    ];

    const [tehsils, setTehsils] = useState(initialTehsils);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [tehsilToDelete, setTehsilToDelete] = useState(null);

    const itemsPerPage = 5;

    const handleSearch = (e) => setSearch(e.target.value);

    // Filter Tehsils
    const filteredTehsils = tehsils.filter((tehsil) =>
        tehsil.name.toLowerCase().includes(search.toLowerCase()) ||
        tehsil.district_id.toString().includes(search)
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTehsils = filteredTehsils.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredTehsils.length / itemsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handleDelete = (id) => {
        setTehsilToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setTehsils(tehsils.filter((tehsil) => tehsil.id !== tehsilToDelete));
        setShowDeleteModal(false);
        setTehsilToDelete(null);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setTehsilToDelete(null);
    };

    return (
        <AdminLayout>
            <div className="tehsil-container p-3">
                <div className="dms-pages-header sticky-header">
                    <h3>Tehsil List</h3>
                    <div className="d-flex">
                        <DropdownButton variant="primary" title={<><FaFileExport /> Export</>} className="me-2">
                            <Dropdown.Item> <FaFileExcel className="icon-green" /> Export to Excel</Dropdown.Item>
                            <Dropdown.Item> <FaFilePdf className="icon-red" /> Export to PDF</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton variant="primary" title={<><FaFileExport /> Import</>} className="me-2">
                            <Dropdown.Item> <FaFileExcel className="icon-green" /> Import from Excel</Dropdown.Item>
                            <Dropdown.Item> <FaFilePdf className="icon-red" /> Import from PDF</Dropdown.Item>
                        </DropdownButton>
                        <Button variant="primary" onClick={() => navigate('/tehsil/add')}>
                            <FaPlus /> Add Tehsil
                        </Button>
                    </div>
                </div>

                <div className="d-flex justify-content-between mb-3">
                    <InputGroup className="dms-custom-width">
                        <Form.Control placeholder="Search tehsils..." value={search} onChange={handleSearch} />
                    </InputGroup>
                </div>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>District ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTehsils.length > 0 ? (
                            currentTehsils.map((tehsil, index) => (
                                <tr key={tehsil.id}>
                                    <td>{index + 1}</td>
                                    <td>{tehsil.district_id}</td>
                                    <td>{tehsil.name}</td>
                                    <td>
                                        <FaEye title="View" className="icon-blue me-2" onClick={() => alert(`Viewing: ${tehsil.name}`)} />
                                        <FaEdit title="Edit" className="icon-green me-2" onClick={() => navigate("/tehsil/edit", { state: { tehsil } })} />
                                        <FaTrash title="Delete" className="icon-red" onClick={() => handleDelete(tehsil.id)} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">No tehsils found.</td>
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
                    <Modal.Body>Are you sure you want to delete this tehsil?</Modal.Body>
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
