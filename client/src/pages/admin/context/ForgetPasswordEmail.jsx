import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loginn from "@/assets/login.jpg";
import { sendVerificationCode } from "@/http/auth";

export default function ForgotPasswordEmail() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Email daxil edilməyib!");
      return;
    }

    try {
      // Call backend to send OTP code
      await sendVerificationCode(email);


      alert(`OTP kodu ${email} ünvanına göndərildi.`);

      // Navigate to OTP input page, passing email as query param
      navigate(`/forget-password/otp?email=${encodeURIComponent(email)}`);
    } catch (err) {
      alert("Email göndərilmədi, zəhmət olmasa yenidən cəhd edin.");
      console.error(err.response?.data || err);
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
          <p
            style={{
              color: "#7E8D9C",
              fontFamily: "Inter, sans-serif",
              fontSize: "24px",
              fontWeight: 400,
              margin: 0,
            }}
          >
            Şifrəni unutdum
          </p>
          <h1
            style={{
              color: "#222",
              fontFamily: "Inter, sans-serif",
              fontSize: "40px",
              fontWeight: 700,
              marginTop: "8px",
              marginBottom: "32px",
            }}
          >
            Email ünvanını daxil et
          </h1>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <label
              htmlFor="email"
              style={{
                color: "#7E8D9C",
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email daxil edin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              Davam et
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
