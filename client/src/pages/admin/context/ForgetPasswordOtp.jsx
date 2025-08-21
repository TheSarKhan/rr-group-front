import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loginn from "@/assets/login.jpg";
import { verify } from "@/http/auth";

export default function ForgotPasswordOTP() {
  const [otp, setOtp] = useState(new Array(6).fill("")); // 6 digits
  const [params] = useSearchParams();
  const email = params.get("email");
  const navigate = useNavigate();

  const inputsRef = useRef([]);

  // Timer state - 2 minutes countdown (120 seconds)
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleChange = (element, index) => {
    if (!/^\d*$/.test(element.value)) return; // only digits allowed

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // focus next input
    if (element.value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const otpCode = otp.join("");
    if (otpCode.length < 6 || otp.some((d) => d === "")) {
      alert("Zəhmət olmasa 6 rəqəmli OTP kodunu daxil edin!");
      return;
    }
  
    if (!email) {
      alert("Email tapılmadı, zəhmət olmasa yenidən başlayın.");
      navigate("/forget-password/email");
      return;
    }
  
    const payload = {
      email: email.trim().toLowerCase(),
      verificationCode: otpCode.trim(),
    };
  
    console.log("Sending verify request:", payload);
  
    try {
      await verify(payload);
      alert("OTP təsdiqləndi!");
      // navigate(`/forget-password?username=${encodeURIComponent(email)}`);
      navigate(`/forget-password?email=${encodeURIComponent(email)}`);

    } catch (err) {
      console.error("Verify error:", err.response?.data || err);
      const message =
        err.response?.data?.message ||
        "OTP təsdiqlənmədi, zəhmət olmasa yenidən cəhd edin.";
      alert(message);
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
            alignItems: "center",
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
            OTP kodunu daxil et
          </h1>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center" }}
          >
            <div style={{ display: "flex", gap: "12px" }}>
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  name="otp"
                  maxLength={1}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputsRef.current[index] = el)}
                  style={{
                    width: "48px",
                    height: "48px",
                    fontSize: "24px",
                    fontWeight: "700",
                    textAlign: "center",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    outline: "none",
                    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                  }}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                color: timeLeft === 0 ? "red" : "#7E8D9C",
                marginTop: "8px",
              }}
            >
              {timeLeft === 0
                ? "OTP müddəti bitdi. Yenidən göndər."
                : `Müddət: ${formatTime(timeLeft)}`}
            </div>

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
                minWidth: "200px",
              }}
              disabled={timeLeft === 0}
            >
              Təsdiqlə
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
