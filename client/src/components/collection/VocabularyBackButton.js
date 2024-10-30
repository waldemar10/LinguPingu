import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const VocabularyBackButton = () => {
  const navigate = useNavigate();
  const [t] = useTranslation("collection");

  return (
    <div className="d-flex justify-content-center">
      <button
        className="btn btn-outline-primary btn-lg m-2"
        onClick={() => navigate("/vocabulary")}
      >
        {t("back")}
      </button>
    </div>
  );
};
export default VocabularyBackButton;
