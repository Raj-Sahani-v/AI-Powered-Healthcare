import  { useState } from "react";

export const PersonalInfoTab = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: user?.gender || "Male",
    dob: user?.dob || "1998-05-14",
    bloodGroup: user?.bloodGroup || "O+",
    address: user?.address || "Flat 402, Green Avenue, New Delhi",
    emergencyContact: user?.emergencyContact || "+91 98765 00000",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="fw-bold mb-1">Personal Details</h5>
          <p className="text-muted small mb-0">Manage your contact and demographic profile</p>
        </div>
        <button
          className={`btn btn-sm ${isEditing ? "btn-outline-danger" : "btn-primary"} rounded-pill px-3`}
          onClick={() => setIsEditing(!isEditing)}
        >
          <i className={`bi ${isEditing ? "bi-x-circle" : "bi-pencil-square"} me-1`}></i>
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <hr className="mb-4 opacity-25" />

      <form onSubmit={handleSave}>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label className="form-label small fw-semibold text-muted">Full Name</label>
            <input
              type="text"
              name="fullname"
              disabled={!isEditing}
              className="form-control"
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label small fw-semibold text-muted">Email Address</label>
            <input
              type="email"
              name="email"
              disabled
              className="form-control bg-light"
              value={formData.email}
            />
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label small fw-semibold text-muted">Phone Number</label>
            <input
              type="tel"
              name="phone"
              disabled={!isEditing}
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label small fw-semibold text-muted">Gender</label>
            <select
              name="gender"
              disabled={!isEditing}
              className="form-select"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label small fw-semibold text-muted">Blood Group</label>
            <select
              name="bloodGroup"
              disabled={!isEditing}
              className="form-select"
              value={formData.bloodGroup}
              onChange={handleChange}
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label small fw-semibold text-muted">Residential Address</label>
            <input
              type="text"
              name="address"
              disabled={!isEditing}
              className="form-control"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label small fw-semibold text-muted">Emergency Contact</label>
            <input
              type="text"
              name="emergencyContact"
              disabled={!isEditing}
              className="form-control"
              value={formData.emergencyContact}
              onChange={handleChange}
            />
          </div>

          {isEditing && (
            <div className="col-12 mt-4 text-end">
              <button type="submit" className="btn btn-success rounded-pill px-4">
                <i className="bi bi-check2-circle me-1"></i> Save Changes
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};