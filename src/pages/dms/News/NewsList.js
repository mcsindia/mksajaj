import React, { useState } from 'react';
import { Table, Button, InputGroup, Form, Pagination, DropdownButton, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';
import { FaEdit, FaTrash, FaPlus, FaFileExport, FaFileExcel, FaFilePdf, FaEye } from 'react-icons/fa';

export const NewsList = () => {
  const navigate = useNavigate();

  // Initial News Data (with added state_id, district_id, tehsil_id)
  const initialNews = [
    { id: 1, title: 'Launch Event', content: 'Content...', author_id: 1, publish_date: '2025-01-01', status: 'Active', image: 'https://placehold.co/100', state_id: 101, district_id: 201, tehsil_id: 301 },
    { id: 2, title: 'New Feature Release', content: 'Content...', author_id: 2, publish_date: '2025-01-05', status: 'Inactive', image: 'https://placehold.co/100', state_id: 102, district_id: 202, tehsil_id: 302 },
    { id: 3, title: 'Product Update', content: 'Content...', author_id: 3, publish_date: '2025-01-10', status: 'Active', image: 'https://placehold.co/100', state_id: 103, district_id: 203, tehsil_id: 303 },
  ];

  const [news, setNews] = useState(initialNews);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Search Functionality
  const handleSearch = (e) => setSearch(e.target.value);

  // Filtered News
  const filteredNews = news.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus ? item.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Edit Action
  const handleEdit = (newsItem) => {
    navigate('/news/edit', { state: { news: newsItem } });
  };

  // Delete Action
  const handleDelete = (id) => {
    const updatedNews = news.filter((item) => item.id !== id);
    setNews(updatedNews);
  };

  return (
    <AdminLayout>
      <div className="news-list-container p-3">
        {/* Header Options */}
        <div className="dms-pages-header sticky-header d-flex justify-content-between">
          <h3>News List</h3>
          <div className="d-flex">
            <DropdownButton variant="primary" title={<><FaFileExport /> Export</>} className="me-2">
              <Dropdown.Item> <FaFileExcel className="icon-green" /> Export to Excel</Dropdown.Item>
              <Dropdown.Item> <FaFilePdf className="icon-red" /> Export to PDF</Dropdown.Item>
            </DropdownButton>
            <DropdownButton variant="primary" title={<><FaFileExport /> Import</>} className="me-2">
              <Dropdown.Item> <FaFileExcel className="icon-green" /> Import from Excel</Dropdown.Item>
              <Dropdown.Item> <FaFilePdf className="icon-red" /> Import from PDF</Dropdown.Item>
            </DropdownButton>
            <Button variant="primary" onClick={() => navigate('/news/add')}>
              <FaPlus /> Add News
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="d-flex justify-content-between mb-3">
          <DropdownButton
            variant="primary"
            title={`Filter: ${filterStatus || 'All'}`}
            id="filter-dropdown"
            className="dms-custom-width"
          >
            <Dropdown.Item onClick={() => setFilterStatus('')}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterStatus('Active')}>Active</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterStatus('Inactive')}>Inactive</Dropdown.Item>
            <Dropdown.Item className="text-custom-danger" onClick={() => setFilterStatus('')}>
              Clear Filter
            </Dropdown.Item>
          </DropdownButton>
          <InputGroup className="dms-custom-width me-2">
            <Form.Control
              id="search-news"
              placeholder="Search news..."
              value={search}
              onChange={handleSearch}
            />
          </InputGroup>
        </div>

        {/* Table */}
        <div className="dms-table-container">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Title</th>
                <th>Content</th>
                <th>Author ID</th>
                <th>Publish Date</th>
                <th>Status</th>
                <th>State ID</th>
                <th>District ID</th>
                <th>Tehsil ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentNews.length > 0 ? (
                currentNews.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td><img src={item.image} alt="News" style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                    <td>{item.title}</td>
                    <td>{item.content}</td>
                    <td>{item.author_id}</td>
                    <td>{item.publish_date}</td>
                    <td>{item.status}</td>
                    <td>{item.state_id}</td>
                    <td>{item.district_id}</td>
                    <td>{item.tehsil_id}</td>
                    <td>
                      <FaEye
                        title='View'
                        className='icon-blue me-2'
                      />
                      <FaEdit
                        title="Edit"
                        className="icon-green me-2"
                        onClick={() => handleEdit(item)}
                      />
                      <FaTrash
                        title="Delete"
                        className="icon-red"
                        onClick={() => handleDelete(item.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center">No news found.</td>
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
      </div>
    </AdminLayout>
  );
};
