
// import { useMemo, useState } from "react";
// // import "bootstrap/dist/css/bootstrap.min.css";

// // Apne Python model ke actual symptom feature names yahan rakhein.

// export function Symptom() {
//   const [SYMPTOMS, setSYMPTOMS] = useState([]);
//   const [symptomsLoading, setSymptomsLoading] = useState(true);

//   const [search, setSearch] = useState("");
//   const [selected, setSelected] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const loadSymptoms = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:5000/api/symptoms"
//         );

//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data.error || "Symptoms load nahi hue.");
//         }

//         if (!Array.isArray(data.symptoms)) {
//           throw new Error("API se valid symptom list nahi mili.");
//         }

//         setSYMPTOMS([...new Set(data.symptoms)]);
//       } catch (err) {
//         setError(err.message || "Symptoms load nahi ho paaye.");
//       } finally {
//         setSymptomsLoading(false);
//       }
//     };

//     loadSymptoms();
//   }, []);

//   // Aapka baaki existing code yahan rahega...
// }

// export function Symptomm() {
//   const [search, setSearch] = useState("");
//   const [selected, setSelected] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   const filteredSymptoms = useMemo(() => {
//     const query = search.trim().toLowerCase().replaceAll("_", " ");

//     return SYMPTOMS.filter((symptom) =>
//       symptom.replaceAll("_", " ").toLowerCase().includes(query)
//     );
//   }, [search]);

//   const formatSymptom = (symptom) =>
//     symptom.replaceAll("_", " ");

//   const toggleSymptom = (symptom) => {
//     setSelected((previous) =>
//       previous.includes(symptom)
//         ? previous.filter((item) => item !== symptom)
//         : [...previous, symptom]
//     );

//     setResult(null);
//     setError("");
//   };

//   const predictDisease = async (event) => {
//     event.preventDefault();
//     console.log(selected);
//     console.log(search)

//     if (selected.length === 0) {
//       setError("Please select at least one symptom.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setResult(null);

//     try {
//       const response = await fetch("http://localhost:5000/api/v1/user/symptom", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ symptoms: selected }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Prediction failed.");
//       }

//       setResult(data);
//     } catch (err) {
//       setError(err.message || "Unable to connect to the server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container py-4">
//       <div
//         className="card shadow-sm border-0 mx-auto"
//         style={{ maxWidth: "850px" }}
//       >
//         <div className="card-body p-3 p-md-4">
//           <h2 className="mb-2">Disease Prediction</h2>
//           <p className="text-secondary mb-4">
//             Search symptoms or select them using checkboxes.
//           </p>

//           <form onSubmit={predictDisease}>
//             {/* Search input */}
//             <label htmlFor="symptomSearch" className="form-label fw-semibold">
//               Search Symptoms
//             </label>

//             <input
//               id="symptomSearch"
//               type="text"
//               className="form-control mb-3"
//               placeholder="Type a symptom, e.g. skin rash"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />

//             {/* Clickable search results */}
//             {search.trim() !== "" && (
//               <div className="border rounded p-3 mb-4">
//                 <h6 className="text-secondary mb-3">Search Results</h6>

//                 {filteredSymptoms.length > 0 ? (
//                   <div className="d-flex flex-wrap gap-2">
//                     {filteredSymptoms.map((symptom) => (
//                       <button
//                         key={symptom}
//                         type="button"
//                         className={`btn btn-sm ${
//                           selected.includes(symptom)
//                             ? "btn-primary"
//                             : "btn-outline-primary"
//                         }`}
//                         onClick={() => toggleSymptom(symptom)}
//                       >
//                         {selected.includes(symptom) ? "✓ " : "+ "}
//                         {formatSymptom(symptom)}
//                       </button>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-secondary mb-0">
//                     No matching symptoms found.
//                   </p>
//                 )}
//               </div>
//             )}

//             {/* Checkbox list */}
//             <label className="form-label fw-semibold">
//               Select Symptoms
//             </label>

//             <div
//               className="border rounded p-3 mb-4"
//               style={{ maxHeight: "260px", overflowY: "auto" }}
//             >
//               <div className="row">
//                 {SYMPTOMS.map((symptom) => (
//                   <div className="col-12 col-md-6 mb-2" key={symptom}>
//                     <div className="form-check">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         id={`symptom-${symptom}`}
//                         checked={selected.includes(symptom)}
//                         onChange={() => toggleSymptom(symptom)}
//                       />

//                       <label
//                         className="form-check-label text-capitalize"
//                         htmlFor={`symptom-${symptom}`}
//                       >
//                         {formatSymptom(symptom)}
//                       </label>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Selected symptoms */}
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <h5 className="mb-0">
//                 Selected Symptoms
//                 <span className="badge text-bg-primary ms-2">
//                   {selected.length}
//                 </span>
//               </h5>

//               <button
//                 type="button"
//                 className="btn btn-sm btn-outline-danger"
//                 disabled={selected.length === 0}
//                 onClick={() => {
//                   setSelected([]);
//                   setResult(null);
//                   setError("");
//                 }}
//               >
//                 Clear All
//               </button>
//             </div>

//             <div className="d-flex flex-wrap gap-2 mb-4">
//               {selected.length > 0 ? (
//                 selected.map((symptom) => (
//                   <span
//                     key={symptom}
//                     className="badge rounded-pill text-bg-light border text-dark p-2"
//                   >
//                     {formatSymptom(symptom)}

//                     <button
//                       type="button"
//                       className="btn-close ms-2"
//                       style={{ fontSize: "9px" }}
//                       aria-label={`Remove ${formatSymptom(symptom)}`}
//                       onClick={() => toggleSymptom(symptom)}
//                     />
//                   </span>
//                 ))
//               ) : (
//                 <p className="text-secondary mb-0">
//                   No symptoms selected yet.
//                 </p>
//               )}
//             </div>

//             {/* Predict button */}
//             <button
//               type="submit"
//               className="btn btn-primary w-100"
//               disabled={loading || selected.length === 0}
//             >
//               {loading ? (
//                 <>
//                   <span className="spinner-border spinner-border-sm me-2" />
//                   Predicting...
//                 </>
//               ) : (
//                 "Predict Disease"
//               )}
//             </button>
//           </form>

//           {/* Error message */}
//           {error && (
//             <div className="alert alert-danger mt-4 mb-0" role="alert">
//               {error}
//             </div>
//           )}

//           {/* Prediction result */}
//           {result && (
//             <div className="alert alert-success mt-4 mb-0">
//               <h5 className="alert-heading">Prediction Result</h5>

//               <p className="mb-2">
//                 Predicted disease:{" "}
//                 <strong>
//                   {result.prediction || result.disease || "Not available"}
//                 </strong>
//               </p>

//               {result.confidence != null && (
//                 <p className="mb-0">
//                   Model score: <strong>{result.confidence}%</strong>
//                 </p>
//               )}

//               <hr />

//               <small>
//                 This is a machine-learning prediction, not a medical diagnosis.
//               </small>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useMemo, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

export function Symptom() {
  const [SYMPTOMS, setSYMPTOMS] = useState([]);
  const [symptomsLoading, setSymptomsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Load symptoms from Node.js API
  useEffect(() => {
    const loadSymptoms = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/user/symptoms"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Symptoms load nahi ho paaye."
          );
        }

        if (!Array.isArray(data.symptoms)) {
          throw new Error("Invalid symptom list received.");
        }

        // Remove duplicate entries
        const cleanSymptoms = [
          ...new Set(data.symptoms),
        ];

        setSYMPTOMS(cleanSymptoms);
      } catch (err) {
        setError(
          err.message || "Server se connect nahi ho paaya."
        );
      } finally {
        setSymptomsLoading(false);
      }
    };

    loadSymptoms();
  }, []);

  // Search symptoms
  const filteredSymptoms = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase()
      .replaceAll("_", " ");

    return SYMPTOMS.filter((symptom) =>
      symptom
        .replaceAll("_", " ")
        .toLowerCase()
        .includes(query)
    );
  }, [search, SYMPTOMS]);

  // Format symptom name for display
  const formatSymptom = (symptom) =>
    symptom.replaceAll("_", " ");

  // Select or remove a symptom
  const toggleSymptom = (symptom) => {
    setSelected((previous) =>
      previous.includes(symptom)
        ? previous.filter((item) => item !== symptom)
        : [...previous, symptom]
    );

    setResult(null);
    setError("");
  };

  // Send selected symptoms for prediction
  const predictDisease = async (event) => {
    event.preventDefault();

    if (selected.length === 0) {
      setError("Please select at least one symptom.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/user/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            symptoms: selected,
          }),
        }
      );

      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        throw new Error(
          data.error || "Prediction failed."
        );
      }

      setResult(data);
      
    } catch (err) {
      setError(
        err.message || "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  console.log(result?.data?.predicted_disease
)
  // Clear selected symptoms
  const clearAll = () => {
    setSelected([]);
    setResult(null);
    setError("");
  };

  return (
    <div className="container py-4">
      <div
        className="card shadow-sm border-0 mx-auto"
        style={{ maxWidth: "850px" }}
      >
        <div className="card-body p-3 p-md-4">
          <h2 className="mb-2">Disease Prediction</h2>

          <p className="text-secondary mb-4">
            Search symptoms or select them using checkboxes.
          </p>

          {/* Search and selection form */}
          <form onSubmit={predictDisease}>
            <label
              htmlFor="symptomSearch"
              className="form-label fw-semibold"
            >
              Search Symptoms
            </label>

            <input
              id="symptomSearch"
              type="text"
              className="form-control mb-3"
              placeholder="Type a symptom, e.g. skin rash"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Loading symptoms */}
            {symptomsLoading && (
              <div className="text-secondary mb-3">
                Loading symptoms...
              </div>
            )}

            {/* Search results */}
            {!symptomsLoading && search.trim() !== "" && (
              <div className="border rounded p-3 mb-4">
                <h6 className="text-secondary mb-3">
                  Search Results
                </h6>

                {filteredSymptoms.length > 0 ? (
                  <div className="d-flex flex-wrap gap-2">
                    {filteredSymptoms.map((symptom) => (
                      <button
                        key={symptom}
                        type="button"
                        className={`btn btn-sm ${
                          selected.includes(symptom)
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        onClick={() =>
                          toggleSymptom(symptom)
                        }
                      >
                        {selected.includes(symptom)
                          ? "✓ "
                          : "+ "}
                        {formatSymptom(symptom)}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-secondary mb-0">
                    No matching symptoms found.
                  </p>
                )}
              </div>
            )}

            {/* Checkbox list */}
            <label className="form-label fw-semibold">
              Select Symptoms
            </label>

            <div
              className="border rounded p-3 mb-4"
              style={{
                maxHeight: "260px",
                overflowY: "auto",
              }}
            >
              {symptomsLoading ? (
                <p className="text-secondary mb-0">
                  Please wait...
                </p>
              ) : SYMPTOMS.length > 0 ? (
                <div className="row">
                  {SYMPTOMS.map((symptom) => (
                    <div
                      className="col-12 col-md-6 mb-2"
                      key={symptom}
                    >
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`symptom-${symptom}`}
                          checked={selected.includes(symptom)}
                          onChange={() =>
                            toggleSymptom(symptom)
                          }
                        />

                        <label
                          className="form-check-label text-capitalize"
                          htmlFor={`symptom-${symptom}`}
                        >
                          {formatSymptom(symptom)}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-danger mb-0">
                  Symptoms list unavailable. Please check
                  that your Node.js and Python servers are running.
                </p>
              )}
            </div>

            {/* Selected symptoms heading */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">
                Selected Symptoms
                <span className="badge text-bg-primary ms-2">
                  {selected.length}
                </span>
              </h5>

              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                disabled={selected.length === 0}
                onClick={clearAll}
              >
                Clear All
              </button>
            </div>

            {/* Selected symptom chips */}
            <div className="d-flex flex-wrap gap-2 mb-4">
              {selected.length > 0 ? (
                selected.map((symptom) => (
                  <span
                    key={symptom}
                    className="badge rounded-pill text-bg-light border text-dark p-2"
                  >
                    {formatSymptom(symptom)}

                    <button
                      type="button"
                      className="btn-close ms-2"
                      style={{ fontSize: "9px" }}
                      aria-label={`Remove ${formatSymptom(
                        symptom
                      )}`}
                      onClick={() =>
                        toggleSymptom(symptom)
                      }
                    />
                  </span>
                ))
              ) : (
                <p className="text-secondary mb-0">
                  No symptoms selected yet.
                </p>
              )}
            </div>

            {/* Predict button */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={
                loading ||
                symptomsLoading ||
                SYMPTOMS.length === 0 ||
                selected.length === 0
              }
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Predicting...
                </>
              ) : (
                "Predict Disease"
              )}
            </button>
          </form>

          {/* Error message */}
          {error && (
            <div
              className="alert alert-danger mt-4 mb-0"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* Prediction result */}
          {result && (
            <div className="alert alert-success mt-4 mb-0">
              <h5 className="alert-heading">
                Prediction Result
              </h5>

              <p className="mb-2">
                Predicted disease:{" "}
                <strong>
                  {result.prediction ||
                    result.disease ||
                    result.data.predicted_disease ||
                    "Not available"}
                </strong>
              </p>

              {result.confidence != null && (
                <p className="mb-0">
                  Model score:{" "}
                  <strong>{result.confidence}%</strong>
                </p>
              )}

              <hr />

              <small>
                This is a machine-learning prediction,
                not a medical diagnosis.
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
