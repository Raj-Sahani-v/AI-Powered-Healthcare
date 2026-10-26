// import { useState } from "react"
// import { Link } from "react-router-dom"


// export const Login = () => {
//     const [data, setData] = useState({
//         email : "",
//         password : ""
//     });
//     const [loading, setLoading] = useState(false);
//     const [error , setError] = useState({});
//     const [apiError , setApiError] = useState("")
//     const [successMsg, setSuccessMsg] = useState("");

//     const validateField = (name,value)=>{
//         let error =""
//         switch(name){
//             case "email":
//                 if(!value.trim())error = "Email address is required";
//                 else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Enter a valid email address.";
//                 break;
//             case "password":
//         if (!value) error = "Password is required.";
//         break;
//         }
//         return error;
//     }

//   return (
//     <>
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
//                                     <p>Dont have an account? <Link to={"/register"} >Sign up now </Link> </p>
                                     
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

import { Link, useNavigate } from "react-router-dom";
 import axios from "axios";
// import {API} from "../../Axios.js"


export const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    identifier: "", // Can be email or phone
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
      case "identifier": {
        const trimmed = value.trim();
        if (!trimmed) {
          error = "Email or phone number is required.";
        } else {
          const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
          const isPhone = /^\+?[0-9]{10,14}$/.test(trimmed.replace(/[\s-]/g, ""));
          if (!isEmail && !isPhone) {
            error = "Enter a valid email address or 10-digit phone number.";
          }
        }
        break;
      }
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
    console.log(data);

    if (!validateAll()) return;

    try {
      setLoading(true);

      const payload = {
        identifier: data.identifier.trim(),
        password: data.password,
      };

      console.log("Payload: ",payload)
      const res = await axios.post("http://localhost:5000/api/v1/user/login", payload,  {
    withCredentials: true,
  });
      console.log(res)
      // Save token if returned
      if (res.data?.accessToken) {
        if (data.remember) {
          localStorage.setItem("authToken", res.data.accessToken);
        } else {
          sessionStorage.setItem("authToken", res.data.accessToken);
        }
      }

      navigate("/");
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid bg-primary py-5 min-vh-100 d-flex align-items-center">
      <div className="container py-4">
        <div className="row gx-5 align-items-center justify-content-center">
          
          {/* Left Column: Context / Hero */}
          <div className="col-lg-6 mb-5 mb-lg-0 text-white">
            <div className="mb-4">
              <span className="badge bg-white text-primary text-uppercase px-3 py-2 rounded-pill mb-3 fw-bold">
                Welcome Back
              </span>
              <h1 className="display-4 fw-bold">Access Your Health Dashboard</h1>
            </div>
            <p className="lead mb-4 opacity-75">
              Securely sign in to schedule consultations, review your digital medical records, and connect with healthcare providers anytime.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link className="btn btn-dark rounded-pill py-3 px-5 shadow-sm" to="/doctor/register">
                Are you a Doctor?
              </Link>
              <Link className="btn btn-outline-light rounded-pill py-3 px-5" to="/about">
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Column: Sign In Card */}
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-lg border-0 rounded-4 p-4 p-sm-5 bg-white">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-dark mb-1">Sign In</h2>
                <p className="text-muted small">Enter your credentials to continue</p>
              </div>

              {/* Alert Message for API failure */}
              {apiError && (
                <div className="alert alert-danger py-2 small d-flex align-items-center mb-4" role="alert">
                  <i className="bi bi-exclamation-circle-fill me-2 fs-5"></i>
                  <div>{apiError}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  
                  {/* Email / Phone Field */}
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        name="identifier"
                        id="identifier"
                        className={`form-control ${
                          errors.identifier ? "is-invalid" : data.identifier ? "is-valid" : ""
                        }`}
                        placeholder="Email or Phone"
                        value={data.identifier}
                        onChange={handleChange}
                        autoComplete="username"
                      />
                      <label htmlFor="identifier">Email or Phone Number</label>
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
                        id="remember"
                        checked={data.remember}
                        onChange={handleChange}
                      />
                      <label className="form-check-label small text-muted user-select-none" htmlFor="remember">
                        Remember me
                      </label>
                    </div>
                    <Link to="/forgot-password" className="text-primary small text-decoration-none fw-semibold">
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
                          Signing In...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="d-flex align-items-center my-3">
                    <hr className="flex-grow-1 text-muted" />
                    <span className="px-3 text-secondary small text-uppercase">or</span>
                    <hr className="flex-grow-1 text-muted" />
                  </div>

                  {/* OAuth / Social */}
                  <div className="col-12">
                    <button type="button" className="btn btn-outline-secondary w-100 py-2 rounded-3 small">
                      <i className="bi bi-google me-2 text-danger"></i> Continue with Google
                    </button>
                  </div>

                  {/* Register Link */}
                  <div className="col-12 text-center mt-3">
                    <p className="text-muted small mb-0">
                      Don't have an account?{" "}
                      <Link to="/register" className="text-primary fw-semibold text-decoration-none">
                        Sign up now
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