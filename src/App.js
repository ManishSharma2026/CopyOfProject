import React, { useState } from "react";
import "./App.css";
import EmployeeDashboard from "./Components/EmployeeDashboard";
import LoginPage from "./Components/LoginPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userObj) => {
    console.log("✅ Login successful:", userObj); // ✅ added this for debugging
    setUser(userObj);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setLoggedIn(false);
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <EmployeeDashboard user={user} handleLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
