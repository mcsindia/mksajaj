import React, { useState } from 'react';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';
import { Tabs, Tab, Form, Button, Row, Col, Table } from 'react-bootstrap';
import profile_img from '../../../assets/images/profile.png';

export const EmployeeAdd = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const [selectedPermissions, setSelectedPermissions] = useState({});

  const permissions = [
    {
      feature: "Dashboard",
      subFeatures: [
        { name: "Dasboard", capabilities: ["View"] }
      ]
    },
    {
      feature: "User",
      subFeatures: [
        { name: "User List", capabilities: ["View", "Add", "Edit", "Delete"] }
      ]
    },
    {
      feature: "Riders",
      subFeatures: [
        { name: "View Riders", capabilities: ["View", "Add", "Edit", "Delete"] },
        { name: "Rider Feedback", capabilities: ["View", "Add", "Edit", "Delete"] },
        { name: "Ride History", capabilities: ["View", "Add", "Edit", "Delete"] }
      ]
    },
    {
      feature: "Drivers",
      subFeatures: [
        { name: "View Drivers", capabilities: ["View", "Add", "Edit", "Delete"] },
        { name: "DriverFeedback", capabilities: ["View", "Add", "Edit", "Delete"] },
        { name: "Driver Ride History", capabilities: ["View", "Add", "Edit", "Delete"] }
      ]
    },
  ];

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

  return (
    <AdminLayout>
  <div className='dms-container'>
    <Row className="justify-content-center">
      <Col lg={8} md={10} sm={12}>
        <div className="dms-form-container p-3">
          <Tabs defaultActiveKey="profile" id="employee-tabs" className="mb-3">
            <Tab eventKey="profile" title="Profile">
              <Form>
                <Form.Group className="dms-form-group" controlId="formProfilePhoto">
                  <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                    <img
                      src={formData.profilePhoto || profile_img}
                      alt="Profile"
                      className='profile-img'
                    />
                    <Form.Control
                      type="file"
                      accept="image/*"
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
                <Row>
                  <Col md={6}><Form.Group className="dms-form-group" controlId="formFirstName"><Form.Label>First Name</Form.Label><Form.Control type="text" placeholder="Enter your first name" required /></Form.Group></Col>
                  <Col md={6}><Form.Group className="dms-form-group" controlId="lastName"><Form.Label>Last Name</Form.Label><Form.Control type="text" placeholder="Enter your last name" required /></Form.Group></Col>
                </Row>
                <Row>
                  <Col md={6}><Form.Group className="dms-form-group" controlId="formEmail"><Form.Label>Email</Form.Label><Form.Control type="email" placeholder="Enter email" required /></Form.Group></Col>
                  <Col md={6}><Form.Group className="dms-form-group" controlId="formPhone"><Form.Label>Phone</Form.Label><Form.Control type="text" placeholder="Enter phone number" required /></Form.Group></Col>
                </Row>
                <Row>
                  <Col md={6}><Form.Group className="dms-form-group" controlId="formGender"><Form.Label>Gender</Form.Label><Form.Select name="gender" onChange={handleChange} required><option value="male">Male</option><option value="female">Female</option></Form.Select></Form.Group></Col>
                  <Col md={6}><Form.Group className="dms-form-group" controlId="formDob"><Form.Label>Date of Birth</Form.Label><Form.Control type="date" /></Form.Group></Col>
                </Row>
                <Row>
                  <Col md={6}><Form.Group className="dms-form-group" controlId="formStartDate"><Form.Label>Contract Start Date</Form.Label><Form.Control type="date" required /></Form.Group></Col>
                  <Col md={6}><Form.Group className="dms-form-group" controlId="formEndDate"><Form.Label>Contract End Date</Form.Label><Form.Control type="date" required /></Form.Group></Col>
                </Row>
                <Form.Group className="dms-form-group" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" required />
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
              <h5 className="mt-3">Select Permissions</h5>
              <Table bordered responsive>
                <thead><tr><th>Feature</th><th>Scope</th><th>Capabilities</th></tr></thead>
                <tbody>
                  {permissions.map(({ feature, subFeatures }) => (
                    <React.Fragment key={feature}>
                      <tr><td colSpan="4" className="bg-light fw-bold">{feature}</td></tr>
                      {subFeatures.map(({ name, capabilities }) => (
                        <React.Fragment key={name}>
                          <tr>
                            <td rowSpan="2">{name}</td>
                            <td>Self</td>
                            <td>
                              {capabilities.map((capability) => (
                                <Form.Check inline key={`self-${capability}`} type="checkbox" label={capability} onChange={() => handlePermissionChange(feature, name, "Self", capability)} checked={selectedPermissions[feature]?.[name]?.["Self"]?.[capability] || false} />
                              ))}
                            </td>
                          </tr>
                          <tr>
                            <td>Global</td>
                            <td>
                              {capabilities.map((capability) => (
                                <Form.Check inline key={`global-${capability}`} type="checkbox" label={capability} onChange={() => handlePermissionChange(feature, name, "Global", capability)} checked={selectedPermissions[feature]?.[name]?.["Global"]?.[capability] || false} />
                              ))}
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </div>
      </Col>
    </Row>
    <div className='text-center mt-3'>
      <Button type="submit">Submit</Button>
    </div>
  </div>
</AdminLayout>

  );
};
