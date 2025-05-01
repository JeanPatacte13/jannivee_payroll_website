import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user || (username === "admin" && password === "1234")) {
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some((u) => u.username === username);
    if (userExists) {
      setError("Username already exists");
      return;
    }

    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setError("Account created! You can now log in.");
    setIsSignup(false);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>{isSignup ? "Sign Up" : "Payroll System Login"}</h2>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="login-error">{error}</div>}
        {isSignup ? (
          <>
            <button onClick={handleSignup}>Sign Up</button>
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setIsSignup(false)}
                style={{ color: "blue", cursor: "pointer" }}
              >
                Login here
              </span>
            </p>
          </>
        ) : (
          <>
            <button onClick={handleLogin}>Login</button>
            <p>
              Don't have an account?{" "}
              <span
                onClick={() => setIsSignup(true)}
                style={{ color: "blue", cursor: "pointer" }}
              >
                Sign up here
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
