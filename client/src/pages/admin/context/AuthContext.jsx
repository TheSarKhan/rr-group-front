 
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
