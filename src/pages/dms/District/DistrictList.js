import React, { useState } from 'react';
import { Button, Table, InputGroup, Form, Pagination, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye, FaFileExport, FaPlus, FaFileExcel, FaFilePdf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const DistrictList = () => {
    const navigate = useNavigate();

    const initialDistricts = [
        { id: 1, state_id: 101, name: 'Jaipur' },
        { id: 2, state_id: 102, name: 'Mumbai Suburban', },
        { id: 3, state_id: 103, name: 'Bangalore Urban', },
    ];

    const [districts, setDistricts] = useState(initialDistricts);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [districtToDelete, setDistrictToDelete] = useState(null);

    const itemsPerPage = 3;

    const handleSearch = (e) => setSearch(e.target.value);

    const filteredDistricts = districts.filter((district) =>
        district.name.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDistricts = filteredDistricts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredDistricts.length / itemsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handleDelete = (id) => {
        setDistrictToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setDistricts(districts.filter((district) => district.id !== districtToDelete));
        setShowDeleteModal(false);
        setDistrictToDelete(null);
    };

    return (
        <AdminLayout>
            <div className="district-container p-3">
                <div className="dms-pages-header sticky-header">
                    <h3>District List</h3>
                    <div className="d-flex">
                        <DropdownButton variant="primary" title={<><FaFileExport /> Export</>} className="me-2">
                            <Dropdown.Item> <FaFileExcel className="icon-green" /> Export to Excel</Dropdown.Item>
                            <Dropdown.Item> <FaFilePdf className="icon-red" /> Export to PDF</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton variant="primary" title={<><FaFileExport /> Import</>} className="me-2">
                            <Dropdown.Item> <FaFileExcel className="icon-green" /> Import from Excel</Dropdown.Item>
                            <Dropdown.Item> <FaFilePdf className="icon-red" /> Import from PDF</Dropdown.Item>
                        </DropdownButton>
                        <Button variant="primary" onClick={() => navigate('/district/add')}>
                            <FaPlus /> Add District
                        </Button>
                    </div>
                </div>

                <div className="d-flex justify-content-between mb-3">
                    <InputGroup className="dms-custom-width">
                        <Form.Control placeholder="Search districts..." value={search} onChange={handleSearch} />
                    </InputGroup>
                </div>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>State ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentDistricts.length > 0 ? (
                            currentDistricts.map((district) => (
                                <tr key={district.id}>
                                    <td>{district.id}</td>
                                    <td>{district.state_id}</td>
                                    <td>{district.name}</td>
                                    <td>
                                        <FaEye title="View" className="icon-blue me-2" onClick={() => alert(`Viewing: ${district.name}`)} />
                                        <FaEdit title="Edit" className="icon-green me-2" onClick={() => navigate("/district/edit", { state: { district } })} />
                                        <FaTrash title="Delete" className="icon-red" onClick={() => handleDelete(district.id)} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">No districts found.</td>
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
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Body>Are you sure you want to delete this district?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
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
