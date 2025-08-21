// import { useState } from "react";
// import {  login } from "@/http/auth";
// import { setTokens } from "@/http/auth/token";
// import { Link, useNavigate } from "react-router-dom";
// import Loginn from "@/assets/login.jpg";
// const EyeIcon = (props) => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     {...props}
//   >
//     <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
//     <circle cx="12" cy="12" r="3" />
//   </svg>
// );

// const EyeOffIcon = (props) => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     {...props}
//   >
//     <path d="M17.94 17.94A10.11 10.11 0 0112 19c-7 0-11-7-11-7a17.66 17.66 0 014.68-5.66" />
//     <path d="M1 1l22 22" />
//     <path d="M9.88 9.88a3 3 0 104.24 4.24" />
//   </svg>
// );

// export default function Login() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);


 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     console.log("Trying to login with:", form);
  
//     try {
//       const res = await login(form);
//       console.log("Login response:", res.data);
//       setTokens(res.data);
//       navigate("/admin");
//     } catch (err) {
//       console.error("Login failed:", err?.response?.data || err.message);
//       alert(err?.response?.data?.message || "Login failed");
//     }
//   };
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
  
//   //   try {
//   //     const res = await login(form);
//   //     console.log("Login response:", res.data);
//   //     setTokens(res.data);
//   //     navigate("/admin");
//   //   } catch (err) {
//   //     console.error("Login failed:", err?.response?.data || err.message);
//   //     alert(err?.response?.data?.message || "Login failed");
//   //   }
//   // };
  

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundColor: "#F4F3FF",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "20px",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           width: "1024px",
//           maxWidth: "100%",
//           borderRadius: "32px",
//           overflow: "hidden",
//           boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
//           backgroundColor: "#fff",
//         }}
//       >
//         {/* Left side - Form */}
//         <div
//           style={{
//             flex: 1,
//             padding: "48px 40px",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//           }}
//         >
//           <p
//             style={{
//               color: "#7E8D9C",
//               fontFamily: "Inter, sans-serif",
//               fontSize: "24px",
//               fontWeight: 400,
//               margin: 0,
//             }}
//           >
//             Xoş gəlmisən
//           </p>
//           <h1
//             style={{
//               color: "#222",
//               fontFamily: "Inter, sans-serif",
//               fontSize: "40px",
//               fontWeight: 700,
//               marginTop: "8px",
//               marginBottom: "32px",
//             }}
//           >
//             Daxil ol
//           </h1>

//           <form
//             onSubmit={handleSubmit}
//             style={{ display: "flex", flexDirection: "column", gap: "24px" }}
//           >
//             <label
//               htmlFor="username"
//               style={{
//                 color: "#7E8D9C",
//                 fontFamily: "Inter, sans-serif",
//                 fontSize: "16px",
//                 fontWeight: 500,
//               }}
//             >
//               İstifadəçi adı
//             </label>
//             <input
//               id="username"
//               placeholder="RRGroupAdmin"
//               style={{
//                 padding: "12px",
//                 fontSize: "16px",
//                 width: "100%",
//                 borderRadius: "6px",
//                 border: "1px solid #ccc",
//                 outline: "none",
//               }}
//               value={form.username}
//               onChange={(e) => setForm({ ...form, username: e.target.value })}
//               required
//             />

//             <label
//               htmlFor="password"
//               style={{
//                 color: "#7E8D9C",
//                 fontFamily: "Inter, sans-serif",
//                 fontSize: "16px",
//                 fontWeight: 500,
//                 marginTop: "16px",
//               }}
//             >
//               Şifrə
//             </label>
//             <div style={{ position: "relative", width: "100%" }}>
//   <input
//     id="password"
//     type={showPassword ? "text" : "password"}
//     value={form.password}
//     onChange={(e) => setForm({ ...form, password: e.target.value })}
//     placeholder="••••••••"
//     required
//     style={{
//       width: "100%",
//       padding: "12px",
//       paddingRight: "40px", // space for icon
//       fontSize: "16px",
//       borderRadius: "6px",
//       border: "1px solid #ccc",
//       outline: "none",
//       boxSizing: "border-box",
//     }}
//   />
//   <button
//     type="button"
//     onClick={() => setShowPassword(!showPassword)}
//     style={{
//       position: "absolute",
//       right: "10px",
//       top: "50%",
//       transform: "translateY(-50%)",
//       background: "transparent",
//       border: "none",
//       cursor: "pointer",
//       padding: 0,
//       display: "flex",
//       alignItems: "center",
//     }}
//     aria-label={showPassword ? "Şifrəni gizlət" : "Şifrəni göstər"}
//   >
//     {showPassword ? (
//       <EyeOffIcon width={24} height={24} />
//     ) : (
//       <EyeIcon width={24} height={24} />
//     )}
//   </button>
// </div>

// <Link
//   to="/forget-password/email"
//   style={{
//     display: "inline-block",
//     marginTop: "8px",
//     color: "var(--Secondary-text-color, #7E8D9C)",
//     fontFamily: "Inter, sans-serif",
//     fontSize: "14px",
//     fontStyle: "normal",
//     fontWeight: 300,
//     lineHeight: "normal",
//     textDecoration: "underline",
//     cursor: "pointer",
//   }}
// >
//   Şifrəni unutmusan?
// </Link>
//             <button
//               type="submit"
//               style={{
//                 height: "54px",
//                 backgroundColor: "#222",
//                 color: "#fff",
//                 fontSize: "18px",
//                 fontWeight: "700",
//                 border: "none",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//                 marginTop: "32px",
//               }}
//             >
//               Daxil ol
//             </button>
//           </form>
//         </div>

//         {/* Right side - Image */}
//         <div
//           style={{
//             flex: 1,
//             minWidth: "300px",
//             backgroundImage: `url(${Loginn})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         />
//       </div>
//     </div>
//   );
// }

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

