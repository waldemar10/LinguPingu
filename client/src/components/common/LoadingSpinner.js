import React from "react";

const LoadingSpinner = () => {
  return (
    <div className=" vh-100 d-flex flex-column align-items-center justify-content-center">
      <div
        className="spinner-border text-primary "
        style={{ width: "6rem", height: "6rem" }}></div>
      <p className="text-light">Loading Data...</p>
      <p>Es kann paar Minuten dauern...</p>
    </div>
  );
};

export default LoadingSpinner;
