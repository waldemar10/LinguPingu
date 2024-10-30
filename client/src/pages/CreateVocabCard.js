import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import VocabCard from "../components/VocabCard";
import BackButton from "../components/collection/VocabularyBackButton.js";
import NavigationBar from "../components/NavigationBar.js";
import CustomAlert from "../components/common/CustomAlert.js";

import TagService from "../services/TagService.js";
import VocabularyService from "../services/VocabularyService";
import DefaultForm from "../config/Forms/DefaultFormValues";
import TagForm from "../components/TagForm.js";

import HeadLine from "../components/common/Headline.js";

const CreateCard = (props) => {
  const [editMode] = useState(Object.keys(props).length === 0 ? false : true);
  const [t_form] = useTranslation("form");
  const [t_pages] = useTranslation("mainPages");
  //Alert
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  //Form
  const [deTranslation, setDeTranslation] = useState(editMode ? props?.de : "");
  const [enTranslation, setEnTranslation] = useState(editMode ? props?.en : "");
  const [isPublic, setIsPublic] = useState(editMode ? props?.isPublic : false);
  const [formError, setFormError] = useState({ de: "", en: "" });
  const [loading, setLoading] = useState(false);
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState(editMode ? props?.tags : []);

  //Preview
  const [showPreview, setShowPreview] = useState(false);
  const [previewCard, setPreviewCard] = useState({
    id: 1,
    en: enTranslation,
    de: deTranslation,
    visibility: isPublic,
  });

  useEffect(() => {
    TagService.getAll()
      .then((res) => setAllTags(res.data.tagData))
      .catch(
        (error) => displayAlert(t_form("error.fetchFailed"), "danger"),
        false
      );
  }, []);

  useEffect(() => {
    const newPreviewCard = {
      id: 1,
      en: enTranslation,
      de: deTranslation,
      visibility: isPublic,
    };

    setPreviewCard(newPreviewCard);
  }, [deTranslation, enTranslation, isPublic]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      setLoading(true);
      const data = {
        de: deTranslation,
        en: enTranslation,
        isPublic: isPublic,
        tags: selectedTags.length > 0 ? getTagIds() : [],
      };
      if (editMode) {
        VocabularyService.updateVocabulary(props.id, data)
          .then((res) => {
            displayAlert(t_form("card.updateSuccess"), "success", true);
            setLoading(false);
          })
          .catch((error) => {
            let message;
            if (error.response.status == 404)
              message = t_form("error.cardNotFound");
            else if (error.response.status == 405)
              message = t_form("error.noChanges");
            else message = t_form("error.failed");

            setLoading(false);
            displayAlert(message, "danger", false);
          });
      } else {
        VocabularyService.createVocabularyCard(data)
          .then((res) => {
            displayAlert(res.data.message, "success", false);
            clearInput();
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            displayAlert(t_form("error.failed"), "danger", false);
          });
      }
    }
  };

  const refreshTags = () => {
    TagService.getAll()
      .then((res) => setAllTags(res.data.tagData))
      .catch((error) =>
        displayAlert(t_form("error.fetchFailed"), "danger", false)
      );
  };

  const validateForm = () => {
    let valid = true;
    const err = { de: "", en: "" };

    if (deTranslation.trim() === "") {
      err.de = t_form("error.translation");
      valid = false;
    }

    if (enTranslation.trim() === "") {
      err.en = t_form("error.translation");
      valid = false;
    }

    setFormError(err);
    return valid;
  };

  const getTagIds = () => {
    const tagIds = [];
    selectedTags.forEach((selectedTag) => {
      let found = false;

      allTags.forEach((tag) => {
        if (tag.value === selectedTag && !found) {
          tagIds.push(tag._id);
          found = true;
        }
      });
    });

    return tagIds;
  };

  const clearInput = () => {
    setDeTranslation(DefaultForm.createCard.de);
    setEnTranslation(DefaultForm.createCard.en);
    setIsPublic(DefaultForm.createCard.isPublic);
    setSelectedTags(DefaultForm.createCard.tags);
  };

  const displayAlert = (text, variant, waitAlert) => {
    setMessage(text);
    setVariant(variant);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      if (waitAlert) props.onCloseEditMenu();
    }, 2000);
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  return (
    <>
      {!editMode && (
        <>
          <NavigationBar className="mb-5" />
          <HeadLine
            title={t_pages("createCard.title")}
            slogan={t_pages("createCard.slogan")}
          />
        </>
      )}
      {showAlert && <CustomAlert variant={variant} message={message} />}
      {!showPreview ? (
        <>
          <div
            className={`d-flex flex-column justify-content-center align-items-center  ${
              !editMode ? "vh-100" : ""
            } `}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-light p-3 rounded text-dark"
            >
              <div class="d-flex flex-column m-1">
                <label class="mb-1" for="deTranslation">
                  {t_form("card.deTranslation")}
                </label>
                <input
                  type="text"
                  value={deTranslation}
                  onChange={(e) => setDeTranslation(e.target.value)}
                />
                <div className="text-danger">{formError.de}</div>
              </div>
              <div class="d-flex flex-column m-1">
                <label class="mb-1" for="enTranslation">
                  {t_form("card.enTranslation")}
                </label>
                <input
                  type="text"
                  value={enTranslation}
                  onChange={(e) => setEnTranslation(e.target.value)}
                />
                <div className="text-danger">{formError.en}</div>
              </div>
              <div class="d-flex m-1">
                <label for="isPrivate">{t_form("card.privacy")}</label>
                <input
                  style={{ marginLeft: "0.5rem" }}
                  type="checkbox"
                  value={isPublic}
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
              </div>
              <Select
                value={selectedTags.map((tag) => ({ value: tag, label: tag }))}
                onChange={(options) => {
                  setSelectedTags(options.map((option) => option.value));
                }}
                options={allTags.map((tag) => ({
                  label: tag.tag.toLowerCase(),
                  value: tag.value,
                }))}
                placeholder={t_form("filter.tagSearch")}
                isMulti
              />
              <div className="d-flex flex-column justify-content-center">
                <TagForm refresh={refreshTags} customClass={"mx-3 my-2"} />
                <button
                  className="btn btn-primary mx-3 my-2"
                  onClick={() => setShowPreview(true)}
                >
                  {t_form("preview")}
                </button>
                <button className="btn btn-primary mx-3 my-2" type="submit">
                  {loading ? (
                    <>
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span class="sr-only">Loading...</span>
                    </>
                  ) : (
                    <span>
                      {editMode ? t_form("card.update") : t_form("card.create")}
                    </span>
                  )}
                </button>
              </div>
            </form>
            <BackButton />
          </div>
        </>
      ) : (
        <VocabCard
          data={[previewCard]}
          title={"Preview"}
          finishCollection={closePreview}
          isPreview={true}
        />
      )}
    </>
  );
};
export default CreateCard;
