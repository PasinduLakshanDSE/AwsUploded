import React from 'react';
import './auditNavBar.css';
import { Link, useNavigate } from 'react-router-dom';

const AuditNavBar = () => {
  const navigate = useNavigate();

  // Retrieve the logged-in user
  const user = JSON.parse(localStorage.getItem('currentUser'));

  // Handle logout functionality
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem('currentUser'); // Clear the logged-in user data from localStorage
      navigate('/'); // Redirect to the home page
    }
  };

  return (
    <div className="main">
      <div id="nav-bar">
        <input id="nav-toggle" type="checkbox" />
        <div id="nav-header">
          <a
            id="nav-title"
            href="https://www.vellaglobal.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Audit
          </a>
          <label htmlFor="nav-toggle" style={{ marginRight: '30px' }}>
            <span id="nav-toggle-burger"></span>
          </label>
          <hr />
        </div>
        <div id="nav-content">
          <div className="nav-button">
            <i className="fas fa-palette"></i>
            <Link to="/AuditDashBoard" className="nav-link">
              Dashboard
            </Link>
          </div>
          <div className="nav-button">
          <i className="fas fa-hourglass-half "></i>
            <Link to="/PendingAsset" className="nav-link">
              Pending Asset
            </Link>
          </div>
          <div className="nav-button">
          <i class="fas fa-trash"></i>
            <a href="/PendingDiscardItem" className="nav-link">
              Discard Asset
            </a>
          </div>
          <hr />
          {/*<div className="nav-button">
            <i className="fas fa-network-wired"></i>
            <a href="/category" className="nav-link">
              Asset Categorize
            </a>
          </div>
          <div className="nav-button">
            <i className="fas  fa-building"></i>
            <a href="/AssetDetails" className="nav-link">
              Asset Details
            </a>
          </div>
          <div className="nav-button">
            <i className="fas fa-user"></i>
            <a href="/Users" className="nav-link">
              Users
            </a>
          </div>
          <div className="nav-button">
            <i className="fas fa-file"></i>
            <a href="/GetReport" className="nav-link">
              Get Report
            </a>
          </div>*/}
          <hr />


          <hr />
          <div id="nav-content-highlight"></div>
        </div>
        <input id="nav-footer-toggle" type="checkbox" />
        <div id="nav-footer">
          <div id="nav-footer-heading">
            <div id="nav-footer-avatar">
              <img
                src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547"
                alt="Avatar"
              />
            </div>
            <div id="nav-footer-titlebox">
              {user ? (
                <>
                  <h5 style={{ fontSize: '16px', color: 'white' }}>
                    {user.username}
                  </h5>
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '16px',
                      backgroundColor: '#ff5c5c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      marginTop: '0px',
                      padding: '0px 0px',
                    }}
                  >
                    <i
                      className="fas fa-sign-out-alt"
                      style={{ marginRight: '8px' }}
                    ></i>

                  </button>
                </>
              ) : null}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditNavBar;
