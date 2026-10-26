import { Link, NavLink } from "react-router-dom"


export const Navbar = () => {
  return (
    <>

    <div className="container-fluid py-2 border-bottom d-none d-lg-block">
        <div className="container">
            <div className="row">
                <div className="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
                    <div className="d-inline-flex align-items-center">
                        <Link className="text-decoration-none text-body pe-3" href="#!"><i
                                className="bi bi-telephone me-2"></i>+012
                            345 6789</Link>
                        <span className="text-body">|</span>
                        <Link className="text-decoration-none text-body px-3" href="#!"><i
                                className="bi bi-envelope me-2"></i>info@example.com</Link>
                    </div>
                </div>
                <div className="col-md-6 text-center text-lg-end">
                    <div className="d-inline-flex align-items-center">
                        <Link className="text-body px-2" href="#!">
                            <i className="fab fa-facebook-f"></i>
                        </Link>
                        <Link className="text-body px-2" href="#!">
                            <i className="fab fa-twitter"></i>
                        </Link>
                        <Link className="text-body px-2" href="#!">
                            <i className="fab fa-linkedin-in"></i>
                        </Link>
                        <Link className="text-body px-2" href="#!">
                            <i className="fab fa-instagram"></i>
                        </Link>
                        <Link className="text-body ps-2" href="#!">
                            <i className="fab fa-youtube"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* Top-end */}

    
    <div className="container-fluid sticky-top bg-white shadow-sm">
        <div className="container">
            <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">
                <Link to={"/"} className="navbar-brand">
                    <h1 className="m-0 text-uppercase text-primary"><i className="fa fa-clinic-medical me-2"></i>{import.meta.env.VITE_APP_SITE_NAME}</h1>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto py-0">
                        <NavLink to={"/"} className="nav-item nav-link">Home</NavLink>
                        <NavLink to={"/about"} className="nav-item nav-link">About</NavLink>
                        <NavLink to={"/services"} className="nav-item nav-link">Service</NavLink>
                        <NavLink to={"/pricing"} className="nav-item nav-link">Pricing</NavLink>
                        <div className="nav-item dropdown">
                            <NavLink to={"/pages"} className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</NavLink>
                            <div className="dropdown-menu m-0">
                                <NavLink to={"/blog"} className="dropdown-item">Blog Grid</NavLink>
                                <NavLink to={"/blog-details"} className="dropdown-item">Blog Detail</NavLink>
                                <NavLink to={"/team"} className="dropdown-item">The Team</NavLink>
                                <NavLink to={"testimonial"} className="dropdown-item">Testimonial</NavLink>
                                <NavLink to={"/appointment"} className="dropdown-item">Appointment</NavLink>
                                <NavLink to={"/search"} className="dropdown-item">Search</NavLink>
                            </div>
                        </div>
                        <NavLink to={"contactus"} className="nav-item nav-link">Contact</NavLink>
                    </div>
                </div>
            </nav>
        </div>
    </div>
    

    </>
  )
}


