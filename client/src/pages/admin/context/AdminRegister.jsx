import { useState } from "react";
import { login, register } from "@/http/auth";
import { setTokens } from "@/http/auth/token";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Register the user
      await register(form);

      // Login immediately
      const res = await login(form);

      // Save tokens
      setTokens(res.data);

      // Navigate to dashboard
      navigate("/admin");
    } catch (err) {
      alert("Registration or login failed");
      console.error(err?.response?.data || err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F3FF] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 w-full max-w-md rounded">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 p-2 border"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="w-full bg-green-600 text-white py-2">Register</button>
      </form>
    </div>
  );
}
