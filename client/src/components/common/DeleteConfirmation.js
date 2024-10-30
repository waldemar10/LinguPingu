import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmation = ({ onDelete, onCancel, name }) => {
  const [t] = useTranslation("form");

  return (
    <Modal show={true} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "black" }}>
          <b>{t("delete.title")}</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: "black" }}>
        <p>{t("delete.textCard")}</p>
        <ul>
          <li>{name}</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          {t("delete.cancel")}
        </Button>
        <Button variant="danger" onClick={onDelete}>
          {t("delete.confirm")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmation;
