// import React from 'react'
// import {Link} from 'react-router-dom'
// export const LoginDoctor = () => {
//   return (
//       <>
//          <>
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
//                     <Link className="btn btn-dark rounded-pill py-3 px-5 me-3" to={"/login"} >Find Doctor</Link>
//                     <Link className="btn btn-outline-dark rounded-pill py-3 px-5" to={"/Signup"} >Read More</Link>
//                 </div>
//                 <div className="col-lg-6">
//                     <div className="bg-white text-center rounded p-5">
//                         <h1 className="mb-4">Sign In</h1>
//                         <form>
//                             <div className="row g-3">
//                                 <div className="col-12 form-floating ">
//                                     <input type="text" name="email" id="email" className="form-control bg-light border-0 " placeholder="Email/Phone" style={{height: "55px"}} />
//                                     <label htmlFor="email" className="float-start form-label ">*Email/Phone  </label>
//                                 </div>
//                                 <div className="col-12 form-floating">
//                                     <input type="password" name="password" id="password"  className="form-control bg-light border-0 " placeholder="eg:-LjuhM3$Ku21" style={{height : "55px"}} />
//                                     <label htmlFor="password" className="float-start form-label " >*Password</label>
//                                 </div>
//                                 <div className="col-12 d-flex" >
//                                     <div className="col d-flex ">
//                                         <input type="checkbox" name="remember" id="remember" />
//                                         <label htmlFor="remember">Remember me</label>
//                                     </div>
//                                     <div className="col form-floating">
//                                         <Link className="float-end">Forget password? </Link>
//                                     </div>
//                                 </div>
                                
//                                 <div className="col-12">
//                                     <button className="btn btn-primary w-100 py-3" type="submit">Sign In</button>
//                                 </div>
//                                 <div className="d-flex align-items-center">
//                                     <hr className="flex-grow-1" />
//                                     <span>OR</span>
//                                     <hr className="flex-grow-1" />
//                                 </div>
//                                 <div className="col-12">
//                                     <p> <Link>Continoue with GOOGLE</Link> </p>
//                                     <p> <Link>Continoue with GMAIL </Link> </p>
//                                 </div>
//                                 <div className="col-12">
//                                     <p>Dont have an account? <Link to={"/doctor/register"} >Sign up now </Link> </p>
                                    
                                     
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     </>
//     </>
//   )
// }



import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const LoginDoctor = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    identifier: "", // Can be Email, Phone, or MRN
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Field validation rules
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "identifier":
        if (!value.trim()) {
          error = "Please enter your Email, Phone, or MRN.";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required.";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters.";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    if (apiError) setApiError("");

    if (type !== "checkbox") {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, fieldValue),
      }));
    }
  };

  const validateAll = () => {
    const newErrors = {};
    const idErr = validateField("identifier", data.identifier);
    const passErr = validateField("password", data.password);

    if (idErr) newErrors.identifier = idErr;
    if (passErr) newErrors.password = passErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateAll()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/v1/doctor/login",
        {
          identifier: data.identifier.trim(),
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res)
     
      if (res.data?.accessToken) {
        if (data.remember) {
          localStorage.setItem("doctorAccessToken", res.data.accessToken);
        } else {
          sessionStorage.setItem("doctorAccessToken", res.data.accessToken);
        }
      }

      if (res.data?.doctor && !res.data.doctor.isActive) {
        // navigate(`/doctor/verification-status/${res.data.doctor.id || res.data.doctor._id}`);
        navigate(`/doctor/verification-status`);
        return;
      }

      navigate("/doctor/dashboard");
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Invalid doctor credentials or server error."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid bg-primary py-5 min-vh-100 d-flex align-items-center">
      <div className="container py-4">
        <div className="row gx-5 align-items-center justify-content-center">
          
          {/* Left Column: Doctor Branding & Portal Info */}
          <div className="col-lg-6 mb-5 mb-lg-0 text-white">
            <div className="mb-4">
              <span className="badge bg-white text-primary text-uppercase px-3 py-2 rounded-pill mb-3 fw-bold">
                Doctor Portal
              </span>
              <h1 className="display-5 fw-bold">Manage Your Clinic & Patient Care</h1>
            </div>
            <p className="lead mb-4 opacity-75">
              Securely access consultation requests, update your OPD schedules, review electronic prescriptions, and coordinate with verified medical staff.
            </p>

            <div className="row g-3 mb-4 text-start">
              <div className="col-sm-6">
                <div className="d-flex align-items-center">
                  <i className="bi bi-shield-check fs-3 me-2"></i>
                  <div>
                    <h6 className="mb-0 fw-bold">HIPAA Compliant</h6>
                    <small className="opacity-75">End-to-end encrypted records</small>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="d-flex align-items-center">
                  <i className="bi bi-calendar2-week fs-3 me-2"></i>
                  <div>
                    <h6 className="mb-0 fw-bold">Live Schedules</h6>
                    <small className="opacity-75">Real-time slot management</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-3">
              <Link className="btn btn-dark rounded-pill py-3 px-4 shadow-sm" to="/doctor/register">
                Register as Doctor
              </Link>
              <Link className="btn btn-outline-light rounded-pill py-3 px-4" to="/login">
                Patient Login
              </Link>
            </div>
          </div>

          {/* Right Column: Doctor Login Form */}
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-lg border-0 rounded-4 p-4 p-sm-5 bg-white">
              <div className="text-center mb-4">
                <div className="bg-primary-subtle text-primary rounded-circle d-inline-flex p-3 mb-2">
                  <i className="bi bi-hospital fs-3"></i>
                </div>
                <h2 className="fw-bold text-dark mb-1">Doctor Sign In</h2>
                <p className="text-muted small">Enter your credentials to access doctor workspace</p>
              </div>

              {/* API Alert */}
              {apiError && (
                <div className="alert alert-danger py-2 small d-flex align-items-center mb-4" role="alert">
                  <i className="bi bi-exclamation-circle-fill me-2 fs-5"></i>
                  <div>{apiError}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  
                  {/* Email / Phone / MRN */}
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        name="identifier"
                        id="identifier"
                        className={`form-control ${
                          errors.identifier ? "is-invalid" : data.identifier ? "is-valid" : ""
                        }`}
                        placeholder="Email, Phone or MRN"
                        value={data.identifier}
                        onChange={handleChange}
                        autoComplete="username"
                      />
                      <label htmlFor="identifier">Email, Phone, or MRN</label>
                      <div className="invalid-feedback">{errors.identifier}</div>
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="col-12">
                    <div className="form-floating position-relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        className={`form-control pe-5 ${
                          errors.password ? "is-invalid" : data.password ? "is-valid" : ""
                        }`}
                        placeholder="Password"
                        value={data.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                      />
                      <label htmlFor="password">Password</label>
                      <button
                        type="button"
                        className="btn btn-sm btn-link position-absolute top-50 end-0 translate-middle-y me-2 text-muted text-decoration-none"
                        onClick={() => setShowPassword((prev) => !prev)}
                        tabIndex={-1}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                      <div className="invalid-feedback">{errors.password}</div>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="col-12 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="remember"
                        id="rememberDoctor"
                        checked={data.remember}
                        onChange={handleChange}
                      />
                      <label className="form-check-label small text-muted user-select-none" htmlFor="rememberDoctor">
                        Remember session
                      </label>
                    </div>
                    <Link to="/doctor/forgot-password" className="text-primary small text-decoration-none fw-semibold">
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <div className="col-12 mt-4">
                    <button
                      className="btn btn-primary w-100 py-3 rounded-3 fw-semibold shadow-sm"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Verifying Doctor...
                        </>
                      ) : (
                        "Access Portal"
                      )}
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="d-flex align-items-center my-3">
                    <hr className="flex-grow-1 text-muted" />
                    <span className="px-3 text-secondary small text-uppercase">or</span>
                    <hr className="flex-grow-1 text-muted" />
                  </div>

                  {/* New Registration Link */}
                  <div className="col-12 text-center">
                    <p className="text-muted small mb-1">
                      New Practitioner?{" "}
                      <Link to="/doctor/register" className="text-primary fw-semibold text-decoration-none">
                        Submit Profile for Verification
                      </Link>
                    </p>
                    <p className="text-muted small mb-0">
                      Looking for appointments as patient?{" "}
                      <Link to="/login" className="text-secondary fw-semibold text-decoration-none">
                        Patient Login
                      </Link>
                    </p>
                  </div>

                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};