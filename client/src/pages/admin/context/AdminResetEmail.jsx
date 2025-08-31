import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Tokenləri silmək üçün funksiya
const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// Backend API çağırışı
const updateEmail = async (token, newEmail) => {
  return axios.put(
    "http://localhost:8080/api/v1/auth/reset/email", // Backend URL
    null,
    {
      params: { param: newEmail },
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export default function UpdateEmailForm() {
  const [newEmail, setNewEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("No access token found");

      await updateEmail(accessToken, newEmail);

      setStatus("Email updated successfully! You will be logged out now.");
      clearTokens();

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Unknown error";
      setStatus("Failed to update email: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 480, margin: "auto" }}>
      <h2>Update Your Email</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 20 }}
      >
        <input
          type="email"
          placeholder="New email address"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
          style={{
            padding: 12,
            fontSize: 16,
            borderRadius: 6,
            border: "1px solid #ccc",
            outline: "none",
          }}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 12,
            backgroundColor: "#222",
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
            borderRadius: 6,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Updating..." : "Update Email"}
        </button>
      </form>
      {status && (
        <p
          style={{
            marginTop: 20,
            color: status.includes("successfully") ? "green" : "red",
          }}
        >
          {status}
        </p>
      )}
    </div>
  );
}
