import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const login = async () => {
    if (!form.username.trim() || !form.password.trim()) {
      alert("Username and password are required");
      return;
    }

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.detail || "Sign in failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-brand">Task Manager</div>

        <h2>Sign in</h2>
        <p className="subtitle">Manage your tasks efficiently</p>

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />

        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <span
            className="toggle-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
      </div>

        <button className="primary-btn" onClick={login}>
          Sign in
        </button>

        <div className="form-footer">
          Don’t have an account?
          <span onClick={() => navigate("/register")}> Sign up</span>
        </div>
      </div>
    </div>
  );
}

export default Login;