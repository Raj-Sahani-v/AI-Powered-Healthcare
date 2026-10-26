

export const MedicalHistoryTab = ({ medicalData }) => {
  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
      <h5 className="fw-bold mb-1">Clinical Information & Records</h5>
      <p className="text-muted small mb-3">Health history shared with doctors during consultation</p>

      <hr className="mb-4 opacity-25" />

      <div className="row g-4">
        {/* Allergies & Chronic Conditions */}
        <div className="col-12 col-md-6">
          <div className="p-3 rounded-3 bg-light border">
            <h6 className="fw-bold mb-2 text-dark">
              <i className="bi bi-shield-slash text-danger me-2"></i>Allergies
            </h6>
            <div className="d-flex flex-wrap gap-2">
              <span className="badge bg-danger-subtle text-danger px-3 py-2 rounded-pill">Penicillin</span>
              <span className="badge bg-danger-subtle text-danger px-3 py-2 rounded-pill">Peanuts</span>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="p-3 rounded-3 bg-light border">
            <h6 className="fw-bold mb-2 text-dark">
              <i className="bi bi-activity text-primary me-2"></i>Chronic Conditions
            </h6>
            <div className="d-flex flex-wrap gap-2">
              <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill">Hypertension (Stage 1)</span>
              <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill">Asthma</span>
            </div>
          </div>
        </div>

        {/* Uploaded Lab Reports */}
        <div className="col-12">
          <h6 className="fw-bold mb-3">Diagnostic Documents & Prescriptions</h6>
          <div className="list-group list-group-flush border rounded-3">
            <div className="list-group-item d-flex justify-content-between align-items-center p-3">
              <div className="d-flex align-items-center">
                <i className="bi bi-file-earmark-pdf fs-3 text-danger me-3"></i>
                <div>
                  <h6 className="mb-0 fw-semibold">Complete Blood Count (CBC) Report</h6>
                  <small className="text-muted">Uploaded on Oct 12, 2026 • Dr. Lal PathLabs</small>
                </div>
              </div>
              <button className="btn btn-sm btn-outline-primary rounded-pill px-3">
                <i className="bi bi-download me-1"></i> View
              </button>
            </div>

            <div className="list-group-item d-flex justify-content-between align-items-center p-3">
              <div className="d-flex align-items-center">
                <i className="bi bi-file-earmark-medical fs-3 text-primary me-3"></i>
                <div>
                  <h6 className="mb-0 fw-semibold">Chest X-Ray Digital Scan</h6>
                  <small className="text-muted">Uploaded on Aug 24, 2026 • Max Healthcare</small>
                </div>
              </div>
              <button className="btn btn-sm btn-outline-primary rounded-pill px-3">
                <i className="bi bi-download me-1"></i> View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};