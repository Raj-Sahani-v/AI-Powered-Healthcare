// import axios from "axios";
// import { useEffect, useState } from "react"
// import { data, useParams } from "react-router-dom";

// const statusColor = {
//   pending: "warning",
//   approved: "success",
//   rejected: "danger",
// };

// export const ProfileDetail = () => {

//     const {id} = useParams();
//     const[doctor, setDoctor ] = useState(null);
//     const [loading, setLoading] = useState(false)

//     useEffect(()=>{
//         (async()=>{
//             try {
//                 const res = await axios(`http://localhost:5000/api/v1/doctor/all-doctor/${id}`);
//                 console.log(res)
//                 setDoctor(res.data.data)
//             } catch (error) {
//                 console.log(error)
//             }
//         })()
//     },[id])

//   return (
//       <div className="container-fluid px-3 px-lg-4 py-4">
//           <div className="page-heading">
//             <div className="page-heading-copy">
//               <span className="page-icon"><i className="bi bi-person-lines-fill" aria-hidden="true"></i></span>
//               <div>
//                 <p className="eyebrow mb-1">Management</p>
//                 <h1 className="h3 mb-1">User Details</h1>
//                 <p className="text-muted mb-0">Inspect account status, profile data, permissions, and recent activity.</p>
//               </div>
//             </div>
//             <div className="heading-actions"><a className="btn btn-outline-secondary btn-sm" href="users.html"><i className="bi bi-arrow-left" aria-hidden="true"></i> Back to Users</a><a className="btn btn-primary btn-sm" href="add-user.html"><i className="bi bi-person-plus" aria-hidden="true"></i> Add User</a></div>
//           </div>

//           <section className="row g-3">
//             <div className="col-12 col-xl-4">
//               <div className="panel h-100 text-center profile-card">
//                 <div className="profile-cover"><img src={`${doctor?.backCover}`} alt="User workspace preview"/></div>
//                 <div className="profile-hero">
//                   <img className="avatar-img avatar-xl profile-photo" src={`${doctor?.profile}`} alt="Sarah Ahmed"/>
//                   <h2 className="h5 mb-1">{doctor?.fullname}</h2>
//                   <p className="text-muted mb-3">Senior Administrator</p>
//                   <span className="badge text-bg-success">Active Account</span>
//                 </div>
//                 <div className="info-list mt-4 text-start">
//                   <div><span>Email</span><strong><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="22514350434a62475a434f524e470c414d4f">{doctor?.email}</a></strong></div>
//                   <div><span>Phone</span><strong>{doctor?.phone}</strong></div>
//                   <div><span>city</span><strong>{doctor?.city}</strong></div>
//                   <div><span>Location</span><strong>New York, USA</strong></div>
//                 </div>
//                 <hr/>
//                 <div className="info-list mt-4 text-start">
//                   <div><span>Specialization</span><strong>{doctor?.specialization}</strong></div>
//                   <div><span>Qualification</span><strong>{doctor?.qualification}</strong></div>
//                   <div><span>Year of Experience</span><strong>{doctor?.yoe}</strong></div>
//                   <div><span>hospitalName</span><strong>{doctor?.hospitalName}</strong></div>
//                   <div><span>fees</span><strong>{doctor?.fees}</strong></div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-12 col-xl-8">
//               <div className="panel mb-3">
//                 <div className="panel-header"><div><h2 className="h5 mb-1 section-title"><i className="bi bi-person-lines-fill" aria-hidden="true"></i><span>Account Overview</span></h2><p className="text-muted mb-0">Permissions, plan, and current access details.</p></div><button className="btn btn-primary btn-sm" type="button">Edit User</button></div>
//                 <div className="row g-3">
//                   <div className="col-md-4"><div className="mini-card"><span>Role</span><strong>Admin</strong></div></div>
//                   <div className="col-md-4"><div className="mini-card"><span>Last Login</span><strong>Today</strong></div></div>
//                   <div className="col-md-4"><div className="mini-card"><span>Projects</span><strong>14 Active</strong></div></div>
//                 </div>
//               </div>
//               <div className="panel mb-3">
//                 <div className="panel-header"><div><h2 className="h5 mb-1 section-title"><i className="bi bi-clock-history" aria-hidden="true"></i><span>Recent Activity</span></h2><p className="text-muted mb-0">Latest security and workflow events.</p></div></div>
//                 <div className="activity-list">
//                   <div className="activity-item"><span className="activity-dot bg-primary"></span><div><p className="mb-1 fw-semibold">Updated billing permissions</p><p className="text-muted small mb-0">2 hours ago</p></div></div>
//                   <div className="activity-item"><span className="activity-dot bg-success"></span><div><p className="mb-1 fw-semibold">Approved new teammate</p><p className="text-muted small mb-0">Yesterday</p></div></div>
//                   <div className="activity-item"><span className="activity-dot bg-warning"></span><div><p className="mb-1 fw-semibold">Changed password</p><p className="text-muted small mb-0">Apr 30, 2026</p></div></div>
//                 </div>
//               </div>
//               <div className="panel">
//                 <div className="panel-header"><div><h2 className="h5 mb-1 section-title"><i className="bi bi-clock-history" aria-hidden="true"></i><span>Verification</span></h2><p className="text-muted mb-0">Latest security and workflow events.</p></div></div>
//                     <div className="activity">
//                   <div className="activity-item"><span className="activity-dot bg-success"></span><div><a className="mb-1 fw-semibold" href={doctor?.proof} target="_blank" >ID Proof</a><p className="text-muted small mb-0">Yesterday</p></div></div>
//                   <div className="activity-item"><span className="activity-dot bg-primary"></span><div><a className="mb-1 fw-semibold" href={doctor?.medicalCertificate} target="_blank" >Medical Certificate</a><p className="text-muted small mb-0">2 hours ago</p></div></div>
//                   <div className="activity-item"><span className="activity-dot bg-warning"></span><div><a className="mb-1 fw-semibold" href={doctor?.profile} target="_blank" >Profile</a><p className="text-muted small mb-0">Apr 30, 2026</p></div></div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>
//   )
// }


import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const statusBadge = {
  pending: "badge text-bg-warning",
  approved: "badge text-bg-success",
  rejected: "badge text-bg-danger",
};

export const ProfileDetail = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch Doctor Data
  const fetchDoctor = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/v1/doctor/profile`);
      setDoctor(res.data.data);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchDoctor();
  }, [id]);

  // Admin Document Status Update Handler
  const handleVerifyDoc = async (docType, status) => {
    try {
      setActionLoading(true);
      const res = await axios.patch(`http://localhost:5000/api/v1/doctor/verify/${id}`, {
        docType,
        status,
      });

      if (res.data.success) {
        setDoctor(res.data.doctor);
      }
    } catch (error) {
      console.error("Verification update failed:", error);
      alert("Failed to update status");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-50">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-3 px-lg-4 py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Doctor Verification & Profile</h1>
          <p className="text-muted mb-0">Inspect account status, documents, and admin verification logs.</p>
        </div>
        <div>
          <Link className="btn btn-outline-secondary btn-sm me-2" to="/doctors">
            <i className="bi bi-arrow-left me-1"></i> Back to Doctors
          </Link>
        </div>
      </div>

      <section className="row g-4">
        {/* Left Column: Doctor Profile Card */}
        <div className="col-12 col-xl-4">
          <div className="card shadow-sm border-0 rounded-4 text-center p-4">
            <div className="position-relative d-inline-block mx-auto mb-3">
              <img
                src={doctor?.profile || "https://placehold.co/120"}
                alt={doctor?.fullname}
                className="rounded-circle border border-3 border-light shadow-sm"
                style={{ width: "110px", height: "110px", objectFit: "cover" }}
              />
            </div>
            <h2 className="h5 mb-1">{doctor?.fullname}</h2>
            <p className="text-muted small mb-2">{doctor?.specialization || "Specialist"}</p>

            {/* Overall DB Status */}
            <div className="mb-3">
              <span className={`badge ${doctor?.isActive ? "text-bg-success" : "text-bg-secondary"} me-1`}>
                {doctor?.isActive ? "Active Account" : "Inactive Account"}
              </span>
              <span className={statusBadge[doctor?.status || "pending"]}>
                Admin: {(doctor?.status || "pending").toUpperCase()}
              </span>
            </div>

            <hr />

            <div className="text-start small">
              <div className="d-flex justify-content-between py-1">
                <span className="text-muted">Email:</span>
                <strong>{doctor?.email}</strong>
              </div>
              <div className="d-flex justify-content-between py-1">
                <span className="text-muted">Phone:</span>
                <strong>{doctor?.phone}</strong>
              </div>
              <div className="d-flex justify-content-between py-1">
                <span className="text-muted">City:</span>
                <strong>{doctor?.city || "N/A"}</strong>
              </div>
              <div className="d-flex justify-content-between py-1">
                <span className="text-muted">Experience:</span>
                <strong>{doctor?.yoe || 0} Years</strong>
              </div>
              <div className="d-flex justify-content-between py-1">
                <span className="text-muted">Consultation Fee:</span>
                <strong>₹{doctor?.fees || 0}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3 Photos Verification Panel */}
        <div className="col-12 col-xl-8">
          <div className="card shadow-sm border-0 rounded-4 p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="mb-1 fw-bold">Document & Photo Verification</h5>
                <p className="text-muted small mb-0">
                  Verify Government ID, Registration Certificate, and Profile Photo before activating.
                </p>
              </div>
            </div>

            {/* Document Verification Cards */}
            <div className="row g-3 mt-1">
              {/* 1. Government ID Proof */}
              <div className="col-12">
                <div className="border rounded-3 p-3 d-flex flex-wrap align-items-center justify-content-between gap-3 bg-light">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={doctor?.proof || "https://placehold.co/60?text=ID"}
                      alt="ID Proof"
                      className="rounded border"
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                    <div>
                      <h6 className="mb-0 fw-semibold">1. Government ID Proof</h6>
                      <span className={statusBadge[doctor?.proofVerified || "pending"]}>
                        {doctor?.proofVerified || "pending"}
                      </span>
                      <a href={doctor?.proof} target="_blank" rel="noreferrer" className="ms-2 small text-primary">
                        View Full Image <i className="bi bi-box-arrow-up-right"></i>
                      </a>
                    </div>
                  </div>

                  <div className="btn-group">
                    <button
                      className="btn btn-sm btn-outline-success"
                      disabled={actionLoading || doctor?.proofVerified === "approved"}
                      onClick={() => handleVerifyDoc("proof", "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      disabled={actionLoading || doctor?.proofVerified === "rejected"}
                      onClick={() => handleVerifyDoc("proof", "rejected")}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. Medical Registration Certificate */}
              <div className="col-12">
                <div className="border rounded-3 p-3 d-flex flex-wrap align-items-center justify-content-between gap-3 bg-light">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={doctor?.medicalCertificate || "https://placehold.co/60?text=Cert"}
                      alt="Medical Certificate"
                      className="rounded border"
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                    <div>
                      <h6 className="mb-0 fw-semibold">2. Medical Registration Certificate</h6>
                      <span className={statusBadge[doctor?.certificateVerified || "pending"]}>
                        {doctor?.certificateVerified || "pending"}
                      </span>
                      <a href={doctor?.medicalCertificate} target="_blank" rel="noreferrer" className="ms-2 small text-primary">
                        View Full Image <i className="bi bi-box-arrow-up-right"></i>
                      </a>
                    </div>
                  </div>

                  <div className="btn-group">
                    <button
                      className="btn btn-sm btn-outline-success"
                      disabled={actionLoading || doctor?.certificateVerified === "approved"}
                      onClick={() => handleVerifyDoc("certificate", "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      disabled={actionLoading || doctor?.certificateVerified === "rejected"}
                      onClick={() => handleVerifyDoc("certificate", "rejected")}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. Official Profile Photo */}
              <div className="col-12">
                <div className="border rounded-3 p-3 d-flex flex-wrap align-items-center justify-content-between gap-3 bg-light">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={doctor?.profile || "https://placehold.co/60?text=Profile"}
                      alt="Profile Face"
                      className="rounded border"
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                    <div>
                      <h6 className="mb-0 fw-semibold">3. Clear Profile Photo</h6>
                      <span className={statusBadge[doctor?.profileVerified || "pending"]}>
                        {doctor?.profileVerified || "pending"}
                      </span>
                      <a href={doctor?.profile} target="_blank" rel="noreferrer" className="ms-2 small text-primary">
                        View Full Image <i className="bi bi-box-arrow-up-right"></i>
                      </a>
                    </div>
                  </div>

                  <div className="btn-group">
                    <button
                      className="btn btn-sm btn-outline-success"
                      disabled={actionLoading || doctor?.profileVerified === "approved"}
                      onClick={() => handleVerifyDoc("profile", "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      disabled={actionLoading || doctor?.profileVerified === "rejected"}
                      onClick={() => handleVerifyDoc("profile", "rejected")}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Checklist Alert */}
            {/* <div className="mt-4 p-3 rounded-3 bg-body-secondary small">
              <i className="bi bi-info-circle-fill me-2 text-primary"></i>
              Jab admin teeno documents (ID Proof, Medical Certificate, aur Profile) ko <strong>Approve</strong> karega, tabhi doctor profile database mein automatically <strong>Active</strong> state mein switch hogi aur patients ko search list mein dikhegi.
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};