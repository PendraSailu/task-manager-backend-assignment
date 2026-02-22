import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    if (!form.username.trim() || !form.password.trim()) {
      alert("Username and password are required");
      return;
    }

    try {
      await API.post("/auth/register", form);
      alert("Account created successfully");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.detail || "Sign up failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-brand">Task Manager</div>

        <h2>Create account</h2>
        <p className="subtitle">Start organizing your tasks</p>

        <div className="input-group">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
        </div>

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

        <button className="primary-btn" onClick={register}>
          Sign up
        </button>

        <div className="form-footer">
          Already have an account?
          <span onClick={() => navigate("/")}> Sign in</span>
        </div>
      </div>
    </div>
  );
}

export default Register;