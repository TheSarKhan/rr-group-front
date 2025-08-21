// // context/AuthContext.jsx
// import api, { fetchCsrfToken } from '@/http/axios';
// import React, { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [admin, setAdmin] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const login = async (email, password) => {
//     try {
//       await fetchCsrfToken();
//       const response = await api.post('/auth/login', { email, password });
//       setAdmin(response.data);
//     } catch (err) {
//       throw new Error('Login failed');
//     }
//   };

//   const logout = async () => {
//     await api.post('/auth/logout');
//     setAdmin(null);
//   };

//   const verify = async () => {
//     try {
//       await fetchCsrfToken();
//       const response = await api.post('/auth/verify');
//       setAdmin(response.data);
//     } catch {
//       setAdmin(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     verify();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ admin, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// src/components/AuthLayout.jsx
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex" style={{ background: "#F4F3FF" }}>
      <div className="w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
      <div className="w-1/2">
        <img
          src="/auth-image.jpg"
          alt="auth visual"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
