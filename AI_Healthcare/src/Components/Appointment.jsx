// import { Link } from "react-router-dom"


// export const Appointment = () => {
//   return (
//     <>
//         <div className="container-fluid bg-primary my-5 py-5">
//         <div className="container py-5">
//             <div className="row gx-5">
//                 <div className="col-lg-6 mb-5 mb-lg-0">
//                     <div className="mb-4">
//                         <h5 className="d-inline-block text-white text-uppercase border-bottom border-5">Appointment</h5>
//                         <h1 className="display-4">Make An Appointment For Your Family</h1>
//                     </div>
//                     <p className="text-white mb-5">Eirmod sed tempor lorem ut dolores. Aliquyam sit sadipscing kasd ipsum.
//                         Dolor ea et dolore et at sea ea at dolor, justo ipsum duo rebum sea invidunt voluptua. Eos vero
//                         eos vero ea et dolore eirmod et. Dolores diam duo invidunt lorem. Elitr ut dolores magna sit.
//                         Sea dolore sanctus sed et. Takimata takimata sanctus sed.</p>
//                     <Link className="btn btn-dark rounded-pill py-3 px-5 me-3" to={"/search"} >Find Doctor</Link>
//                     <a className="btn btn-outline-dark rounded-pill py-3 px-5" href="#!">Read More</a>
//                 </div>
//                 <div className="col-lg-6">
//                     <div className="bg-white text-center rounded p-5">
//                         <h1 className="mb-4">Book An Appointment</h1>
//                         <form>
//                             <div className="row g-3">
//                                 <div className="col-12 col-sm-6">
//                                     <select className="form-select bg-light border-0" style={{height: "55px"}} defaultValue={"none"}>
//                                         <option value="none">Choose Department</option>
//                                         <option value="1">Department 1</option>
//                                         <option value="2">Department 2</option>
//                                         <option value="3">Department 3</option>
//                                     </select>
//                                 </div>
//                                 <div className="col-12 col-sm-6">
//                                     <select className="form-select bg-light border-0" style={{height: "55px"}}>
//                                         <option selected>Select Doctor</option>
//                                         <option value="1">Doctor 1</option>
//                                         <option value="2">Doctor 2</option>
//                                         <option value="3">Doctor 3</option>
//                                     </select>
//                                 </div>
//                                 <div className="col-12 col-sm-6">
//                                     <input type="text" className="form-control bg-light border-0" placeholder="Your Name"
//                                         style={{height: "55px"}}/>
//                                 </div>
//                                 <div className="col-12 col-sm-6">
//                                     <input type="email" className="form-control bg-light border-0" placeholder="Your Email"
//                                         style={{height: "55px"}}/>
//                                 </div>
//                                 <div className="col-12 col-sm-6">
//                                     <div className="date" id="date" data-target-input="nearest">
//                                         <input type="text" className="form-control bg-light border-0 datetimepicker-input"
//                                             placeholder="Date" data-target="#date" data-toggle="datetimepicker"
//                                             style={{height: "55px"}}/>
//                                     </div>
//                                 </div>
//                                 <div className="col-12 col-sm-6">
//                                     <div className="time" id="time" data-target-input="nearest">
//                                         <input type="text" className="form-control bg-light border-0 datetimepicker-input"
//                                             placeholder="Time" data-target="#time" data-toggle="datetimepicker"
//                                             style={{height: "55px"}}/>
//                                     </div>
//                                 </div>
//                                 <div className="col-12">
//                                     <button className="btn btn-primary w-100 py-3" type="submit">Make An
//                                         Appointment</button>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     </>
//   )
// }



import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import {API} from './../Axios.js'
import {useParams} from 'react-router-dom'

export const Appointment = ({ doctor, onBookingSuccess }) => {
    const {id} = useParams();
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    age: '',
    gender: 'Male',
    appointmentDate: '',
    timeSlot: '',
    consultationType: 'In-Clinic',
    symptoms: '',
    paymentMethod: 'Pay at Clinic'
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [doc, setDoc] = useState('');

  

  // Sample Available Slots
  const availableSlots = [
    '09:00 AM - 09:30 AM',
    '10:00 AM - 10:30 AM',
    '11:00 AM - 11:30 AM',
    '02:00 PM - 02:30 PM',
    '04:00 PM - 04:30 PM',
    '05:00 PM - 05:30 PM'
  ];

  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const payload = {
        ...formData,
        doctorId: doc._id
      };
console.log("hii")
      const response = await API.post(
        '/appointment',
        payload
      );
      console.log(response)

      if (response.data.success) {
        setSuccessMsg('Appointment Successfully Confirmed!');
        if (onBookingSuccess) onBookingSuccess(response.data.data);
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || 'Booking fail ho gayi, kripya dobara koshish karein.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Past dates disable karne ke liye aaj ki date
  const todayDate = new Date().toISOString().split('T')[0];
useEffect(() => {
  const fetchDoctors = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/doctor/all-doctor/${id}`
      );

      console.log(res.data);
      setDoc(res.data.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  fetchDoctors();
}, []);

  return (
    <div className="container py-4" style={{ maxWidth: '750px' }}>
      <div className="card shadow-sm border-0">
        {/* Doctor Summary Banner */}
        <div className="card-header bg-primary text-white p-3">
          <h5 className="mb-1 fw-bold">Book Appointment</h5>
          <div className="small">
            Doctor: <strong>Dr. {doc?.fullname}</strong> ({doc?.specialization}) | Fees: <strong>₹{doc?.fees}</strong>
          </div>
        </div>

        <div className="card-body p-4">
          {errorMsg && <div className="alert alert-danger py-2">{errorMsg}</div>}
          {successMsg && <div className="alert alert-success py-2">{successMsg}</div>}

          <form onSubmit={handleSubmit} className="row g-3">
            {/* Patient Name */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Patient Full Name *</label>
              <input
                type="text"
                name="patientName"
                className="form-control"
                placeholder="Ramesh Kumar"
                value={formData.patientName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Patient Phone */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Mobile Number *</label>
              <input
                type="tel"
                name="patientPhone"
                className="form-control"
                placeholder="10 digit number"
                pattern="[0-9]{10}"
                value={formData.patientPhone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Email Address</label>
              <input
                type="email"
                name="patientEmail"
                className="form-control"
                placeholder="example@gmail.com"
                value={formData.patientEmail}
                onChange={handleChange}
              />
            </div>

            {/* Age & Gender */}
            <div className="col-md-3">
              <label className="form-label fw-semibold">Age *</label>
              <input
                type="number"
                name="age"
                className="form-control"
                min="1"
                max="120"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">Gender *</label>
              <select
                name="gender"
                className="form-select"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <hr className="my-3" />

            {/* Appointment Date */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Appointment Date *</label>
              <input
                type="date"
                name="appointmentDate"
                className="form-control"
                min={todayDate}
                value={formData.appointmentDate}
                onChange={handleChange}
                required
              />
            </div>

            {/* Time Slot Selection */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Select Time Slot *</label>
              <select
                name="timeSlot"
                className="form-select"
                value={formData.timeSlot}
                onChange={handleChange}
                required
              >
                <option value="">-- Choose Time Slot --</option>
                {availableSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            {/* Consultation Type */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Consultation Type</label>
              <select
                name="consultationType"
                className="form-select"
                value={formData.consultationType}
                onChange={handleChange}
              >
                <option value="In-Clinic">In-Clinic Visit (Hospital)</option>
                <option value="Online Video">Online Video Consultation</option>
              </select>
            </div>

            {/* Payment Method */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Payment Option</label>
              <select
                name="paymentMethod"
                className="form-select"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="Pay at Clinic">Pay at Clinic / Hospital</option>
                <option value="Online">Pay Online Now</option>
              </select>
            </div>

            {/* Symptoms / Chief Complaint */}
            <div className="col-12">
              <label className="form-label fw-semibold">Describe Problem / Symptoms *</label>
              <textarea
                name="symptoms"
                className="form-control"
                rows="3"
                placeholder="Apni takleef ya lakshan yahan likhein (e.g. Chest pain, high fever since yesterday)..."
                value={formData.symptoms}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Total Fees Box */}
            <div className="col-12">
              <div className="p-3 bg-light rounded border d-flex justify-content-between align-items-center">
                <span className="fw-semibold">Total Consultation Fee:</span>
                <span className="fs-5 fw-bold text-success">₹{doc?.fees || 0}</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="col-12 mt-4">
              <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-semibold"
                disabled={loading}
               
              >
                {loading ? 'Booking Processing...' : 'Confirm & Book Appointment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// export default Appointment;