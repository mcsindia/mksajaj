import React, { useState } from 'react';
import { Button, Table, InputGroup, Form, Pagination, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye, FaFileExport, FaPlus, FaFileExcel, FaFilePdf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const OnlineMagazineList = () => {
    const navigate = useNavigate();

    const initialMagazines = [
        { id: 1, title: 'AI Revolution', content: 'The impact of AI on society...', authorId: 101, publishedAt: '2025-03-18 10:00 AM' },
        { id: 2, title: 'Space Exploration', content: 'Mars mission updates...', authorId: 102, publishedAt: '2025-03-17 09:30 AM' },
        { id: 3, title: 'Green Energy', content: 'Renewable energy advancements...', authorId: 103, publishedAt: '2025-03-16 02:15 PM' },
        { id: 4, title: 'Quantum Computing', content: 'The future of computing...', authorId: 104, publishedAt: '2025-03-15 11:45 AM' },
    ];

    const [magazines, setMagazines] = useState(initialMagazines);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [magazineToDelete, setMagazineToDelete] = useState(null);

    const itemsPerPage = 3;

    const handleSearch = (e) => setSearch(e.target.value);

    const filteredMagazines = magazines.filter((magazine) =>
        magazine.title.toLowerCase().includes(search.toLowerCase()) ||
        magazine.content.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMagazines = filteredMagazines.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredMagazines.length / itemsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handleDelete = (id) => {
        setMagazineToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setMagazines(magazines.filter((magazine) => magazine.id !== magazineToDelete));
        setShowDeleteModal(false);
        setMagazineToDelete(null);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setMagazineToDelete(null);
    };

    return (
        <AdminLayout>
            <div className="magazine-container p-3">
                <div className="dms-pages-header sticky-header">
                    <h3>Online Magazine List</h3>
                    <div className="d-flex">
                        <DropdownButton variant="primary" title={<><FaFileExport /> Export</>} className="me-2">
                            <Dropdown.Item> <FaFileExcel className="icon-green" /> Export to Excel</Dropdown.Item>
                            <Dropdown.Item> <FaFilePdf className="icon-red" /> Export to PDF</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton variant="primary" title={<><FaFileExport /> Import</>} className="me-2">
                            <Dropdown.Item> <FaFileExcel className="icon-green" /> Import from Excel</Dropdown.Item>
                            <Dropdown.Item> <FaFilePdf className="icon-red" /> Import from PDF</Dropdown.Item>
                        </DropdownButton>
                        <Button variant="primary" onClick={() => navigate('/online-magazine/add')}>
                            <FaPlus /> Add Magazine
                        </Button>
                    </div>
                </div>

                <div className="d-flex justify-content-between mb-3">
                    <InputGroup className="dms-custom-width">
                        <Form.Control placeholder="Search magazines..." value={search} onChange={handleSearch} />
                    </InputGroup>
                </div>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Author ID</th>
                            <th>Published Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentMagazines.length > 0 ? (
                            currentMagazines.map((magazine, index) => (
                                <tr key={magazine.id}>
                                    <td>{index + 1}</td>
                                    <td>{magazine.title}</td>
                                    <td>{magazine.content.substring(0, 50)}...</td>
                                    <td>{magazine.authorId}</td>
                                    <td>{magazine.publishedAt}</td>
                                    <td>
                                        <FaEye title="View" className="icon-blue me-2" onClick={() => alert(`Viewing: ${magazine.title}`)} />
                                        <FaEdit title="Edit" className="icon-green me-2" onClick={() => navigate("/online-magazine/edit", { state: { magazine } })} />
                                        <FaTrash title="Delete" className="icon-red" onClick={() => handleDelete(magazine.id)} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No magazines found.</td>
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
                    <Modal.Body>Are you sure you want to delete this magazine?</Modal.Body>
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
