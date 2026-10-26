// import axios from "axios";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// export const Register = () => {
  
// const [data, setData] = useState({
//   fullname: "",
//   email: "",
//   phone: "",
//   password: "",
//   confirmPassword: "",
// });

// const [errMsg, setErrMsg] = useState({});
// const [show, setShow] = useState(false);
// const [loading, setLoading] = useState(false);

// const handleChange = (e) => {
//   const { name, value } = e.target;

//   setData((prev) => ({
//     ...prev,
//     [name]: value,
//   }));

//   // Clear the error for the field being edited
//   setErrMsg((prev) => ({
//     ...prev,
//     [name]: "",
//   }));
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   console.log(data);

//   // Check existing validation errors
//   if (Object.values(errMsg).some((x) => x)) {
//     setShow(true);
//     return;
//   }

//   // Validate passwords
//   if (data.password !== data.confirmPassword) {
//     setErrMsg((prev) => ({
//       ...prev,
//       confirmPassword: "Passwords do not match",
//     }));
//     setShow(true);
//     return;
//   }

//   try {
//     setLoading(true);

//     console.log("API Calling");

//     // Don't send confirmPassword unless your backend requires it
//     // const { confirmPassword, ...userData } = data;

//     const res = await axios.post(
//       "http://localhost:5000/api/v1/user/register",
//       data
//     );

//     console.log("Registration successful:", res.data);

//     setErrMsg({});
//     setShow(false);
//   } catch (error) {
//     console.error("Registration failed:", error.response?.data || error.message);

//     setErrMsg((prev) => ({
//       ...prev,
//       api: error.response?.data?.message || "Registration failed",
//     }));

//     setShow(true);
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <>
//       <div className="row gx-5">
//         <div className="col-lg-6">
//           <div className="bg-white text-center rounded p-5">
//             <h1 className="mb-4">Sign Up</h1>
//             {show && errMsg.api && (
//   <p className="error">{errMsg.api}</p>
// )}
//             <form onSubmit={handleSubmit}>
//               <div className="row g-3">
//                 <div className="col-12 form-floating ">
//                   <input
//                     type="text"
//                     name="fullname"
//                     id="Fullname"
//                     onChange={handleChange}
//                     className="form-control bg-light border-0 "
//                     placeholder="Fullname"
//                     style={{ height: "55px" }}
//                   />
//                   <label htmlFor="Fullname" className="float-start form-label ">
//                     *Fullname
//                   </label>
//                 </div>
//                 <div className="col-12 form-floating ">
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     onChange={handleChange}
//                     className="form-control bg-light border-0 "
//                     placeholder="Email"
//                     style={{ height: "55px" }}
//                   />
//                   <label htmlFor="email" className="float-start form-label ">
//                     *Email
//                   </label>
//                 </div>
//                 <div className="col-12 form-floating ">
//                   <input
//                     type="tel"
//                     name="phone"
//                     id="phone"
//                     onChange={handleChange}
//                     className="form-control bg-light border-0 "
//                     placeholder="Phone"
//                     style={{ height: "55px" }}
//                   />
//                   <label htmlFor="phone" className="float-start form-label ">
//                     *Phone
//                   </label>
//                 </div>
//                 <div className="col-12 form-floating">
//                   <input
//                     type="password"
//                     name="password"
//                     id="password"
//                     onChange={handleChange}
//                     className="form-control bg-light border-0 "
//                     placeholder="eg:-LjuhM3$Ku21"
//                     style={{ height: "55px" }}
//                   />
//                   <label htmlFor="password" className="float-start form-label ">
//                     *Password
//                   </label>
//                 </div>
//                 <div className="col-12 form-floating">
//                   <input
//                     type="password"
//                     name="confirmPassword"
//                     id="confirmPassword"
//                     onChange={handleChange}
//                     className="form-control bg-light border-0 "
//                     placeholder="eg:-LjuhM3$Ku21"
//                     style={{ height: "55px" }}
//                   />
//                   <label
//                     htmlFor="confirmPassword"
//                     className="float-start form-label "
//                   >
//                     *Confirm-Password
//                   </label>
//                 </div>

//                 <div className="col-12">
//                   <button className="btn btn-primary w-100 py-3" type="submit">
//                     Sign Up
//                   </button>
//                 </div>
//                 <div className="d-flex align-items-center">
//                   <hr className="flex-grow-1" />
//                   <span>OR</span>
//                   <hr className="flex-grow-1" />
//                 </div>
//                 <div className="col-12">
//                   <p>
                    
//                     <Link>Continoue with GOOGLE</Link>
//                   </p>
//                   <p>
                    
//                     <Link>Continoue with GMAIL </Link>
//                   </p>
//                 </div>
//                 <div className="col-12">
//                   <p>
//                     Already have an account? <Link to="/login">Sign in</Link>
//                   </p>
//                 </div>
//                 <div className="col-12">
//                 <p>
//                   Are you Doctor? <Link to="/doctor/register">Sign Up</Link>
//                 </p>
//               </div>
//               </div>
//             </form>
//           </div>
//         </div>
//         <div className="col-lg-6 mb-5 mb-lg-0">
//           <div className="mb-4">
//             <h5 className="d-inline-block text-white text-uppercase border-bottom border-5">
//               Appointment
//             </h5>
//             <h1 className="display-4">Make An Appointment For Your Family</h1>
//           </div>
//           <p className="text-white mb-5">
//             Eirmod sed tempor lorem ut dolores. Aliquyam sit sadipscing kasd
//             ipsum. Dolor ea et dolore et at sea ea at dolor, justo ipsum duo
//             rebum sea invidunt voluptua. Eos vero eos vero ea et dolore eirmod
//             et. Dolores diam duo invidunt lorem. Elitr ut dolores magna sit. Sea
//             dolore sanctus sed et. Takimata takimata sanctus sed.
//           </p>
//           <Link
//             className="btn btn-dark rounded-pill py-3 px-5 me-3"
//             to={"/login"}
//           >
//             Find Doctor
//           </Link>
//           <Link
//             className="btn btn-outline-dark rounded-pill py-3 px-5"
//             to={"/Signup"}
//           >
//             Read More
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Field validation rules
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "fullname":
        if (!value.trim()) error = "Full name is required.";
        else if (value.trim().length < 3) error = "Name must be at least 3 characters.";
        break;
      case "email":
        if (!value.trim()) error = "Email address is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Enter a valid email address.";
        break;
      case "phone":
        if (!value.trim()) error = "Phone number is required.";
        else if (!/^\+?[0-9]{10,14}$/.test(value.replace(/[\s-]/g, "")))
          error = "Enter a valid phone number (10-14 digits).";
        break;
      case "password":
        if (!value) error = "Password is required.";
        else if (value.length < 6) error = "Password must be at least 6 characters.";
        else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value))
          error = "Must contain uppercase, lowercase, and a number.";
        break;
      case "confirmPassword":
        if (!value) error = "Please confirm your password.";
        else if (value !== data.password) error = "Passwords do not match.";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear API messages on new input
    if (apiError) setApiError("");

    // Live validation for the edited field
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
      // Cross-check confirmation if password updates
      ...(name === "password" && prev.confirmPassword
        ? { confirmPassword: value !== data.confirmPassword ? "Passwords do not match." : "" }
        : {}),
    }));
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(data).forEach((key) => {
      const err = validateField(key, data[key]);
      if (err) newErrors[key] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSuccessMsg("");

    if (!validateAll()) return;

    try {
      setLoading(true);

      // Exclude confirmPassword before sending to backend
    //   const { confirmPassword, ...payload } = data;

      const res = await axios.post("http://localhost:5000/api/v1/user/register", data);
      console.log(res)

      if(res.data.success){
        setSuccessMsg("Account registered successfully! Redirecting...");
      setTimeout(() => {
        navigate("/login");
      }, 1800);
      }
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Registration failed. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row g-5 align-items-center justify-content-center">
        {/* Left Form Column */}
        <div className="col-12 col-lg-6 col-xl-5">
          <div className="card shadow-sm border-0 rounded-4 p-4 p-sm-5 bg-white">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-dark mb-1">Create Account</h2>
              <p className="text-muted small">Join us to manage your health and bookings</p>
            </div>

            {/* API Feedback Alerts */}
            {apiError && (
              <div className="alert alert-danger alert-dismissible fade show py-2 small" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {apiError}
              </div>
            )}
            {successMsg && (
              <div className="alert alert-success alert-dismissible fade show py-2 small" role="alert">
                <i className="bi bi-check-circle-fill me-2"></i>
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="row g-3">
                {/* Full Name */}
                <div className="col-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      className={`form-control ${errors.fullname ? "is-invalid" : data.fullname ? "is-valid" : ""}`}
                      id="fullname"
                      name="fullname"
                      placeholder="John Doe"
                      value={data.fullname}
                      onChange={handleChange}
                    />
                    <label htmlFor="fullname">Full Name</label>
                    <div className="invalid-feedback">{errors.fullname}</div>
                  </div>
                </div>

                {/* Email */}
                <div className="col-12">
                  <div className="form-floating">
                    <input
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : data.email ? "is-valid" : ""}`}
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      value={data.email}
                      onChange={handleChange}
                    />
                    <label htmlFor="email">Email Address</label>
                    <div className="invalid-feedback">{errors.email}</div>
                  </div>
                </div>

                {/* Phone */}
                <div className="col-12">
                  <div className="form-floating">
                    <input
                      type="tel"
                      className={`form-control ${errors.phone ? "is-invalid" : data.phone ? "is-valid" : ""}`}
                      id="phone"
                      name="phone"
                      placeholder="1234567890"
                      value={data.phone}
                      onChange={handleChange}
                    />
                    <label htmlFor="phone">Phone Number</label>
                    <div className="invalid-feedback">{errors.phone}</div>
                  </div>
                </div>

                {/* Password */}
                <div className="col-12">
                  <div className="form-floating position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control pe-5 ${errors.password ? "is-invalid" : data.password ? "is-valid" : ""}`}
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={data.password}
                      onChange={handleChange}
                    />
                    <label htmlFor="password">Password</label>
                    <button
                      type="button"
                      className="btn btn-sm btn-link position-absolute top-50 end-0 translate-middle-y me-2 text-muted text-decoration-none"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                    <div className="invalid-feedback">{errors.password}</div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="col-12">
                  <div className="form-floating">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${errors.confirmPassword ? "is-invalid" : data.confirmPassword ? "is-valid" : ""}`}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={data.confirmPassword}
                      onChange={handleChange}
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="col-12 mt-4">
                  <button
                    className="btn btn-primary w-100 py-3 rounded-3 fw-semibold shadow-sm"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : null}
                    {loading ? "Registering..." : "Create Account"}
                  </button>
                </div>
              </div>
            </form>

            {/* Divider */}
            <div className="d-flex align-items-center my-4">
              <hr className="flex-grow-1 text-muted" />
              <span className="px-3 text-secondary small text-uppercase">or</span>
              <hr className="flex-grow-1 text-muted" />
            </div>

            {/* Social Authentication */}
            <div className="d-grid gap-2">
              <button type="button" className="btn btn-outline-secondary py-2 rounded-3 small">
                <i className="bi bi-google me-2 text-danger"></i> Continue with Google
              </button>
            </div>

            {/* Navigation Links */}
            <div className="text-center mt-4 pt-2">
              <p className="text-muted small mb-2">
                Already have an account?{" "}
                <Link to="/login" className="text-primary text-decoration-none fw-semibold">
                  Sign In
                </Link>
              </p>
              <p className="text-muted small mb-0">
                Are you a healthcare provider?{" "}
                <Link to="/doctor/register" className="text-primary text-decoration-none fw-semibold">
                  Doctor Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Info Hero Column */}
        <div className="col-12 col-lg-6 ps-lg-5">
          <div className="pe-lg-4">
            <span className="badge bg-primary-subtle text-primary text-uppercase px-3 py-2 rounded-pill mb-3">
              Fast & Reliable Care
            </span>
            <h1 className="display-5 fw-bold text-dark mb-4">
              Schedule Appointments Seamlessly for Your Family
            </h1>
            <p className="lead text-muted mb-4">
              Connect with top-rated medical specialists in your area. Securely track prescriptions, access lab reports, and manage consultation schedules all in one spot.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/doctors" className="btn btn-dark rounded-pill py-3 px-4 shadow-sm">
                Find a Doctor
              </Link>
              <Link to="/about" className="btn btn-outline-secondary rounded-pill py-3 px-4">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};