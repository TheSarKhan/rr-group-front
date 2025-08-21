import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loginn from "@/assets/login.jpg";

export default function AdminProfile() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    e.preventDefault();
    navigate("/admin/reset-password");
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    navigate("/admin/reset-email");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F4F3FF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "1024px",
          maxWidth: "100%",
          borderRadius: "32px",
          overflow: "hidden",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        {/* Left side - Form */}
        <div
          style={{
            flex: 1,
            padding: "48px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              color: "#222",
              fontFamily: "Inter, sans-serif",
              fontSize: "40px",
              fontWeight: 700,
              marginBottom: "32px",
            }}
          >
            Salam Admin
          </h1>

          {/* Password section */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
            <input
              id="password"
              type="password"
              placeholder="Şifrənizi daxil edin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "12px",
                fontSize: "16px",
                width: "100%",
                borderRadius: "6px",
                border: "1px solid #ccc",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <button
              onClick={handlePasswordChange}
              style={{
                display: "flex",
                width: "178px",
                height: "68px",
                padding: "14px 49px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                borderRadius: "10px",
                background: "#444B73",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
              }}
            >
              Şifrəni deyişdir
            </button>
          </div>

          {/* Email section */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <input
              id="email"
              type="email"
              placeholder="Email daxil edin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "12px",
                fontSize: "16px",
                width: "100%",
                borderRadius: "6px",
                border: "1px solid #ccc",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <button
              onClick={handleEmailChange}
              style={{
                display: "flex",
                width: "178px",
                height: "68px",
                padding: "14px 49px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                borderRadius: "10px",
                background: "#444B73",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
              }}
            >
              Email-i deyişdir
            </button>
          </div>
        </div>

        {/* Right side - Image */}
        <div
          style={{
            flex: 1,
            minWidth: "300px",
            backgroundImage: `url(${Loginn})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
    </div>
  );
}
