import React from "react";
import "./ITPage.css";

const ITPage = ({ username }) => {
  return (
    <div className="IT-container">
      <h1>Welcome, {username}!</h1>
    </div>
  );
};

export default ITPage;
