// src/Components/HrPage.js
import React from "react";
import "./HrPage.css"; // Optional: make sure this file exists or delete the line

const HrPage = () => {
  return (
    <div className="employee-container">
      <h1>Welcome, HR!</h1>
      <p>This is your HR dashboard where you can:</p>
      <ul>
        <li>Manage employee records</li>
        <li>Review leave applications</li>
        <li>Access confidential documents</li>
        <li>Monitor attendance</li>
      </ul>
    </div>
  );
};

export default HrPage;
