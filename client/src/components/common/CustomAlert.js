import React, { useState, useEffect } from "react";

const CustomAlert = ({ variant, message }) => {
  return (
    <div
      className={`alert alert-${variant} d-flex align-items-center mb-0`}
      role="alert"
    >
      <div>{message}</div>
    </div>
  );
};

export default CustomAlert;
