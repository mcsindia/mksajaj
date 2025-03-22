import React, { useState } from 'react';
import { Button, Table, Form, InputGroup, Pagination, Dropdown, DropdownButton } from 'react-bootstrap';
import { FaEdit, FaTrash, FaFileExport, FaPlus, FaFileExcel, FaFilePdf } from 'react-icons/fa';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';
import { useNavigate } from 'react-router-dom';

export const DesignationList = () => {
    const initialData = [
        { id: 1, name: 'Manager', departmentId: 101, departmentName: 'HR' },
        { id: 2, name: 'Developer', departmentId: 102, departmentName: 'IT'},
        { id: 3, name: 'Analyst', departmentId: 101, departmentName: 'Finance'},
        { id: 4, name: 'HR Executive', departmentId: 103, departmentName: 'Sales'},
        { id: 5, name: 'Sales Lead', departmentId: 104, departmentName: 'HR'},
        { id: 6, name: 'Designer', departmentId: 102, departmentName: 'Sales'},
    ];

    const [designations, setDesignations] = useState(initialData);
    const [search, setSearch] = useState('');
    const [selectedDesignationFilter, setSelectedDesignationFilter] = useState('');
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const navigate = useNavigate();

    const handleSearch = (e) => setSearch(e.target.value);
    const handleDesignationFilter = (designation) => setSelectedDesignationFilter(designation);

    const filteredData = designations.filter(
        (designation) =>
            (designation.name.toLowerCase().includes(search.toLowerCase()) ||
            designation.departmentId.toString().includes(search)) &&
            (filter ? designation.departmentId.toString() === filter : true) &&
            (selectedDesignationFilter ? designation.name.toLowerCase().includes(selectedDesignationFilter.toLowerCase()) : true)
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handleDelete = (id) => {
        setDesignations(designations.filter((designation) => designation.id !== id));
    };

    const handleEdit = (designation) => {
        navigate('/designation/edit', { state: designation });
    };

    // Handle resetting the filter
    const handleResetFilter = () => {
        setSelectedDesignationFilter('');
        setFilter('');
    };

    return (
        <AdminLayout>
            <div className="dms-pages-header sticky-header">
                <h3>Designation List</h3>
                <div className="d-flex">
                    <DropdownButton variant="primary" title={<><FaFileExport /> Export</>} className="me-2">
                        <Dropdown.Item>
                           <FaFileExcel className='icon-green' /> Export to Excel
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <FaFilePdf className='icon-red' /> Export to PDF
                        </Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton variant="primary" title={<><FaFileExport /> Import</>} className="me-2">
                        <Dropdown.Item>
                        <FaFileExcel className='icon-green' /> Import from Excel
                        </Dropdown.Item>
                        <Dropdown.Item>
                             <FaFilePdf className='icon-red' /> Import from PDF
                        </Dropdown.Item>
                    </DropdownButton>

                    <Button variant="primary" onClick={() => navigate('/designation/add')}>
                        <FaPlus /> Add Designation
                    </Button>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="d-flex justify-content-between mb-3 ">
                <DropdownButton
                    variant="primary"
                    title="Filter"
                    id="designation-filter-dropdown"
                    className="me-2"
                >
                    <Dropdown.Item onClick={() => handleDesignationFilter('')}>All</Dropdown.Item>
                    {[...new Set(designations.map((d) => d.name))].map((designationName) => (
                        <Dropdown.Item key={designationName} onClick={() => handleDesignationFilter(designationName)}>
                            {designationName}
                        </Dropdown.Item>
                    ))}
                    <Dropdown.Item onClick={handleResetFilter} className="text-custom-danger">Cancel</Dropdown.Item>
                </DropdownButton>

                <InputGroup className="dms-custom-width">
                    <Form.Control 
                        placeholder="Search designation..."
                        value={search}
                        onChange={handleSearch}
                    />
                </InputGroup>
            </div>

            {/* Table */}
            <div className="table-responsive">
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Designation ID</th>
                            <th>Designation Name</th>
                            <th>Department Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((designation) => (
                                <tr key={designation.id}>
                                    <td>{designation.id}</td>
                                    <td>{designation.name}</td>
                                    <td>{designation.departmentName}</td>
                                    <td className="actions">
                                        <FaEdit
                                            className="icon icon-green"
                                            title="Edit"
                                            onClick={() => handleEdit(designation)}
                                        />
                                        <FaTrash
                                            className="icon icon-red"
                                            title="Delete"
                                            onClick={() => handleDelete(designation.id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    No designations found.
                                </td>
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
        </AdminLayout>
    );
};
