
export const TextValidator = (e, password="") => {
  const { name, value } = e.target;
  console.log(password)

  switch (name) {
    case "fullname":
      if (!value.trim()) {
        return "Fullname is mandatory";
      }
      if (value.length < 3 || value.length > 100) {
        return "Fullname must be 3-100 characters";
      }
      return "";

    case "email":{
      if (!value.trim()) {
        return "Email is mandatory";
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(value)) {
        return "Invalid email address";
      }
      return "";
    }
    case "phone":
      if (!value.trim()) {
        return "Phone number is mandatory";
      }

      if (!/^\d{10}$/.test(value)) {
        return "Phone number must be 10 digits";
      }
      return "";

    case "password":
      if (!value) {
        return "Password is mandatory";
      }

      if (value.length < 8) {
        return "Password must be at least 8 characters";
      }

      if (!/[A-Z]/.test(value)) {
        return "Password must contain at least one uppercase letter";
      }

      if (!/[a-z]/.test(value)) {
        return "Password must contain at least one lowercase letter";
      }

      if (!/[0-9]/.test(value)) {
        return "Password must contain at least one number";
      }

      if (!/[^A-Za-z0-9]/.test(value)) {
        return "Password must contain at least one special character";
      }

      return "";

    case "confirmPassword":
      if (!value) {
        return "Confirm Password is mandatory";
      }

      if (value !== password) {
        return "Passwords do not match";
      }

      return "";

    case "mrn":
      if (!value.trim()) {
        return "Medical Registration Number is mandatory";
      }
      return "";

    case "city":
      if (!value.trim()) {
        return "City is mandatory";
      }
      return "";

    case "hospitalName":
      if (!value.trim()) {
        return "Hospital Name is mandatory";
      }
      return "";
    
      case "yoe":
      if (!value.trim()) {
        return "Year of experience is mandatory";
      }
      return "";

    case "qualification":
      if (!value.trim()) {
        return "Qualification is mandatory";
      }
      return "";

    default:
      return "";
  }
};

