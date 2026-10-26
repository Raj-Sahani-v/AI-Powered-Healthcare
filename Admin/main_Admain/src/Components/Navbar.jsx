import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <>
    
     <aside className="admin-sidebar" id="adminSidebar" aria-label="Main navigation">
      <div className="sidebar-header">
        <Link className="brand-mark" to="/" aria-label="adminHMD dashboard">
          <span className="brand-icon"><i className="bi bi-grid-1x2-fill" aria-hidden="true"></i></span>
          <span className="brand-copy">
            <span className="brand-title">Admin</span>
            <span className="brand-subtitle"></span>
          </span>
        </Link>
      </div>

      <nav className="sidebar-nav">
        <Link className="nav-link active" to='/' aria-current="page">
          <span className="nav-icon"><i className="bi bi-speedometer2" aria-hidden="true"></i></span>
          <span className="nav-text">Dashboard</span>
        </Link>
        <Link className="nav-link" to={"/users"}>
          <span className="nav-icon"><i className="bi bi-people" aria-hidden="true"></i></span>
          <span className="nav-text">Users</span>
        </Link>
        <a className="nav-link" href="add-user.html">
          <span className="nav-icon"><i className="bi bi-person-plus" aria-hidden="true"></i></span>
          <span className="nav-text">Add User</span>
        </a>
        <a className="nav-link" href="profile.html">
          <span className="nav-icon"><i className="bi bi-person-badge" aria-hidden="true"></i></span>
          <span className="nav-text">Profile</span>
        </a>
        <a className="nav-link" href="charts.html">
          <span className="nav-icon"><i className="bi bi-bar-chart-line" aria-hidden="true"></i></span>
          <span className="nav-text">Charts</span>
        </a>
        <a className="nav-link" href="tables.html">
          <span className="nav-icon"><i className="bi bi-table" aria-hidden="true"></i></span>
          <span className="nav-text">Tables</span>
        </a>
        <a className="nav-link" href="forms.html">
          <span className="nav-icon"><i className="bi bi-ui-checks-grid" aria-hidden="true"></i></span>
          <span className="nav-text">Forms</span>
        </a>
        <a className="nav-link" href="components.html">
          <span className="nav-icon"><i className="bi bi-grid-3x3-gap" aria-hidden="true"></i></span>
          <span className="nav-text">Components</span>
        </a>
        <a className="nav-link" href="alerts.html">
          <span className="nav-icon"><i className="bi bi-exclamation-triangle" aria-hidden="true"></i></span>
          <span className="nav-text">Alerts</span>
        </a>
        <a className="nav-link" href="modals.html">
          <span className="nav-icon"><i className="bi bi-window-stack" aria-hidden="true"></i></span>
          <span className="nav-text">Modals</span>
        </a>
        <a className="nav-link" href="settings.html">
          <span className="nav-icon"><i className="bi bi-gear" aria-hidden="true"></i></span>
          <span className="nav-text">Settings</span>
        </a>
        <a className="nav-link" href="blank.html">
          <span className="nav-icon"><i className="bi bi-file-earmark" aria-hidden="true"></i></span>
          <span className="nav-text">Blank Page</span>
        </a>
      </nav>

      <div className="sidebar-user">
        <img className="avatar-img avatar-md sidebar-user-avatar" src="../assets/images/avatar/avatar.jpg" alt="Admin Hasan"/>
        <strong>Admin Hasan</strong>
        <small>Active Workspace</small>
      </div>

      <div className="sidebar-footer">
        <span className="status-dot"></span>
        <span className="sidebar-footer-text">System running smoothly</span>
      </div>
    </aside>

    </>
  )
}
