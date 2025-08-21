// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Loginn from "@/assets/login.jpg";
// import { forgetPassword } from "@/http/auth";

// export default function ForgetPassword() {
//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (newPassword !== confirmPassword) {
//       alert("Yeni şifrə və təsdiq uyğun deyil!");
//       return;
//     }

//     if (!email) {
//       alert("Email daxil edilməyib!");
//       return;
//     }

//     try {
//       await forgetPassword(
//         { newPassword, confirmPassword },
//         { params: { email } }
//       );
//       alert("Şifrə uğurla dəyişdirildi!");
//       navigate("/login");
//     } catch (err) {
//       alert("Şifrəni dəyişmək alınmadı");
//       console.error(err.response?.data || err);
//     }
//   };

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
//             Şifrəni dəyiş
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
//             Yeni şifrəni daxil et
//           </h1>

//           <form
//             onSubmit={handleSubmit}
//             style={{ display: "flex", flexDirection: "column", gap: "24px" }}
//           >
//             <label
//               htmlFor="email"
//               style={{
//                 color: "#7E8D9C",
//                 fontFamily: "Inter, sans-serif",
//                 fontSize: "16px",
//                 fontWeight: 500,
//               }}
//             >
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               placeholder="Email daxil edin"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               style={{
//                 padding: "12px",
//                 fontSize: "16px",
//                 width: "100%",
//                 borderRadius: "6px",
//                 border: "1px solid #ccc",
//                 outline: "none",
//                 boxSizing: "border-box",
//               }}
//             />

//             <label
//               htmlFor="newPassword"
//               style={{
//                 color: "#7E8D9C",
//                 fontFamily: "Inter, sans-serif",
//                 fontSize: "16px",
//                 fontWeight: 500,
//               }}
//             >
//               Yeni şifrə
//             </label>
//             <input
//               id="newPassword"
//               type="password"
//               placeholder="Yeni şifrə"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//               style={{
//                 padding: "12px",
//                 fontSize: "16px",
//                 width: "100%",
//                 borderRadius: "6px",
//                 border: "1px solid #ccc",
//                 outline: "none",
//                 boxSizing: "border-box",
//               }}
//             />

//             <label
//               htmlFor="confirmPassword"
//               style={{
//                 color: "#7E8D9C",
//                 fontFamily: "Inter, sans-serif",
//                 fontSize: "16px",
//                 fontWeight: 500,
//               }}
//             >
//               Şifrəni təsdiqlə
//             </label>
//             <input
//               id="confirmPassword"
//               type="password"
//               placeholder="Şifrəni təsdiqlə"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               style={{
//                 padding: "12px",
//                 fontSize: "16px",
//                 width: "100%",
//                 borderRadius: "6px",
//                 border: "1px solid #ccc",
//                 outline: "none",
//                 boxSizing: "border-box",
//               }}
//             />

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
//                 marginTop: "16px",
//               }}
//             >
//               Şifrəni dəyiş
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


// import { useState, useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import Loginn from "@/assets/login.jpg";
// import { forgetPassword } from "@/http/auth";

// export default function ForgetPassword() {
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [params] = useSearchParams();
//   const email = params.get("email");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!email) {
//       alert("Email tapılmadı, zəhmət olmasa yenidən başlayın.");
//       navigate("/forget-password"); // or wherever the email input page is
//     }
//   }, [email, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (newPassword !== confirmPassword) {
//       alert("Yeni şifrə və təsdiq uyğun deyil!");
//       return;
//     }

//     if (!email) {
//       alert("Email tapılmadı, zəhmət olmasa yenidən başlayın.");
//       navigate("/forget-password");
//       return;
//     }

//     try {
//       await forgetPassword(
//         { newPassword, confirmPassword },
//         { params: { email } }
//       );
//       alert("Şifrə uğurla dəyişdirildi!");
//       navigate("/login");
//     } catch (err) {
//       alert("Şifrəni dəyişmək alınmadı");
//       console.error(err.response?.data || err);
//     }
//   };

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
//             Şifrəni dəyiş
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
//             Yeni şifrəni daxil et
//           </h1>

//           <form
//             onSubmit={handleSubmit}
//             style={{ display: "flex", flexDirection: "column", gap: "24px" }}
//           >
//             <label
//               htmlFor="newPassword"
//               style={{
//                 color: "#7E8D9C",
//                 fontFamily: "Inter, sans-serif",
//                 fontSize: "16px",
//                 fontWeight: 500,
//               }}
//             >
//               Yeni şifrə
//             </label>
//             <input
//               id="newPassword"
//               type="password"
//               placeholder="Yeni şifrə"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//               style={{
//                 padding: "12px",
//                 fontSize: "16px",
//                 width: "100%",
//                 borderRadius: "6px",
//                 border: "1px solid #ccc",
//                 outline: "none",
//                 boxSizing: "border-box",
//               }}
//             />

//             <label
//               htmlFor="confirmPassword"
//               style={{
//                 color: "#7E8D9C",
//                 fontFamily: "Inter, sans-serif",
//                 fontSize: "16px",
//                 fontWeight: 500,
//               }}
//             >
//               Şifrəni təsdiqlə
//             </label>
//             <input
//               id="confirmPassword"
//               type="password"
//               placeholder="Şifrəni təsdiqlə"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               style={{
//                 padding: "12px",
//                 fontSize: "16px",
//                 width: "100%",
//                 borderRadius: "6px",
//                 border: "1px solid #ccc",
//                 outline: "none",
//                 boxSizing: "border-box",
//               }}
//             />

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
//                 marginTop: "16px",
//               }}
//             >
//               Şifrəni dəyiş
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
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loginn from "@/assets/login.jpg";
import { forgetPassword } from "@/http/auth";

export default function ForgetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [params] = useSearchParams();
const email = params.get("email"); // get 'email' from query param

  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      alert("İstifadəçi adı tapılmadı, zəhmət olmasa yenidən başlayın.");
      navigate("/forget-password/email"); // or the page to enter username/email initially
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      alert("Yeni şifrə və təsdiq uyğun deyil!");
      return;
    }
  
    if (!email) {
      alert("Email tapılmadı, zəhmət olmasa yenidən başlayın.");
      navigate("/forget-password-email");
      return;
    }
  
    try {
      await forgetPassword(
        { newPassword, confirmPassword },
        { params: { email } }
      );
      alert("Şifrə uğurla dəyişdirildi!");
      navigate("/login");
    } catch (err) {
      alert("Şifrəni dəyişmək alınmadı");
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
            Şifrəni dəyiş
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
            Yeni şifrəni daxil et
          </h1>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <label
              htmlFor="newPassword"
              style={{
                color: "#7E8D9C",
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              Yeni şifrə
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="Yeni şifrə"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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

            <label
              htmlFor="confirmPassword"
              style={{
                color: "#7E8D9C",
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              Şifrəni təsdiqlə
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Şifrəni təsdiqlə"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
