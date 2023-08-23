import React from "react";
import "./styles.css";
import Image from "../../../assets/logo.png";
function Button({ text, onClick, disabled, width, isGoogleEnabled }) {
  return (
    <div
      onClick={onClick}
      className={isGoogleEnabled ? "google-btn" : "custom-btn"}
      disabled={disabled}
      style={{ width: width }}
    >
      {isGoogleEnabled && <img className="google-icon" src={Image} />}
      {text}
    </div>
  );
}

export default Button;
