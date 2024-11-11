import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/navbar.css"

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigate = useNavigate(); 
  return (
    <>
    <div className="container">
      {/* Navbar */}
      <header className="d-flex justify-content-between align-items-center py-2 mb-4 border-bottom ">
        <div className="profile-pic d-flex align-items-center">
          <img
            src="Logo.svg"
            alt="no image"
            className="me-2 rounded-circle"
            style={{ width: '7rem', height: '7rem' }}
          />
          <h3 className="m-0" >SECBOOK</h3>
        </div>
  
        {/* Sidebar Toggle Button (for mobile view) */}
        <button
          className="btn btn-primary d-lg-none"
          type="button"
          onClick={toggleSidebar}
        >
          ☰
        </button>
  
        {/* Regular Nav Menu for Large Screens */}
        <nav className="d-none d-lg-flex align-items-center">
          <ul className="nav me-4">
            <li className="nav-item">
              <a onClick={() => navigate('/')} className="nav-link">Home</a>
            </li>
            <li className="nav-item">
              <a onClick={() => navigate('/category')} className="nav-link">Categories</a>
            </li>
            <li className="nav-item">
              <a onClick={() => navigate('/createpage')} className="nav-link">Create</a>
            </li>
            <li className="nav-item">
              <a onClick={() => navigate('/about')} className="nav-link">About Us</a>
            </li>
          </ul>
  
          <div className="dark-light-toggle">
            <button onClick={toggleDarkMode} className="btn btn-secondary">
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </nav>
      </header>
  
      {/* Sidebar (for small screens) */}
      <div
        className={`offcanvas offcanvas-start ${isSidebarOpen ? 'show' : ''}`}
        tabIndex="-1"
        id="offcanvasSidebar"
        style={{ visibility: isSidebarOpen ? 'visible' : 'hidden' }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button type="button" className="btn-close" onClick={toggleSidebar}></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column mb-3">
            <li className="nav-item">
              <a
                onClick={() => {
                  navigate('/');
                  toggleSidebar();
                }}
                className="nav-link"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                onClick={() => {
                  navigate('/category');
                  toggleSidebar();
                }}
                className="nav-link"
              >
                Categories
              </a>
            </li>
            <li className="nav-item">
              <a
                onClick={() => {
                  navigate('/createpage');
                  toggleSidebar();
                }}
                className="nav-link"
              >
                Create
              </a>
            </li>
            <li className="nav-item">
              <a
                onClick={() => {
                  navigate('/about');
                  toggleSidebar();
                }}
                className="nav-link"
              >
                About Us
              </a>
            </li>
          </ul>
  
          {/* Dark/Light Mode Toggle in Sidebar */}
          <div className="dark-light-toggle">
            <button
              onClick={() => {
                toggleDarkMode();
                toggleSidebar();
              }}
              className="btn btn-secondary"
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
    );
};

export default Navbar;

