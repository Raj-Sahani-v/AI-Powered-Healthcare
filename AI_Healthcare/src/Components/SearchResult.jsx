import {Link} from 'react-router-dom'

export const SearchResult = ({ doctors, loading, hasSearched }) => {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted fw-semibold">
          Doctors khoje ja rahe hain...
        </p>
      </div>
    );
  }

  if (hasSearched && doctors.length === 0) {
    return (
      <div className="alert alert-warning text-center mt-3" role="alert">
        Aapke search criteria ke mutabiq koi doctor nahi mila.
      </div>
    );
  }
  
  return (
    <>
      <div class="container-fluid py-5">
        <div class="container">
          <div class="row g-5">
            {doctors.map((doc) => {
              return (
                <div class="col-lg-6 team-item" key={doc._id}>
                  <div class="row g-0 bg-light rounded overflow-hidden">
                    <div class="col-12 col-sm-5 h-100">
                      <img
                        class="img-fluid h-100"
                        src={`${doc.profile}`}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div class="col-12 col-sm-7 h-100 d-flex flex-column">
                      <div class="mt-auto p-4">
                        <h3>{doc.fullname}</h3>
                        <h6 class="fw-normal fst-italic text-primary mb-4">
                          {doc.specialization} Specialist
                        </h6>
                        <div className=" g-3">
                          <p className="small text-muted mb-1">
                            <strong>Qual:</strong> {doc.qualification} |{" "}
                            <strong>Exp:</strong> {doc.yoe} Yrs
                          </p>
                          <p className="small text-muted mb-1">
                            <strong>Hospital:</strong> {doc.hospitalName},{" "}
                            {doc.city}
                          </p>
                        </div>
                        <p className="small text-success fw-bold mb-0">
                          Fees: ₹{doc.fees}
                        </p>
                      </div>
                      <div class="d-flex mt-auto border-top p-4">
                        <Link
                          class="btn btn-lg btn-primary  me-3"
                          to={`/appointment/${doc._id}`}
                        >
                          {/* <i class="fab fa-twitter"></i> */}
                          Appointment
                        </Link>
                        <a
                          class="btn btn-lg btn-primary btn-lg-square rounded-circle me-3"
                          href="#!"
                        >
                          <i class="fab fa-facebook-f"></i>
                        </a>
                        <a
                          class="btn btn-lg btn-primary btn-lg-square rounded-circle"
                          href="#!"
                        >
                          <i class="fab fa-linkedin-in"></i>
                        </a>
                        
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
           
           
            <div class="col-12 text-center">
              <button class="btn btn-primary py-3 px-5">Load More</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
