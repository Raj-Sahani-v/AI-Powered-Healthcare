import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextValidator } from "../../../Validator/TextValidator";
import { ImageValidator } from "../../../Validator/ImageValidator";

const initialData = {
  fullname: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  qualification: "",
  mrn: "",
  city: "",
  fees: "",
  hospitalName: "",
  specialization: "",
  yoe: "",
};

const fileFields = ["profile", "medicalCertificate", "proof"];

export const RegisterDoctor = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(initialData);
  const [files, setFiles] = useState({
    profile: null,
    medicalCertificate: null,
    proof: null,
  });
  const [errorMsg, setErrorMsg] = useState({});
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState({ type: "", text: "" });
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandle = (e) => {
    const { name, files: inputFiles, value } = e.target;
    const isFile = fileFields.includes(name);

    if (isFile) {
      const selectedFile = inputFiles[0] || null;
      setFiles((prev) => ({ ...prev, [name]: selectedFile }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }

    if (serverMsg.text) setServerMsg({ type: "", text: "" });

    // Validate on change
    setErrorMsg((prev) => ({
      ...prev,
      [name]: isFile ? ImageValidator(e) : TextValidator(e, data.password),
    }));
  };

  const postData = async (e) => {
    e.preventDefault();
    setServerMsg({ type: "", text: "" });

    // 1. Validator errors check
    if (Object.values(errorMsg).some((x) => x)) return;

    // 2. Password matching check
    if (data.password !== data.confirmPassword) {
      setErrorMsg((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    // 3. Mandatory files check
    const missing = fileFields.filter((f) => !files[f]);
    if (missing.length > 0) {
      setErrorMsg((prev) => {
        const next = { ...prev };
        missing.forEach((f) => (next[f] = "This document is required"));
        return next;
      });
      return;
    }

    // 4. Terms agreement
    if (!terms) {
      setServerMsg({
        type: "danger",
        text: "Please accept the Terms of Service & Privacy Policy.",
      });
      return;
    }

    // 5. FormData build
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      
        formData.append(key, data[key]);
      
    });

    fileFields.forEach((field) => {
      if (files[field]) {
        formData.append(field, files[field]);
      }
    });

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/v1/doctor/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setServerMsg({
          type: "success",
          text: "Registration submitted successfully! Your account will be activated once documents are verified.",
        });
        setData(initialData);
        setFiles({ profile: null, medicalCertificate: null, proof: null });
        setErrorMsg({});
        setTerms(false);
        e.target.reset();

        setTimeout(() => {
          navigate("/doctor/login");
        }, 2500);
      }
    } catch (err) {
      setServerMsg({
        type: "danger",
        text:
          err.response?.data?.message ||
          "Registration failed. Please check your inputs.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <div className="card shadow-sm border-0 rounded-4 p-4 p-md-5 bg-white">
            
            {/* Header */}
            <div className="text-center mb-4">
              <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill mb-2 fw-bold text-uppercase">
                Doctor Onboarding
              </span>
              <h2 className="fw-bold text-dark mb-1">Create Practitioner Account</h2>
              <p className="text-muted small">
                Submit your professional credentials for verification to start receiving appointments.
              </p>
            </div>

            {/* Server Alert Message */}
            {serverMsg.text && (
              <div
                className={`alert alert-${serverMsg.type} alert-dismissible fade show small`}
                role="alert"
              >
                {serverMsg.text}
              </div>
            )}

            <form onSubmit={postData} noValidate>
              
              {/* SECTION 1: Personal & Account */}
              <h6 className="fw-bold text-secondary text-uppercase mb-3 border-bottom pb-2">
                1. Personal & Account Information
              </h6>
              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      name="fullname"
                      id="fullname"
                      required
                      value={data.fullname}
                      onChange={onChangeHandle}
                      className={`form-control bg-light border-0 ${errorMsg.fullname ? "is-invalid" : ""}`}
                      placeholder="Dr. John Doe"
                    />
                    <label htmlFor="fullname">*Full Name (with Dr. prefix)</label>
                    <div className="invalid-feedback">{errorMsg.fullname}</div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="form-floating">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={data.email}
                      onChange={onChangeHandle}
                      className={`form-control bg-light border-0 ${errorMsg.email ? "is-invalid" : ""}`}
                      placeholder="doctor@example.com"
                    />
                    <label htmlFor="email">*Official Email</label>
                    <div className="invalid-feedback">{errorMsg.email}</div>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="form-floating">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      value={data.phone}
                      onChange={onChangeHandle}
                      className={`form-control bg-light border-0 ${errorMsg.phone ? "is-invalid" : ""}`}
                      placeholder="Phone"
                    />
                    <label htmlFor="phone">*Phone Number</label>
                    <div className="invalid-feedback">{errorMsg.phone}</div>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="form-floating position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      required
                      value={data.password}
                      onChange={onChangeHandle}
                      className={`form-control bg-light border-0 pe-5 ${errorMsg.password ? "is-invalid" : ""}`}
                      placeholder="Password"
                    />
                    <label htmlFor="password">*Password</label>
                    <button
                      type="button"
                      className="btn btn-sm btn-link position-absolute top-50 end-0 translate-middle-y me-2 text-muted text-decoration-none"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                    <div className="invalid-feedback">{errorMsg.password}</div>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="form-floating">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      required
                      value={data.confirmPassword}
                      onChange={onChangeHandle}
                      className={`form-control bg-light border-0 ${errorMsg.confirmPassword ? "is-invalid" : ""}`}
                      placeholder="Confirm Password"
                    />
                    <label htmlFor="confirmPassword">*Confirm Password</label>
                    <div className="invalid-feedback">{errorMsg.confirmPassword}</div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Professional Details */}
              <h6 className="fw-bold text-secondary text-uppercase mb-3 border-bottom pb-2">
                2. Practice & Credentials
              </h6>
              <div className="row g-3 mb-4">
                <div className="col-12 col-md-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      name="mrn"
                      id="mrn"
                      required
                      value={data.mrn}
                      onChange={onChangeHandle}
                      className={`form-control bg-light border-0 ${errorMsg.mrn ? "is-invalid" : ""}`}
                      placeholder="Registration Number"
                    />
                    <label htmlFor="mrn">*Medical Reg. Number (MRN)</label>
                    <div className="invalid-feedback">{errorMsg.mrn}</div>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="form-floating">
                    <select
                      name="specialization"
                      id="specialization"
                      required
                      value={data.specialization}
                      onChange={onChangeHandle}
                      className={`form-select bg-light border-0 ${errorMsg.specialization ? "is-invalid" : ""}`}
                    >
                      <option value="" disabled>Select Specialization</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="General Physician">General Physician</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Neurology">Neurology</option>
                    </select>
                    <label htmlFor="specialization">*Specialization</label>
                    <div className="invalid-feedback">{errorMsg.specialization}</div>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      name="qualification"
                      id="qualification"
                      required
                      value={data.qualification}
                      onChange={onChangeHandle}
                      className={`form-control bg-light border-0 ${errorMsg.qualification ? "is-invalid" : ""}`}
                      placeholder="e.g. MBBS, MD"
                    />
                    <label htmlFor="qualification">*Qualifications (e.g. MBBS, MD)</label>
                    <div className="invalid-feedback">{errorMsg.qualification}</div>
                  </div>
                </div>

                <div className="col-12 col-md-3">
                  <div className="form-floating">
                    <input
                      type="number"
                      name="yoe"
                      id="yoe"
                      min="0"
                      required
                      value={data.yoe}
                      onChange={onChangeHandle}
                      className={`form-control bg-light border-0 ${errorMsg.yoe ? "is-invalid" : ""}`}
                      placeholder="Years"
                    />
                    <label htmlFor="yoe">*Experience (Years)</label>
                    <div className="invalid-feedback">{errorMsg.yoe}</div>
                  </div>
                </div>

                <div className="col-12 col-md-3">
                  <div className="form-floating">
                    <input
                      type="number"
                      name="fees"
                      id="fees"
                      min="0"
                      required
                      value={data.fees}
                      onChange={onChangeHandle}
                      className={`form-control bg-light border-0 ${errorMsg.fees ? "is-invalid" : ""}`}
                      placeholder="Fee"
                    />
                    <label htmlFor="fees">*Consultation Fee (₹)</label>
                    <div className="invalid-feedback">{errorMsg.fees}</div>
                  </div>
                </div>

                <div className="col-12 col-md-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      name="hospitalName"
                      id="hospitalName"
                      required
                      value={data.hospitalName}
                      onChange={onChangeHandle}
                      className={`form-control bg-light border-0 ${errorMsg.hospitalName ? "is-invalid" : ""}`}
                      placeholder="Hospital"
                    />
                    <label htmlFor="hospitalName">*Hospital / Clinic Name</label>
                    <div className="invalid-feedback">{errorMsg.hospitalName}</div>
                  </div>
                </div>

                <div className="col-12 col-md-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      required
                      value={data.city}
                      onChange={onChangeHandle}
                      className={`form-control bg-light border-0 ${errorMsg.city ? "is-invalid" : ""}`}
                      placeholder="City"
                    />
                    <label htmlFor="city">*City</label>
                    <div className="invalid-feedback">{errorMsg.city}</div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Document Uploads */}
              <h6 className="fw-bold text-secondary text-uppercase mb-3 border-bottom pb-2">
                3. Mandatory Verification Documents (PNG, JPG, PDF)
              </h6>
              <div className="row g-3 mb-4">
                {/* Profile Photo */}
                <div className="col-12 col-md-4">
                  <div className="border rounded-3 p-3 bg-light text-start h-100">
                    <label htmlFor="profile" className="form-label fw-semibold small mb-1">
                      *Clear Profile Photo
                    </label>
                    <input
                      type="file"
                      name="profile"
                      id="profile"
                      accept=".jpg,.jpeg,.png"
                      onChange={onChangeHandle}
                      className={`form-control ${errorMsg.profile ? "is-invalid" : ""}`}
                    />
                    <div className="invalid-feedback">{errorMsg.profile}</div>
                    {files.profile && (
                      <small className="text-success d-block mt-1">
                        <i className="bi bi-check2-circle me-1"></i>
                        {files.profile.name}
                      </small>
                    )}
                  </div>
                </div>

                {/* Medical License */}
                <div className="col-12 col-md-4">
                  <div className="border rounded-3 p-3 bg-light text-start h-100">
                    <label htmlFor="medicalCertificate" className="form-label fw-semibold small mb-1">
                      *Medical Registration Certificate
                    </label>
                    <input
                      type="file"
                      name="medicalCertificate"
                      id="medicalCertificate"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={onChangeHandle}
                      className={`form-control ${errorMsg.medicalCertificate ? "is-invalid" : ""}`}
                    />
                    <div className="invalid-feedback">{errorMsg.medicalCertificate}</div>
                    {files.medicalCertificate && (
                      <small className="text-success d-block mt-1">
                        <i className="bi bi-check2-circle me-1"></i>
                        {files.medicalCertificate.name}
                      </small>
                    )}
                  </div>
                </div>

                {/* Identity Proof */}
                <div className="col-12 col-md-4">
                  <div className="border rounded-3 p-3 bg-light text-start h-100">
                    <label htmlFor="proof" className="form-label fw-semibold small mb-1">
                      *Government Identity Proof (PAN / Passport)
                    </label>
                    <input
                      type="file"
                      name="proof"
                      id="proof"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={onChangeHandle}
                      className={`form-control ${errorMsg.proof ? "is-invalid" : ""}`}
                    />
                    <div className="invalid-feedback">{errorMsg.proof}</div>
                    {files.proof && (
                      <small className="text-success d-block mt-1">
                        <i className="bi bi-check2-circle me-1"></i>
                        {files.proof.name}
                      </small>
                    )}
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="mb-4 text-start">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="terms"
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                  />
                  <label className="form-check-label small text-muted" htmlFor="terms">
                    I agree to the{" "}
                    <Link to="/terms" className="text-decoration-none">
                      Terms of Service
                    </Link>{" "}
                    and verify that all uploaded medical credentials are valid.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                className="btn btn-primary w-100 py-3 rounded-3 fw-semibold shadow-sm"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Uploading & Submitting Application...
                  </>
                ) : (
                  "Submit Registration for Review"
                )}
              </button>

              <div className="text-center mt-4">
                <p className="text-muted small mb-0">
                  Already registered as a Practitioner?{" "}
                  <Link
                    to="/doctor/login"
                    className="text-primary fw-semibold text-decoration-none"
                  >
                    Sign In
                  </Link>
                </p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};