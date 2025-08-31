 
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loginn from "@/assets/login.jpg";
import { resetPassword } from "@/http/auth";
import {jwtDecode} from "jwt-decode";

export default function AdminResetPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userEmail, setUserEmail] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Zəhmət olmasa əvvəlcə daxil olun.");
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const email =
        decoded.email || decoded.sub || decoded.username || null;

      if (!email) {
        alert("Token daxilində email tapılmadı. Yenidən daxil olun.");
        navigate("/login");
        return;
      }

      setUserEmail(email);
    } catch {
      alert("Tokenı oxumaq mümkün olmadı, yenidən daxil olun.");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      alert("Yeni şifrə və təsdiq uyğun deyil!");
      return;
    }
  
    console.log({ oldPassword, newPassword, confirmPassword }); // Debug here
  
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Zəhmət olmasa əvvəlcə daxil olun.");
        navigate("/login");
        return;
      }
  
      const response = await resetPassword(
        { oldPassword, newPassword, confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      alert("Şifrə uğurla dəyişdirildi!");
      navigate("/admin/profile");
    } catch (err) {
      console.error("Reset error response:", err.response);
      alert(err.response?.data?.message || "Şifrəni dəyişmək mümkün olmadı");
    }
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
            Şifrəni yenilə
          </h1>

          <p
            style={{
              marginBottom: "24px",
              fontSize: "16px",
              color: "#555",
            }}
          >
            Hal-hazırda istifadə olunan email:{" "}
            <strong>{userEmail || "Yüklənir..."}</strong>
          </p>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <input
              type="password"
              placeholder="Köhnə şifrə"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              style={{
                padding: "12px",
                fontSize: "16px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <input
              type="password"
              placeholder="Yeni şifrə"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{
                padding: "12px",
                fontSize: "16px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <input
              type="password"
              placeholder="Şifrəni təsdiqlə"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{
                padding: "12px",
                fontSize: "16px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <button
              type="submit"
              style={{
                height: "54px",
                backgroundColor: "#222",
                color: "#fff",
                fontSize: "18px",
                fontWeight: "700",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                marginTop: "16px",
              }}
            >
              Şifrəni dəyiş
            </button>
          </form>
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
