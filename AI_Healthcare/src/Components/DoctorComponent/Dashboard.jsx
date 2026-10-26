import React, { useState, useEffect } from "react";
import axios from "axios";

export const Dashboard = () => {
  // 1. Doctor Schedule / Slot State
  const [schedule, setSchedule] = useState({
    workingDays: "Monday - Friday",
    startTime: "09:00",
    endTime: "17:00",
    slotDuration: "30", // in minutes
    isAccepting: true,
  });
  const [scheduleSaved, setScheduleSaved] = useState(false);

  // 2. Appointments / Patient State
  const [appointments, setAppointments] = useState([
    {
      id: "APT-201",
      patientName: "Ramesh Sharma",
      age: 42,
      gender: "Male",
      phone: "+91 98765 43210",
      date: "2026-10-23",
      time: "09:30 AM",
      type: "Regular Checkup",
      status: "Confirmed",
      doctorNotes: "Blood pressure monitoring needed",
    },
    {
      id: "APT-202",
      patientName: "Sunita Devi",
      age: 35,
      gender: "Female",
      phone: "+91 98765 12345",
      date: "2026-10-23",
      time: "10:15 AM",
      type: "Follow-up",
      status: "In-Progress",
      doctorNotes: "Check latest lab reports",
    },
    {
      id: "APT-203",
      patientName: "Vikram Malhotra",
      age: 28,
      gender: "Male",
      phone: "+91 98111 22334",
      date: "2026-10-23",
      time: "11:00 AM",
      type: "Online Consultation",
      status: "Pending",
      doctorNotes: "Complaining of seasonal allergies",
    },
  ]);

  // Selected patient for writing notes / update
  const [activePatient, setActivePatient] = useState(null);
  const [tempNotes, setTempNotes] = useState("");

  // Filter state for appointments list
  const [filterStatus, setFilterStatus] = useState("All");

  const token =
        localStorage.getItem("doctorAccessToken") ||
        sessionStorage.getItem("doctorAccessToken");

  // Schedule input handler
  const handleScheduleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSchedule((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setScheduleSaved(false);
  };

  // Schedule Save handler
  const handleSaveSchedule = async (e) => {
    e.preventDefault();
    try {
      await axios.patch("/api/v1/doctor/update-schedule", schedule);
      setScheduleSaved(true);
      setTimeout(() => setScheduleSaved(false), 3000);
    } catch (err) {
      console.error("Failed to update schedule", err);
    }
  };

  // Status Updater
  const handleStatusChange = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );
  };

  // Save Notes for patient
  const handleSaveNotes = () => {
    if (!activePatient) return;
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === activePatient.id ? { ...apt, doctorNotes: tempNotes } : apt
      )
    );
    setActivePatient(null);
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter((apt) => {
    if (filterStatus === "All") return true;
    return apt.status === filterStatus;
  });

  // Calculate Metrics
  const totalCount = appointments.length;
  const confirmedCount = appointments.filter((a) => a.status === "Confirmed").length;
  const inProgressCount = appointments.filter((a) => a.status === "In-Progress").length;
  const completedCount = appointments.filter((a) => a.status === "Completed").length;

 useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/appointments/appointments",{
          headers :{
            Authorization : `Bearer ${token}`
          },
          withCredentials : true
        }
        
      );

      console.log(res.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  fetchAppointments();
}, []);

  return (
    <div className="container-fluid py-4 px-3 px-lg-5 bg-light min-vh-100">
      
      {/* Top Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold mb-1">Doctor Clinic Dashboard</h2>
          <p className="text-muted mb-0">Manage daily patient appointments and update consultation hours.</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className={`badge ${schedule.isAccepting ? "bg-success" : "bg-danger"} p-2`}>
            {schedule.isAccepting ? "● Accepting Appointments" : "● Offline / Closed"}
          </span>
        </div>
      </div>

      {/* Metrics Row: Kitne appointments hain */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm rounded-3 p-3 bg-white">
            <span className="text-muted small fw-semibold text-uppercase">Total Bookings</span>
            <h3 className="fw-bold my-1 text-dark">{totalCount}</h3>
            <small className="text-primary">Today's Queue</small>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm rounded-3 p-3 bg-white">
            <span className="text-muted small fw-semibold text-uppercase">Confirmed</span>
            <h3 className="fw-bold my-1 text-primary">{confirmedCount}</h3>
            <small className="text-muted">Scheduled slots</small>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm rounded-3 p-3 bg-white">
            <span className="text-muted small fw-semibold text-uppercase">In Clinic</span>
            <h3 className="fw-bold my-1 text-warning">{inProgressCount}</h3>
            <small className="text-warning">Currently consulting</small>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm rounded-3 p-3 bg-white">
            <span className="text-muted small fw-semibold text-uppercase">Completed</span>
            <h3 className="fw-bold my-1 text-success">{completedCount}</h3>
            <small className="text-success">Prescriptions done</small>
          </div>
        </div>
      </div>

      <div className="row g-4">
        
        {/* Left Column: Patient Management & Appointment Table */}
        <div className="col-12 col-xl-8">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            
            {/* Table Header & Status Filter */}
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
              <h5 className="fw-bold mb-0">Patient Queue & Status</h5>
              <div className="btn-group btn-group-sm">
                {["All", "Confirmed", "In-Progress", "Completed", "Pending"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={`btn ${filterStatus === status ? "btn-primary" : "btn-outline-secondary"}`}
                    onClick={() => setFilterStatus(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Appointments Table */}
            <div className="table-responsive">
              <table className="table align-middle table-hover mb-0">
                <thead className="table-light small text-uppercase text-secondary">
                  <tr>
                    <th>Patient Name</th>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th className="text-end">Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">
                        No appointments found under this filter.
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((apt) => (
                      <tr key={apt.id}>
                        <td>
                          <div className="fw-bold text-dark">{apt.patientName}</div>
                          <small className="text-muted">{apt.gender}, {apt.age} yrs | {apt.phone}</small>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark border">
                            {apt.time}
                          </span>
                        </td>
                        <td>
                          <span className="small text-secondary">{apt.type}</span>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              apt.status === "Confirmed"
                                ? "bg-primary-subtle text-primary"
                                : apt.status === "In-Progress"
                                ? "bg-warning-subtle text-warning"
                                : apt.status === "Completed"
                                ? "bg-success-subtle text-success"
                                : "bg-secondary-subtle text-secondary"
                            }`}
                          >
                            {apt.status}
                          </span>
                        </td>
                        <td className="text-end">
                          <div className="d-flex justify-content-end gap-1">
                            {/* Update Status Dropdown */}
                            <select
                              className="form-select form-select-sm w-auto"
                              value={apt.status}
                              onChange={(e) => handleStatusChange(apt.id, e.target.value)}
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="In-Progress">In-Progress</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>

                            {/* View / Edit Notes Button */}
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => {
                                setActivePatient(apt);
                                setTempNotes(apt.doctorNotes || "");
                              }}
                              title="Add Doctor Notes"
                            >
                              Notes
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Note Editor Area (when a patient is selected) */}
            {activePatient && (
              <div className="mt-4 p-3 bg-light rounded-3 border">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-bold small text-primary">
                    Doctor Notes for: {activePatient.patientName} ({activePatient.id})
                  </span>
                  <button
                    className="btn-close btn-sm"
                    onClick={() => setActivePatient(null)}
                  ></button>
                </div>
                <textarea
                  className="form-control mb-2"
                  rows="3"
                  placeholder="Enter medical observations, prescription remarks..."
                  value={tempNotes}
                  onChange={(e) => setTempNotes(e.target.value)}
                ></textarea>
                <button className="btn btn-sm btn-primary px-3" onClick={handleSaveNotes}>
                  Save Notes
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Time Slot & Availability Setup */}
        <div className="col-12 col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h5 className="fw-bold mb-3 border-bottom pb-2">Set Consultation Timings</h5>

            {scheduleSaved && (
              <div className="alert alert-success py-2 small" role="alert">
                Schedule timings updated successfully!
              </div>
            )}

            <form onSubmit={handleSaveSchedule}>
              {/* Working Days */}
              <div className="mb-3">
                <label className="form-label small fw-semibold text-muted">Consultation Days</label>
                <input
                  type="text"
                  name="workingDays"
                  className="form-control"
                  value={schedule.workingDays}
                  onChange={handleScheduleChange}
                  placeholder="e.g. Mon - Sat"
                />
              </div>

              {/* Start & End Hours */}
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label small fw-semibold text-muted">Clinic Starts</label>
                  <input
                    type="time"
                    name="startTime"
                    className="form-control"
                    value={schedule.startTime}
                    onChange={handleScheduleChange}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-semibold text-muted">Clinic Closes</label>
                  <input
                    type="time"
                    name="endTime"
                    className="form-control"
                    value={schedule.endTime}
                    onChange={handleScheduleChange}
                  />
                </div>
              </div>

              {/* Consultation Duration */}
              <div className="mb-3">
                <label className="form-label small fw-semibold text-muted">Per Patient Slot Duration</label>
                <select
                  name="slotDuration"
                  className="form-select"
                  value={schedule.slotDuration}
                  onChange={handleScheduleChange}
                >
                  <option value="15">15 Minutes / Patient</option>
                  <option value="20">20 Minutes / Patient</option>
                  <option value="30">30 Minutes / Patient</option>
                  <option value="45">45 Minutes / Patient</option>
                </select>
              </div>

              {/* Accepting Toggle */}
              <div className="form-check form-switch mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="acceptingCheck"
                  name="isAccepting"
                  checked={schedule.isAccepting}
                  onChange={handleScheduleChange}
                />
                <label className="form-check-label small fw-semibold" htmlFor="acceptingCheck">
                  Available for new bookings
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-100 rounded-3 py-2 fw-semibold">
                Update Timings & Slots
              </button>
            </form>

            <div className="mt-4 p-3 rounded-3 bg-body-secondary small text-muted">
              <strong>Info:</strong> Jab aap start aur end time update karte hain, system slot duration (jaise 30 min) ke hisaab se patient portal par automatic booking slots generate karta hai.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};