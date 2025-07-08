// ✅ src/Components/LoginPage.js
import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = ({ onLoginSuccess }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Login page");
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ identifier, password }),
      });
      const data = await response.json();
      if (data.success) {
        onLoginSuccess(data.user);
      } else {
        alert("Invalid login or password");
      }
    } catch (error) {
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="top-brand">NANO</div>
      <div className="login-container">
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Username or Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
