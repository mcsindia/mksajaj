import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';

export const EmployeeRoleView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = location.state || {};

  if (!role) {
    return (
      <AdminLayout>
        <div className="p-3 text-center">
          <h4>No role details available.</h4>
          <Button variant="primary" onClick={() => navigate('/employee-roles')}>Back to List</Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="dms-container">
        <div className='d-flex justify-content-between'>
        <h4>Employee Role Details</h4>
        <Button variant="secondary" className="mb-3" onClick={() => navigate('/employee-roles')}>
          <FaArrowLeft /> Back
        </Button>
        </div>
    
        <Card>
          <Card.Body>
            <div className="mb-3"><strong>Role:</strong> {role.role}</div>
            <div className="mb-3"><strong>Department:</strong> {role.department}</div>
            <div className="mb-3"><strong>Designation:</strong> {role.designation}</div>
            <div className="mb-3"><strong>Responsibility:</strong> {role.responsibility}</div>
          </Card.Body>
        </Card>
      </div>
    </AdminLayout>
  );
};
