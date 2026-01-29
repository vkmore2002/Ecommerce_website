import React from "react";
import { userLogin } from "../../api/apis.js";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const userData = { email: email, password: password };
    const response = await userLogin(userData);
    console.log("Login response:", response);
  };
  return (
    <div>
      <h1>Login Page</h1>
      <section>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
      </section>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default LoginPage;
