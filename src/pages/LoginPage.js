import React, { useState } from "react";
import Header from "../components/common/Header";
import LoginForm from "../components/SignupComponents/LoginForm";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Login</h1>
        <LoginForm />
        <p style={{ cursor: "pointer"}} onClick={() => navigate("/signup")}>
            Don't have an account? Click here to signup.
        </p>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default LoginPage;