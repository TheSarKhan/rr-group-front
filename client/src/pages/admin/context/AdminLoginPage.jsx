 
import { useState } from "react";
import { login } from "@/http/auth";
import { setTokens } from "@/http/auth/token";
import { Link, useNavigate } from "react-router-dom";
import Loginn from "@/assets/login.jpg";
import "./Login.css";

const EyeIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M17.94 17.94A10.11 10.11 0 0112 19c-7 0-11-7-11-7a17.66 17.66 0 014.68-5.66" />
    <path d="M1 1l22 22" />
    <path d="M9.88 9.88a3 3 0 104.24 4.24" />
  </svg>
);

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Trying to login with:", form);

    try {
      const res = await login(form);
      console.log("Login response:", res.data);
      setTokens(res.data);
      navigate("/admin");
    } catch (err) {
      console.error("Login failed:", err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* Left side - Form */}
        <div className="login-left">
          <p>Xoş gəlmisən</p>
          <h1>Daxil ol</h1>

          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="username">İstifadəçi adı</label>
            <input
              id="username"
              placeholder="RRGroupAdmin"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />

            <label htmlFor="password" style={{ marginTop: "16px" }}>
              Şifrə
            </label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-button"
                aria-label={showPassword ? "Şifrəni gizlət" : "Şifrəni göstər"}
              >
                {showPassword ? (
                  <EyeOffIcon width={24} height={24} />
                ) : (
                  <EyeIcon width={24} height={24} />
                )}
              </button>
            </div>

            <Link to="/forget-password/email" className="forgot-link">
              Şifrəni unutmusan?
            </Link>
            <button type="submit" className="login-submit-button">
              Daxil ol
            </button>
          </form>
        </div>

        {/* Right side - Image */}
        <div
          className="login-right"
          style={{
            backgroundImage: `url(${Loginn})`,
          }}
        />
      </div>
    </div>
  );
}

