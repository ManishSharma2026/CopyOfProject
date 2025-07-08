import React, { useState, useEffect } from "react";
import "./EmployeeDashboard.css";
import profileImg from "./images/peercoach.png";

const EmployeeDashboard = ({ user, handleLogout }) => {
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [employees, setEmployees] = useState([]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  useEffect(() => {
    fetch("http://localhost:5001/api/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  const renderSection = () => {
    if (!user) return <p>Loading user...</p>;

    const coworkers = employees.filter((emp) => emp.Email !== user.email);

    switch (currentSection) {
      case "dashboard":
        return (
          <div className="main-dashboard">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Your Info</h3>
                <p>
                  <strong>
                    {user.firstName} {user.lastName}
                  </strong>
                </p>
                <p>Role: {user.role}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Status: {user.status}</p>
                <p>Department: {user.department}</p>
                <p>Start Date: {user.startDate}</p>
              </div>

              <div className="stat-card">
                <h3>Team Members</h3>
                {coworkers.length === 0 ? (
                  <p>Loading coworkers...</p>
                ) : (
                  coworkers.map((emp) => (
                    <div key={emp.EmployeeID} className="stat-item">
                      <strong>
                        {emp.FirstName} {emp.LastName}
                      </strong>
                      <p>Email: {emp.Email}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="stat-card">
                <h3>Helpful Links</h3>
                <ul>
                  <li>Company Handbook</li>
                  <li>Policy Docs</li>
                  <li>Contact IT</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="main-dashboard">
            <h2>Profile</h2>
            <p>Username: {user.firstName}</p>
            <p>Department: {user.department}</p>
          </div>
        );

      default:
        return <h2>Welcome to your dashboard!</h2>;
    }
  };

  return (
    <div
      className={`dashboard-wrapper ${sidebarOpen ? "sidebar-open" : ""} ${
        darkMode ? "dark" : ""
      }`}
    >
      <header className="topbar horizontal-menu">
        <div className="left-controls">
          <button className="hamburger-button" onClick={toggleSidebar}>
            ☰
          </button>
          <div className="welcome-text">
            Welcome Back,{" "}
            {user?.firstName
              ? `${user.firstName} ${user.lastName || ""}`
              : "User"}
            !
          </div>
        </div>

        <input className="search-box" type="text" placeholder="Search..." />

        <div className="top-actions">
          <label className="switch">
            <input type="checkbox" onChange={toggleDarkMode} />
            <span className="slider round"></span>
          </label>
          <div className="profile-icon" onClick={toggleDropdown}>
            <img src={profileImg} alt="Profile" className="profile-img" />
          </div>
          {dropdownOpen && (
            <div className="dropdown-content">
              <p
                onClick={handleLogout}
                style={{ cursor: "pointer", color: "red" }}
              >
                Sign Out
              </p>
            </div>
          )}
        </div>
      </header>

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <ul>
          <li onClick={() => setCurrentSection("dashboard")}>Dashboard</li>
          <li onClick={() => setCurrentSection("profile")}>Profile</li>
        </ul>
      </aside>

      <main className="dashboard-content">{renderSection()}</main>
    </div>
  );
};

export default EmployeeDashboard;
