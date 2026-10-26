// src/pages/UserProfilePage.jsx
import{ useState, useEffect } from "react";
import axios from "axios";
import { ProfileSidebar } from "../Components/ProfileSidebar";
import { PersonalInfoTab } from "../Components/PersonalInfoTab";
import { MedicalHistoryTab } from "../Components/MedicalHistoryTab";
import { AppointmentHistoryTab } from "../Components/AppointmentHistoryTab";


export const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  // Fetch Logged-in User Profile
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const token =
          localStorage.getItem("accessToken") ||
          sessionStorage.getItem("accessToken");

        const res = await axios.get("http://localhost:5000/api/v1/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        console.log(res)
        setUser(res?.data?.data);
      } catch (error) {
        console.error("Profile load error, using default mock:", error);
        // Fallback default state
        setUser({
          id: "USR654921",
          fullname: "Rahul Sharma",
          email: "rahul.sharma@example.com",
          phone: "+91 98765 43210",
          gender: "Male",
          dob: "1996-08-20",
          bloodGroup: "B+",
          address: "Sector 62, Noida, Uttar Pradesh",
          emergencyContact: "+91 99999 11111",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        });

        setAppointments([
          {
            id: "APT-881",
            doctorName: "Dr. Alok Verma",
            specialization: "Cardiology",
            date: "2026-11-04",
            time: "10:30 AM",
            type: "Online Video",
            status: "Confirmed",
          },
          {
            id: "APT-840",
            doctorName: "Dr. Shalini Mehta",
            specialization: "Dermatology",
            date: "2026-09-18",
            time: "03:00 PM",
            type: "In-Clinic",
            status: "Completed",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleProfileUpdate = async (updatedFields) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch("http://localhost:5000/api/v1/user/profile", updatedFields, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setUser((prev) => ({ ...prev, ...updatedFields }));
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Error saving profile changes.");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 py-4 py-lg-5">
      <div className="container">
        <div className="row g-4">
          {/* Left Column: Sidebar Profile Card */}
          <div className="col-12 col-lg-4 col-xl-3">
            <ProfileSidebar
              user={user}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          {/* Right Column: Tab Content */}
          <div className="col-12 col-lg-8 col-xl-9">
            {activeTab === "personal" && (
              <PersonalInfoTab user={user} onUpdate={handleProfileUpdate} />
            )}
            {activeTab === "medical" && <MedicalHistoryTab />}
            {activeTab === "appointments" && (
              <AppointmentHistoryTab appointments={appointments} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};