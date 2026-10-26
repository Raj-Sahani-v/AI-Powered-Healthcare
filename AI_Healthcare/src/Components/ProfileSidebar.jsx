

export const ProfileSidebar = ({ user, activeTab, setActiveTab }) => {
  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 text-center bg-white h-100">
      <div className="position-relative d-inline-block mx-auto mb-3">
        <img
          src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"}
          alt={user?.fullname}
          className="rounded-circle border border-4 border-light shadow-sm"
          style={{ width: "110px", height: "110px", objectFit: "cover" }}
        />
        <span className="position-absolute bottom-0 end-0 bg-success border border-white border-2 rounded-circle p-2"></span>
      </div>

      <h5 className="fw-bold mb-1">{user?.fullname || "Patient Name"}</h5>
      <p className="text-muted small mb-2">{user?.email}</p>
      
      <div className="mb-3">
        <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-1">
          Patient ID: #{user?.id?.slice(-6)?.toUpperCase() || "PT-1042"}
        </span>
      </div>

      <hr className="my-3 opacity-25" />

      {/* Vertical Navigation Tabs */}
      <div className="nav flex-column nav-pills gap-2 text-start">
        <button
          className={`nav-link text-start rounded-3 py-2 px-3 d-flex align-items-center ${
            activeTab === "personal" ? "active" : "text-secondary"
          }`}
          onClick={() => setActiveTab("personal")}
        >
          <i className="bi bi-person-lines-fill me-2 fs-5"></i>
          Personal Information
        </button>

        <button
          className={`nav-link text-start rounded-3 py-2 px-3 d-flex align-items-center ${
            activeTab === "medical" ? "active" : "text-secondary"
          }`}
          onClick={() => setActiveTab("medical")}
        >
          <i className="bi bi-heart-pulse-fill me-2 fs-5"></i>
          Medical History
        </button>

        <button
          className={`nav-link text-start rounded-3 py-2 px-3 d-flex align-items-center ${
            activeTab === "appointments" ? "active" : "text-secondary"
          }`}
          onClick={() => setActiveTab("appointments")}
        >
          <i className="bi bi-calendar-check-fill me-2 fs-5"></i>
          My Appointments
        </button>
      </div>
    </div>
  );
};