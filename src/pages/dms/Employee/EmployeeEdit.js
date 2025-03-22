import React, { useState } from 'react';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';
import { Form, Button, Row, Col, Container, Tabs, Tab, Table } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import profile_img from '../../../assets/images/profile.png';

export const EmployeeEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const employee = location.state?.employee || {};
  const [formData, setFormData] = useState(employee);
  const [selectedPermissions, setSelectedPermissions] = useState({});

  const permissions = [
    { feature: "Dashboard", subFeatures: [{ name: "Dashboard", capabilities: ["View"] }] },
    { feature: "User", subFeatures: [{ name: "User List", capabilities: ["View", "Add", "Edit", "Delete"] }] },
    {
      feature: "Riders", subFeatures: [
        { name: "View Riders", capabilities: ["View", "Add", "Edit", "Delete"] },
        { name: "Rider Feedback", capabilities: ["View", "Add", "Edit", "Delete"] },
        { name: "Ride History", capabilities: ["View", "Add", "Edit", "Delete"] }
      ]
    },
    {
      feature: "Drivers", subFeatures: [
        { name: "View Drivers", capabilities: ["View", "Add", "Edit", "Delete"] },
        { name: "Driver Feedback", capabilities: ["View", "Add", "Edit", "Delete"] },
        { name: "Driver Ride History", capabilities: ["View", "Add", "Edit", "Delete"] }
      ]
    }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePermissionChange = (feature, subFeature, capability) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [feature]: {
        ...prev[feature],
        [subFeature]: {
          ...prev[feature]?.[subFeature],
          [capability]: !prev[feature]?.[subFeature]?.[capability],
        },
      },
    }));
  };

  const handleSelectAll = () => {
    let updatedPermissions = {};
    permissions.forEach(({ feature, subFeatures }) => {
      updatedPermissions[feature] = {};
      subFeatures.forEach(({ name, capabilities }) => {
        updatedPermissions[feature][name] = Object.fromEntries(
          capabilities.map(cap => [cap, true])
        );
      });
    });
    setSelectedPermissions(updatedPermissions);
  };

  const handleClearAll = () => {
    setSelectedPermissions({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Employee details updated!");
    navigate("/employee");
  };

  return (
    <AdminLayout>
      <Container className="dms-container">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <h4 className="text-left">Edit Employee Profile</h4>
            <div className="dms-form-container p-3">
              <Tabs defaultActiveKey="profile" id="employee-edit-tabs" className="mb-3">
                <Tab eventKey="profile" title="Profile">
                  {/* Profile Form */}
                  <Form>
                    <Form.Group className="dms-form-group text-center" controlId="formProfilePhoto">
                      <div className="d-flex flex-column align-items-center gap-3">
                        {/* Default or Uploaded Image */}
                        <img
                          src={formData.profilePhoto || profile_img}
                          alt="Profile"
                          className="profile-img img-fluid rounded-circle"
                          style={{ maxWidth: "120px", height: "auto" }}
                        />
                        {/* File Input */}
                        <Form.Control
                          type="file"
                          accept="image/*"
                          className="w-100"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                setFormData({ ...formData, profilePhoto: reader.result });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </div>
                    </Form.Group>

                    {/* Name Field */}
                    <Form.Group className="dms-form-group" controlId="formFirstName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={formData.name || ""}
                        onChange={handleChange}
                        required
                        className="form-control-lg"
                      />
                    </Form.Group>

                    {/* Phone Field */}
                    <Form.Group className="dms-form-group" controlId="formPhone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter phone number"
                        name="mobile"
                        value={formData.mobile || ""}
                        onChange={handleChange}
                        required
                        className="form-control-lg"
                      />
                    </Form.Group>

                    {/* Gender Field */}
                    <Form.Group className="dms-form-group" controlId="formGender">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select name="gender" onChange={handleChange} required>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Form.Select>
                    </Form.Group>

                    {/* Date of Birth */}
                    <Form.Group className="dms-form-group" controlId="formDob">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control type="date" className="form-control-lg" />
                    </Form.Group>

                    {/* Department */}
                    <Form.Group className="dms-form-group" controlId="formDepartment">
                      <Form.Label>Department</Form.Label>
                      <Form.Select
                        name="department"
                        value={formData.department || ""}
                        onChange={handleChange}
                        required
                      >
                        <option value="select">Select an option</option>
                        <option value="hr">HR</option>
                        <option value="it">IT</option>
                        <option value="finance">Finance</option>
                        <option value="sales">Sales</option>
                      </Form.Select>
                    </Form.Group>

                    {/* Designation */}
                    <Form.Group className="dms-form-group" controlId="formDesignation">
                      <Form.Label>Designation</Form.Label>
                      <Form.Select
                        name="designation"
                        value={formData.designation || ""}
                        onChange={handleChange}
                        required
                      >
                        <option value="select">Select an option</option>
                        <option value="manager">Manager</option>
                        <option value="developer">Developer</option>
                        <option value="hr">HR Executive</option>
                        <option value="designer">Designer</option>
                      </Form.Select>
                    </Form.Group>

                    {/* Contract Dates */}
                    <Row>
                      <Col xs={12} md={6}>
                        <Form.Group className="dms-form-group" controlId="formContractStart">
                          <Form.Label>Contract Start Date</Form.Label>
                          <Form.Control type="date" required />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6}>
                        <Form.Group className="dms-form-group" controlId="formContractEnd">
                          <Form.Label>Contract End Date</Form.Label>
                          <Form.Control type="date" required />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Status Field */}
                    <Form.Group className="dms-form-group" controlId="formStatus">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        name="status"
                        value={formData.status || "Active"}
                        onChange={handleChange}
                        required
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </Form.Select>
                    </Form.Group>
                  </Form>
                </Tab>
                <Tab eventKey="permission" title="Permission">
                  <Row>
                    <Col md={4}><Form.Group className="dms-form-group" controlId="formDepartment"><Form.Label>Department</Form.Label><Form.Select name="department" onChange={handleChange} required><option value="select">Select an option</option><option value="hr">HR</option><option value="it">IT</option><option value="finance">Finance</option><option value="sales">Sales</option></Form.Select></Form.Group></Col>
                    <Col md={4}><Form.Group className="dms-form-group" controlId="formDesignation"><Form.Label>Designation</Form.Label><Form.Select name="designation" onChange={handleChange} required><option value="select">Select an option</option><option value="manager">Manager</option><option value="developer">Developer</option><option value="hr">HR Executive</option><option value="designer">Designer</option></Form.Select></Form.Group></Col>
                    <Col md={4}><Form.Group className="dms-form-group" controlId="formRole"><Form.Label>Role</Form.Label><Form.Select name="role" onChange={handleChange} required><option value="select">Select an option</option><option value="admin">Admin</option><option value="user">User</option><option value="supervisor">Supervisor</option></Form.Select></Form.Group></Col>
                  </Row>
                  <div className="text-center my-3">
                    <Button variant="primary" className="me-2" onClick={handleSelectAll}>Select All</Button>
                    <Button variant="secondary" onClick={handleClearAll}>Clear All</Button>
                  </div>
                  <Table bordered responsive>
                    <thead>
                      <tr><th>Feature</th><th>Scope</th><th>Capabilities</th></tr>
                    </thead>
                    <tbody>
                      {permissions.map(({ feature, subFeatures }) => (
                        <React.Fragment key={feature}>
                          <tr><td colSpan="3" className="bg-light fw-bold">{feature}</td></tr>
                          {subFeatures.map(({ name, capabilities }) => (
                            <tr key={name}>
                              <td>{name}</td>
                              <td>Self</td>
                              <td>
                                {capabilities.map((capability) => (
                                  <Form.Check inline key={capability} type="checkbox" label={capability} onChange={() => handlePermissionChange(feature, name, capability)} checked={selectedPermissions[feature]?.[name]?.[capability] || false} />
                                ))}
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </Table>
                </Tab>
              </Tabs>
            </div>
            <div className="text-center mt-3">
              <Button type='submit' className="me-2" onClick={handleSubmit}>Save Changes</Button>
              <Button type='cancel' onClick={() => navigate("/employee")} >Cancel</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  );
};
