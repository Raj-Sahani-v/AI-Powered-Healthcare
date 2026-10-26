// src/components/profile/AppointmentHistoryTab.jsx
import React from "react";

export const AppointmentHistoryTab = ({ appointments }) => {
  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
      <h5 className="fw-bold mb-1">Consultation History</h5>
      <p className="text-muted small mb-3">Track previous and scheduled doctor visits</p>

      <hr className="mb-4 opacity-25" />

      <div className="table-responsive">
        <table className="table align-middle table-hover mb-0">
          <thead className="table-light small text-uppercase text-secondary">
            <tr>
              <th>Doctor</th>
              <th>Specialization</th>
              <th>Date & Time</th>
              <th>Mode</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length > 0 ? (
              appointments.map((item) => (
                <tr key={item.id}>
                  <td className="fw-bold">{item.doctorName}</td>
                  <td className="text-muted small">{item.specialization}</td>
                  <td>
                    <div>{item.date}</div>
                    <small className="text-muted">{item.time}</small>
                  </td>
                  <td>
                    <span className="small text-secondary">{item.type}</span>
                  </td>
                  <td>
                    <span
                      className={`badge rounded-pill px-3 py-2 ${
                        item.status === "Confirmed"
                          ? "bg-primary-subtle text-primary"
                          : item.status === "Completed"
                          ? "bg-success-subtle text-success"
                          : "bg-danger-subtle text-danger"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-muted">
                  No appointments booked yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};