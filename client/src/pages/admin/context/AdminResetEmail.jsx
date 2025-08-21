import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken, clearTokens } from "@/http/auth/token";
import { updateEmail } from "@/http/auth";

export default function ResetEmailPage() {
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        setStatus("You must be logged in to update your email.");
        setLoading(false);
        return;
      }

      await updateEmail(accessToken, newEmail);

      setStatus("Email updated successfully! You will be logged out now.");
      clearTokens();

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setStatus("Failed to update email: " + (error.response?.data?.message || error.message));
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 480, margin: "auto" }}>
      <h2>Update Your Email</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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
            padding: "12px",
            backgroundColor: "#222",
            color: "#fff",
            fontWeight: "700",
            fontSize: 16,
            borderRadius: 6,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Updating..." : "Update Email"}
        </button>
      </form>
      {status && (
        <p style={{ marginTop: 20, color: status.includes("successfully") ? "green" : "red" }}>
          {status}
        </p>
      )}
    </div>
  );
}
