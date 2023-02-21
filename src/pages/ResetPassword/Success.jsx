import React from "react";

const Success = () => {
  return (
    <div className="login-f reset-success">
      <div className="login-container">
        <h1>Check your email box for the reset link</h1>
        <a href="/">
          <button className="btn btn-primary w-full">Go back to login</button>
        </a>
      </div>
    </div>
  );
};

export default Success;
