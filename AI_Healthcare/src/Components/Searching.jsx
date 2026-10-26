import axios from "axios";
import { useState } from "react";

export const Searching = ({ setDoctors, setLoading, setHasSearched }) => {
  const [department, setDepartment] = useState("");
  const [keyword, setKeyword] = useState("");
  

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setHasSearched(true);

    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/user/search",
        {
          params: {
            department,
            keyword,
          },
        },
      );

      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Search failed. Kripya dobara try karein.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="container-fluid bg-primary my-5 py-5">
        <div className="container py-5">
          <div
            className="text-center mx-auto mb-5"
            style={{ maxWidth: "500px" }}
          >
            <h5 className="d-inline-block text-white text-uppercase border-bottom border-5">
              Find A Doctor
            </h5>
            <h1 className="display-4 mb-4">Find A Healthcare Professionals</h1>
            <h5 className="text-white fw-normal">
              Duo ipsum erat stet dolor sea ut nonumy tempor. Tempor duo lorem
              eos sit sed ipsum takimata ipsum sit est. Ipsum ea voluptua ipsum
              sit justo
            </h5>
          </div>
          <form onSubmit={handleSearch}>
            <div
              className="mx-auto"
              style={{ width: "100", maxWidth: "600px" }}
            >
              <div className="input-group">
                <select
                  className="form-select border-primary w-25"
                  style={{ height: "60px" }}
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="">All Departments</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="neurology">Neurology</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="dermatology">Dermatology</option>
                  <option value="general">General Physician</option>
                </select>
                <input
                  type="text"
                  className="form-control border-primary w-50"
                  placeholder="e.g. Raj, Gorakhpur, City Hospital..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button className="btn btn-dark border-0 w-25" type="submit">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
