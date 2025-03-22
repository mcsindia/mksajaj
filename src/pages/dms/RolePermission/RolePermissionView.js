import React, { useState } from 'react';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';
import { Table, Form, Card } from 'react-bootstrap';

export const RolePermissionView = () => {
  const [selectedPermissions] = useState({
    Dashboard: { "Dasboard": { "View": true } },
    User: { "User List": { "View": true, "Add": false, "Edit": false, "Delete": false } },
    Riders: { "View Riders": { "View": true, "Add": true, "Edit": false, "Delete": false } },
    Drivers: { "View Drivers": { "View": true, "Add": true, "Edit": false, "Delete": false } },
  });

  const permissions = [
    { feature: "Dashboard", subFeatures: [{ name: "Dasboard", capabilities: ["View"] }] },
    { feature: "User", subFeatures: [{ name: "User List", capabilities: ["View", "Add", "Edit", "Delete"] }] },
    { feature: "Riders", subFeatures: [
        { name: "View Riders", capabilities: ["View", "Add", "Edit", "Delete"] },
        { name: "Rider Feedback", capabilities: ["View", "Add", "Edit", "Delete"] }
    ] },
    {
        feature: "Drivers",
        subFeatures: [
          { name: "View Drivers", capabilities: ["View", "Add", "Edit", "Delete"] },
          { name: "Driver Feedback", capabilities: ["View", "Add", "Edit", "Delete"] },
          { name: "Driver Ride History", capabilities: ["View", "Add", "Edit", "Delete"] }
        ]
    },
  ];

  return (
    <AdminLayout>
      <div className="dms-container">
        <h4>Role Permission </h4>
        <div className="dms-form-container">
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Employee Information</Card.Title>
              <Card.Text><strong>Department:</strong> IT</Card.Text>
              <Card.Text><strong>Designation:</strong> Developer</Card.Text>
              <Card.Text><strong>Role:</strong> Admin</Card.Text>
            </Card.Body>
          </Card>
          <h5 className="mt-3">Permissions</h5>
          <Table bordered>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Capabilities</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map(({ feature, subFeatures }) => (
                <React.Fragment key={feature}>
                  <tr>
                    <td colSpan="2" className="bg-light fw-bold">{feature}</td>
                  </tr>
                  {subFeatures.map(({ name, capabilities }) => (
                    <tr key={name}>
                      <td>{name}</td>
                      <td>
                        {capabilities.map((capability) => (
                          <Form.Check
                            inline
                            key={capability}
                            type="checkbox"
                            label={capability}
                            checked={selectedPermissions[feature]?.[name]?.[capability] || false}
                            readOnly
                          />
                        ))}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};
