import { useContext } from "react";
import { DoctorsData } from "../ContextApi/ContextApiData";
import { Link } from "react-router-dom";
const statusColor = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
  suspended: "secondary",
};

export const UserTable = () => {
  const { allDoctorsData } = useContext(DoctorsData);
  return (
    <section className="panel mt-3">
      <div className="panel-header">
        <div>
          <h2 className="h5 mb-1 section-title">
            <i className="bi bi-table" aria-hidden="true"></i>
            <span>User List</span>
          </h2>
          <p className="text-muted mb-0">
            Search, review, and manage team member accounts.
          </p>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <input
            className="form-control form-control-sm table-search"
            type="search"
            placeholder="Search users"
            data-table-search="usersTable"
            aria-label="Search users"
          />
          <a className="btn btn-primary btn-sm" href="add-user.html">
            <i className="bi bi-person-plus" aria-hidden="true"></i> Add User
          </a>
        </div>
      </div>
      <div className="table-responsive">
        <table
          className="table align-middle mb-0"
          id="usersTable"
          data-searchable-table
        >
          <thead>
            <tr>
              <th scope="col">User</th>
              <th scope="col">Specilization</th>
              <th scope="col">Hospital</th>
              <th scope="col">city</th>
              <th scope="col">YOE</th>
              <th scope="col">Fees</th>
              <th scope="col">Status</th>
              <th scope="col" className="text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {allDoctorsData?.map((data, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        className="avatar-img avatar-sm"
                        src={`${data.profile}`}
                        alt="Sarah Ahmed"
                      />
                      <div>
                        <p className="fw-semibold mb-0">{data.fullname}</p>
                        <p className="text-muted small mb-0">
                          <a
                            href="/cdn-cgi/l/email-protection"
                            className="__cf_email__"
                            data-cfemail="f08391829198b09588919d809c95de939f9d"
                          >
                            {data.email}
                          </a>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>{data.specialization}</td>
                  <td>{data.hospitalName}</td>
                  <td>{data.city}</td>
                  <td>{data.yoe}</td>
                  <td>{data.fees}</td>
                  <td>
                    <span className={`badge text-bg-${statusColor[data.status]}`}>{data.status}</span>
                  </td>
                  <td className="text-end">
                    <Link
                      className="btn btn-light btn-sm"
                      to={`${data._id}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mt-3">
        <p className="text-muted small mb-0">Showing 1 to 5 of 124 users</p>
        <nav aria-label="Users pagination">
          <ul className="pagination pagination-sm mb-0">
            <li className="page-item disabled">
              <a className="page-link" href="#">
                Previous
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};
