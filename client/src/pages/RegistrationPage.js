import React, { useState } from "react";

import RegistrationForm from "../components/RegistrationForm";

function RegistrationPage() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <RegistrationForm />
    </div>
  );
}

export default RegistrationPage;
