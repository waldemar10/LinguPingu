import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import NavigationBar from "../components/NavigationBar.js";
import CustomAlert from "../components/common/CustomAlert.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import VocabularyBackButton from "../components/collection/VocabularyBackButton.js";
import DeleteConfirmation from "../components/common/DeleteConfirmation.js";

import BackButton from "../components/collection/VocabularyBackButton.js";
import VocabularyCollectionService from "../services/VocabularyCollectionService";

import CreateCollection from "./CreateCollection.js";
import HeadLine from "../components/common/Headline.js";
import "../styles/Vocabulary.css";
const EditCollection = () => {
  //Filter / Search
  const [allCollections, setAllCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [tf] = useTranslation("form");
  const [t_pages] = useTranslation("mainPages");

  const cardwidth = 150;
  const cardAmount = 4;

  const [showEditMenu, setShowEditMenu] = useState(false);
  const [editData, setEditData] = useState({});

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({});

  //Alert
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");

  useEffect(() => {
    VocabularyCollectionService.getFilteredCollection("your")
      .then((res) => setAllCollections(res.data.collectionData))
      .catch((error) => displayAlert(tf("error.fetchFailed"), "danger", false));
  }, []);

  useEffect(() => {
    setFilteredCollections(allCollections);
  }, [allCollections]);

  useEffect(() => {
    if (allCollections?.length > 0) filterCollections();
  }, [searchInput]);

  const filterCollections = () => {
    const _filteredCollections = allCollections.filter((collection) =>
      collection.name.toLowerCase().includes(searchInput)
    );
    setFilteredCollections(_filteredCollections);
  };

  const handleClick = (index) => {
    setEditData(allCollections[index]);
    setShowEditMenu(true);
  };

  const deleteCollection = (collection) => {
    setDeleteTarget(collection);
    setDeleteConfirmation(true);
  };

  const getTagValues = (tags) => {
    const _tags = tags.map((tag) => tag.value);
    return _tags;
  };

  const refreshCollection = () => {
    VocabularyCollectionService.getFilteredCollection("your")
      .then((res) => setAllCollections(res.data.collectionData))
      .catch((error) => displayAlert(tf("error.fetchFailed"), "danger", false));
  };

  const onDeleteConfirmation = () => {
    VocabularyCollectionService.deleteCollection(deleteTarget._id)
      .then((res) => {
        displayAlert(tf("collection.delete"), "success", true);
        refreshCollection();
        setDeleteConfirmation(false);
      })
      .catch((error) => displayAlert(tf("error.failed"), "danger"), false);
  };

  const displayAlert = (text, variant, waitAlert) => {
    setMessage(text);
    setVariant(variant);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      if (waitAlert) setShowEditMenu(false);
    }, 2000);
  };

  const search = () => {
    return (
      <div className="d-flex flex-column align-items-center">
        <div
          className="m-3 p-3 rounded responsive-width"
          style={{
            /* width: `${cardwidth * cardAmount}px`, */
            backgroundColor: "#F9F9F9",
          }}
        >
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder={tf("collection.search")}
              aria-label="Searching Collection"
              aria-describedby="button-addon2"
              onChange={(evt) => setSearchInput(evt.target.value.toLowerCase())}
            />
          </div>
          <div className="card-container-small">
            {filteredCollections.length > 0 ? (
              filteredCollections.map((collection, index) => (
                <div className="mx-1" key={collection._id}>
                  <CollectionCard
                    collectionName={collection.name}
                    index={index}
                    handleClick={handleClick}
                    collection={collection}
                  />
                </div>
              ))
            ) : (
              <div style={{ color: "black" }}>{tf("collection.noData")}</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const CollectionCard = ({
    collectionName,
    index,
    handleClick,
    collection,
  }) => {
    return (
      <div className="card mx-auto" style={{ width: cardwidth }}>
        <div className="card-header d-flex justify-content-end">
          <span className="me-3">
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{ color: "black", cursor: "pointer" }}
              onClick={() => {
                handleClick(index);
              }}
            />
          </span>
          <span>
            <FontAwesomeIcon
              icon={faTrashCan}
              style={{ color: "black", cursor: "pointer" }}
              onClick={() => {
                deleteCollection(collection);
              }}
            />
          </span>
        </div>
        <div
          className="card-body d-flex flex-column align-items-center justify-content-center"
          style={{ height: "200px", color: "black" }}
        >
          <h1
            className="card-text card-text-small"
            style={{ wordWrap: "break-word", textAlign: "center" }}
          >
            {collectionName}
          </h1>
        </div>
      </div>
    );
  };

  return (
    <>
      <NavigationBar className="mb-5" />
      <HeadLine
        title={t_pages("editCollection.title")}
        slogan={t_pages("editCollection.slogan")}
      />
      {showAlert && <CustomAlert variant={variant} message={message} />}
      {!showEditMenu && (
        <>
          {search()}
          {deleteConfirmation && (
            <DeleteConfirmation
              onDelete={() => {
                onDeleteConfirmation();
                deleteCollection(deleteTarget);
              }}
              onCancel={() => setDeleteConfirmation(false)}
              name={deleteTarget.name}
            />
          )}
          <div className="d-flex justify-content-center">
            <BackButton />
          </div>
        </>
      )}
      {showEditMenu && (
        <CreateCollection
          id={editData._id}
          name={editData.name}
          cards={editData.cards}
          isPublic={editData.isPublic}
          tags={getTagValues(editData.tags)}
        />
      )}
    </>
  );
};

export default EditCollection;
