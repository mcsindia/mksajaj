import React, { useState } from 'react';
import { Button, Table, Form, InputGroup, Pagination, Dropdown, DropdownButton } from 'react-bootstrap';
import { FaEdit, FaTrash, FaFileExport, FaPlus, FaFileExcel, FaFilePdf } from 'react-icons/fa';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';
import { data, useNavigate } from 'react-router-dom';

export const DepartmentList = () => {
    const initialData = [
        { id: 1, name: 'HR', description: 'Human Resources Department', date: '2024-01-10', time: '4:15 PM' },
        { id: 2, name: 'IT', description: 'Information Technology Department', date: '2024-02-15', time: '10:00 AM' },
        { id: 3, name: 'Finance', description: 'Finance Department', date: '2024-03-05', time: '3:30 PM' },
        { id: 4, name: 'Sales', description: 'Sales Department', date: '2024-04-20', time: '7:45 AM' },
    ];

    const [departments, setDepartments] = useState(initialData);
    const [search, setSearch] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const navigate = useNavigate();

    const handleEdit = (department) => {
        navigate('/department/edit', { state: { department } });
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleFilter = (filter) => {
        setSelectedFilter(filter);
    };

    const filteredData = departments.filter(
        (department) =>
            (department.name.toLowerCase().includes(search.toLowerCase()) ||
            department.description.toLowerCase().includes(search.toLowerCase())) &&
            (selectedFilter ? department.name.toLowerCase().includes(selectedFilter.toLowerCase()) : true)
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <AdminLayout>
            <div className="dms-pages-header sticky-header">
                <h3>Department List</h3>
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

                    <Button variant="primary" onClick={() => navigate('/department/add')}>
                        <FaPlus /> Add Department
                    </Button>
                </div>
            </div>

            <div className="d-flex justify-content-between mb-3">
                <DropdownButton variant="primary" title="Filter" id="filter-dropdown">
                    <Dropdown.Item onClick={() => handleFilter('')}>All</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilter('HR')}>HR</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilter('IT')}>IT</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilter('Finance')}>Finance</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilter('Sales')}>Sales</Dropdown.Item>
                    <Dropdown.Item className='text-custom-danger' onClick={() => handleFilter("")}>Cancel</Dropdown.Item>
                       </DropdownButton>

                <InputGroup className="dms-custom-width">
                    <Form.Control
                        placeholder="Search department..."
                        value={search}
                        onChange={handleSearch}
                    />
                </InputGroup>
            </div>

            <div className="table-responsive">
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Department ID</th>
                            <th>Department Name</th>
                            <th>Description</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((department) => (
                                <tr key={department.id}>
                                    <td>{department.id}</td>
                                    <td>{department.name}</td>
                                    <td>{department.description}</td>
                                    <td>{`${department.date}`} <br/> {` ${department.time}`}</td>       
                                    <td className="actions">
                                        <FaEdit
                                            className="icon icon-green"
                                            title="Edit"
                                            onClick={() => handleEdit(department)}
                                        />
                                        <FaTrash className="icon icon-red" title="Delete" />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No departments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

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
                <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        </AdminLayout>
    );
};
