import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import TagService from "../services/TagService";
import CustomAlert from "./common/CustomAlert";
import DefaultFormValues from "../config/Forms/DefaultFormValues";

const TagForm = ({ refresh, customClass }) => {
  const [showModal, setShowModal] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [formError, setFormError] = useState("");
  const [t_form] = useTranslation("form");
  //Alert
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    resetForm();
    setShowModal(false);
  };

  const submit = () => {
    if (validateForm()) {
      TagService.createTag(newTag)
        .then((res) => {
          displayAlert(res.data.message, "success");
          setTimeout(() => {
            setShowAlert(false);
          }, 1500);
          resetForm();
          refresh();
        })
        .catch((error) => displayAlert(error.response.data.error, "danger"));
    }
  };

  const validateForm = () => {
    let valid = true;
    let err = "";

    if (newTag.trim() === "") {
      err = t_form("error.tag");
      valid = false;
    }

    setFormError(err);
    return valid;
  };

  const resetForm = () => {
    setNewTag(DefaultFormValues.createTag.tag);
  };

  const displayAlert = (text, variant) => {
    setMessage(text);
    setVariant(variant);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className={customClass}>
        {t_form("tag.new")}
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          {showAlert && <CustomAlert variant={variant} message={message} />}
          <div class="d-flex flex-column m-1">
            <label class="mb-1" for="newTag" style={{ color: "black" }}>
              {t_form("tag.label")}
            </label>
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <div className="text-danger">{formError}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t_form("tag.close")}
          </Button>
          <Button variant="primary" onClick={submit}>
            {t_form("tag.create")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TagForm;
