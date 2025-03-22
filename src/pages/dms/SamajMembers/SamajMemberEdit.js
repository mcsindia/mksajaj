import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { AdminLayout } from "../../../layouts/dms/AdminLayout/AdminLayout";

export const SamajMemberEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract samaj member data passed from the Samaj Member List page
  const { member } = location.state || {};

  // Initialize state with the current samaj member data
  const [formData, setFormData] = useState({
    name: member?.name || "",
    age: member?.age || "",
    gender: member?.gender || "",
    profession: member?.profession || "",
    income: member?.income || "",
    caste: member?.caste || "",
    marital_status: member?.marital_status || "",
    is_bridegroom: member?.is_bridegroom || false,
    address: member?.address || "",
    state_id: member?.state_id || "",
    district_id: member?.district_id || "",
    tehsil_id: member?.tehsil_id || "",
    phone: member?.phone || "",
    photo: member?.photo || "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle Form Submission (Update Samaj Member)
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updated member:", formData);

    // Navigate back to the Samaj Member List page after updating
    navigate("/samaj-member");
  };

  return (
    <AdminLayout>
      <div className="dms-container">
        <h4>Edit Samaj Member</h4>
        <div className="dms-form-container">
          <Form onSubmit={handleSubmit}>
            {/* Name */}
            <Form.Group className="dms-form-group">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Age */}
            <Form.Group className="dms-form-group">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                placeholder="Enter age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Gender */}
            <Form.Group className="dms-form-group">
              <Form.Label>Gender</Form.Label>
              <Form.Select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            {/* Profession */}
            <Form.Group className="dms-form-group">
              <Form.Label>Profession</Form.Label>
              <Form.Control
                type="text"
                name="profession"
                placeholder="Enter profession"
                value={formData.profession}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Income */}
            <Form.Group className="dms-form-group">
              <Form.Label>Income</Form.Label>
              <Form.Control
                type="number"
                name="income"
                placeholder="Enter annual income"
                value={formData.income}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Caste */}
            <Form.Group className="dms-form-group">
              <Form.Label>Caste</Form.Label>
              <Form.Control
                type="text"
                name="caste"
                placeholder="Enter caste"
                value={formData.caste}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Marital Status */}
            <Form.Group className="dms-form-group">
              <Form.Label>Marital Status</Form.Label>
              <Form.Select name="marital_status" value={formData.marital_status} onChange={handleChange} required>
                <option value="">Select Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </Form.Select>
            </Form.Group>

            {/* Bride/Groom */}
            <Form.Group className="dms-form-group">
              <Form.Check
                type="checkbox"
                label="Is Bride/Groom?"
                name="is_bridegroom"
                checked={formData.is_bridegroom}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Address */}
            <Form.Group className="dms-form-group">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* State ID */}
            <Form.Group className="dms-form-group">
              <Form.Label>State ID</Form.Label>
              <Form.Control
                type="text"
                name="state_id"
                placeholder="Enter State ID"
                value={formData.state_id}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* District ID */}
            <Form.Group className="dms-form-group">
              <Form.Label>District ID</Form.Label>
              <Form.Control
                type="text"
                name="district_id"
                placeholder="Enter District ID"
                value={formData.district_id}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Tehsil ID */}
            <Form.Group className="dms-form-group">
              <Form.Label>Tehsil ID</Form.Label>
              <Form.Control
                type="text"
                name="tehsil_id"
                placeholder="Enter Tehsil ID"
                value={formData.tehsil_id}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Phone */}
            <Form.Group className="dms-form-group">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Photo */}
            <Form.Group className="dms-form-group">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control
                type="text"
                name="photo"
                placeholder="Enter photo URL"
                value={formData.photo}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Buttons */}
            <div className="d-flex">
              <Button type="submit" className="me-2">
                Save Changes
              </Button>
              <Button type="cancel" onClick={() => navigate("/samaj-member")}>
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </AdminLayout>
  );
};
