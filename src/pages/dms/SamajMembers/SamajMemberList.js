import React, { useState } from "react";
import {
    Button,
    Table,
    InputGroup,
    Form,
    Pagination,
    Dropdown,
    DropdownButton,
    Modal,
} from "react-bootstrap";
import {
    FaEdit,
    FaTrash,
    FaEye,
    FaFileExport,
    FaPlus,
    FaFileExcel,
    FaFilePdf,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "../../../layouts/dms/AdminLayout/AdminLayout";

export const SamajMemberList = () => {
    const navigate = useNavigate();

    // Sample Data
    const initialMembers = [
        {
            id: 1,
            name: "Rahul Sharma",
            age: 30,
            gender: "Male",
            profession: "Engineer",
            income: 600000,
            caste: "Brahmin",
            marital_status: "Married",
            is_bridegroom: false,
            address: "123, ABC Nagar, Delhi",
            state_id: 101,
            district_id: 201,
            tehsil_id: 301,
            phone: "9876543210",
            photo: "https://via.placeholder.com/50",
            created_at: "2025-03-18 10:00 AM",
        },
        {
            id: 2,
            name: "Priya Singh",
            age: 25,
            gender: "Female",
            profession: "Doctor",
            income: 800000,
            caste: "Rajput",
            marital_status: "Single",
            is_bridegroom: false,
            address: "456, XYZ Colony, Jaipur",
            state_id: 102,
            district_id: 202,
            tehsil_id: 302,
            phone: "9123456780",
            photo: "https://via.placeholder.com/50",
            created_at: "2025-03-17 09:30 AM",
        },
    ];

    const [members, setMembers] = useState(initialMembers);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState(null);

    const itemsPerPage = 5;

    const handleSearch = (e) => setSearch(e.target.value);

    const filteredMembers = members.filter((member) =>
        member.name.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMembers = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handleDelete = (id) => {
        setMemberToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setMembers(members.filter((member) => member.id !== memberToDelete));
        setShowDeleteModal(false);
        setMemberToDelete(null);
    };

    return (
        <AdminLayout>
            <div className="member-container p-3">
                <div className="dms-pages-header sticky-header">
                    <h3>Samaj Member List</h3>
                    <div className="d-flex">
                        <DropdownButton variant="primary" title={<><FaFileExport /> Export</>} className="me-2">
                            <Dropdown.Item> <FaFileExcel className="icon-green" /> Export to Excel</Dropdown.Item>
                            <Dropdown.Item> <FaFilePdf className="icon-red" /> Export to PDF</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton variant="primary" title={<><FaFileExport /> Import</>} className="me-2">
                            <Dropdown.Item> <FaFileExcel className="icon-green" /> Import from Excel</Dropdown.Item>
                            <Dropdown.Item> <FaFilePdf className="icon-red" /> Import from PDF</Dropdown.Item>
                        </DropdownButton>
                        <Button variant="primary" onClick={() => navigate('/samaj-member/add')}>
                            <FaPlus /> Add Member
                        </Button>
                    </div>
                </div>

                <div className="d-flex justify-content-between mb-3">
                    <InputGroup className="dms-custom-width">
                        <Form.Control placeholder="Search members..." value={search} onChange={handleSearch} />
                    </InputGroup>
                </div>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Profession</th>
                            <th>Income</th>
                            <th>Caste</th>
                            <th>Marital Status</th>
                            <th>Bride/Groom</th>
                            <th>Address</th>
                            <th>State ID</th>
                            <th>District ID</th>
                            <th>Tehsil ID</th>
                            <th>Phone</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentMembers.length > 0 ? (
                            currentMembers.map((member, index) => (
                                <tr key={member.id}>
                                    <td><img src={member.photo} alt="Profile" width="50" height="50" /></td>
                                    <td>{member.name}</td>
                                    <td>{member.age}</td>
                                    <td>{member.gender}</td>
                                    <td>{member.profession}</td>
                                    <td>{member.income}</td>
                                    <td>{member.caste}</td>
                                    <td>{member.marital_status}</td>
                                    <td>{member.is_bridegroom ? "Yes" : "No"}</td>
                                    <td>{member.address}</td>
                                    <td>{member.state_id}</td>
                                    <td>{member.district_id}</td>
                                    <td>{member.tehsil_id}</td>
                                    <td>{member.phone}</td>
                                    <td>{member.created_at}</td>
                                    <td>
                                        <FaEye title="View" className="icon-blue me-2" onClick={() => alert(`Viewing: ${member.name}`)} />
                                        <FaEdit title="Edit" className="icon-green me-2" onClick={() => navigate("/samaj-member/edit", { state: { member } })} />
                                        <FaTrash title="Delete" className="icon-red" onClick={() => handleDelete(member.id)} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="17" className="text-center">No members found.</td>
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
                    <Modal.Body>Are you sure you want to delete this member?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                        <Button variant="primary" onClick={confirmDelete}>Confirm</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </AdminLayout>
    );
};
