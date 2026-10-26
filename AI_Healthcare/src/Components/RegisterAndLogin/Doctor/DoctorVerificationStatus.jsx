import  { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const DoctorVerificationStatus = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStatus = async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("doctorAccessToken") ||
        sessionStorage.getItem("doctorAccessToken");

        console.log(token)
      const res = await axios.get("http://localhost:5000/api/v1/doctor/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log(res)

      setDoctor(res.data?.doctor || res.data?.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Session expired or unable to load verification details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill fw-semibold"><i className="bi bi-check-circle-fill me-1"></i> Approved</span>;
      case "rejected":
        return <span className="badge bg-danger-subtle text-danger px-3 py-2 rounded-pill fw-semibold"><i className="bi bi-x-circle-fill me-1"></i> Rejected</span>;
      default:
        return <span className="badge bg-warning-subtle text-warning px-3 py-2 rounded-pill fw-semibold"><i className="bi bi-hourglass-split me-1"></i> Under Review</span>;
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Checking verification status...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 text-center">
            <div className="alert alert-danger shadow-sm rounded-4 p-4">
              <i className="bi bi-exclamation-triangle-fill fs-1 text-danger mb-3 d-block"></i>
              <h5 className="fw-bold">Unable to Fetch Status</h5>
              <p className="text-muted small mb-4">{error}</p>
              <Link to="/doctor/login" className="btn btn-primary rounded-pill px-4">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isFullyApproved = doctor?.status === "approved" && doctor?.isActive;

  return (
    <div className="container py-1 min-vh-100 d-flex flex-column justify-content-center">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0 rounded-4 p-1 p-md-5 bg-white">
            
            {/* Top Status Alert */}
            <div className="text-center mb-4">
              <div
                className={`rounded-circle d-inline-flex p-3 mb-3 ${
                  isFullyApproved
                    ? "bg-success-subtle text-success"
                    : doctor?.status === "rejected"
                    ? "bg-danger-subtle text-danger"
                    : "bg-warning-subtle text-warning"
                }`}
              >
                <i
                  className={`fs-1 bi ${
                    isFullyApproved
                      ? "bi-patch-check-fill"
                      : doctor?.status === "rejected"
                      ? "bi-shield-x"
                      : "bi-shield-exclamation"
                  }`}
                ></i>
              </div>

              <h3 className="fw-bold text-dark mb-1">
                {isFullyApproved
                  ? "Account Successfully Verified!"
                  : doctor?.status === "rejected"
                  ? "Application Requires Revision"
                  : "Profile Under Admin Review"}
              </h3>

              <p className="text-muted small">
                Application Reference: <strong>MRN - {doctor?.mrn || "N/A"}</strong>
              </p>
            </div>

            {/* Overall Status Banner */}
            <div
              className={`alert border-0 rounded-4 p-3 mb-4 d-flex align-items-center justify-content-between ${
                isFullyApproved
                  ? "alert-success"
                  : doctor?.status === "rejected"
                  ? "alert-danger"
                  : "alert-warning"
              }`}
            >
              <div>
                <span className="fw-bold d-block">Overall Account Status</span>
                <small className="opacity-75">
                  {isFullyApproved
                    ? "Your clinical profile is live and visible to patients."
                    : doctor?.status === "rejected"
                    ? `Reason: ${doctor?.rejectionReason || "Uploaded documents did not meet criteria."}`
                    : "Admin team is verifying your submitted licenses and identification."}
                </small>
              </div>
              <div>{getStatusBadge(doctor?.status)}</div>
            </div>

            {/* Document Checklist */}
            <h6 className="fw-bold text-secondary text-uppercase mb-3 border-bottom pb-2">
              Verification Breakdown (3 Documents)
            </h6>

            <div className="row g-3 mb-4">
              {/* 1. Identity Proof */}
              <div className="col-12">
                <div className="border rounded-3 p-3 bg-light d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-person-badge fs-3 text-secondary me-3"></i>
                    <div>
                      <h6 className="mb-0 fw-semibold">1. Government Identity Proof</h6>
                      <small className="text-muted">Passport, Voter ID, or national identification card</small>
                    </div>
                  </div>
                  <div>{getStatusBadge(doctor?.proofVerified)}</div>
                </div>
              </div>

              {/* 2. Medical Certificate */}
              <div className="col-12">
                <div className="border rounded-3 p-3 bg-light d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-file-earmark-medical fs-3 text-secondary me-3"></i>
                    <div>
                      <h6 className="mb-0 fw-semibold">2. State Medical Council Registration</h6>
                      <small className="text-muted">Official practicing license / degree certificate</small>
                    </div>
                  </div>
                  <div>{getStatusBadge(doctor?.certificateVerified)}</div>
                </div>
              </div>

              {/* 3. Profile Photograph */}
              <div className="col-12">
                <div className="border rounded-3 p-3 bg-light d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-camera fs-3 text-secondary me-3"></i>
                    <div>
                      <h6 className="mb-0 fw-semibold">3. Clinic Face Photograph</h6>
                      <small className="text-muted">Clear front-facing passport style portrait</small>
                    </div>
                  </div>
                  <div>{getStatusBadge(doctor?.profileVerified)}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              <button
                className="btn btn-outline-secondary rounded-pill px-4"
                onClick={fetchStatus}
              >
                <i className="bi bi-arrow-clockwise me-1"></i> Refresh Status
              </button>

              {isFullyApproved ? (
                <button
                  className="btn btn-primary rounded-pill px-4"
                  onClick={() => navigate("/doctor/dashboard")}
                >
                  Proceed to Doctor Dashboard <i className="bi bi-arrow-right ms-1"></i>
                </button>
              ) : (
                <Link to="/doctor/register" className="btn btn-outline-primary rounded-pill px-4">
                  Need Help / Re-upload
                </Link>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};