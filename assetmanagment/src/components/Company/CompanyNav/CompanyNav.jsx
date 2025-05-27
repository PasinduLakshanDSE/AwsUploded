import React from 'react';
import './companynav.css';
import { Link, useNavigate } from 'react-router-dom';

const CompanyNavBar = () => {
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
           className='navhead'
            href="https://www.vellaglobal.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Company Admin
          </a>
          
          <hr />
        </div>
        <div id="nav-content">
          <div className="nav-button">
            <i className="fas fa-palette"></i>
            <Link to="/CompanyDashBord" className="nav-link">
              Dashboard
            </Link>
          </div>
          <div className="nav-button">
          <i className="fas fa-handshake "></i>
            <Link to="/companyUserRole" className="nav-link">
              Add Users Role
            </Link>
          </div>
          <div className="nav-button">
            <i className="fas   fa-pen-to-square"></i>
            <a href="/ComapnyAssetRegister" className="nav-link">
              Asset Registration
            </a>
          </div>
          <hr />
          {/*<div className="nav-button">
            <i className="fas fa-network-wired"></i>
            <a href="/ComapnyassetCatergorization" className="nav-link">
            Asset Categorize
            </a>
          </div>*/}
          <div className="nav-button">
            <i className="fas  fa-building"></i>
            <a href="/Comasset" className="nav-link">
            Asset Details
            </a>
          </div>
          <div className="nav-button">
            <i className="fas fa-user"></i>
            <a href="/CompanyUsers" className="nav-link">
              Users
            </a>
          </div>
          <hr/>
         

          <hr/>
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

export default CompanyNavBar;
