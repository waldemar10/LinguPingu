import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import NavigationBar from "../components/NavigationBar.js";
import CustomAlert from "../components/common/CustomAlert.js";

import VocabularyService from "../services/VocabularyService";
import CreateCard from "./CreateVocabCard.js";
import ReactCardFlip from "react-card-flip";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import VocabularyBackButton from "../components/collection/VocabularyBackButton.js";
import DeleteConfirmation from "../components/common/DeleteConfirmation.js";

import HeadLine from "../components/common/Headline.js";

const EditCard = () => {
  const [tf, i18next] = useTranslation("form");
  const [tc] = useTranslation("collection");
  const [tp] = useTranslation("mainPages");
  //Filter
  const [allCards, setAllCards] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchLanguage, setSearchLanguage] = useState(i18next.language);
  const [filteredCards, setFilteredCards] = useState([]);
  //Edit
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [editDetails, setEditDetails] = useState({});
  //Alert
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({});

  const cardWidth = 208;
  //Bestimmt wie viele Karten in der Suche angezeigt werden
  const cardAmount = 4;

  const useFlipCard = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
      setIsFlipped(!isFlipped);
    };

    return { isFlipped, flipCard };
  };

  useEffect(() => {
    VocabularyService.getFilteredVocabulary("your")
      .then((res) => setAllCards(res.data.vocabularyData))
      .catch((error) => displayAlert(tc("error.fetchFailed")), "danger");
  }, []);

  useEffect(() => {
    setFilteredCards(allCards);
  }, [allCards]);

  useEffect(() => {
    if (allCards?.length > 0) filterCards();
  }, [searchInput, searchLanguage]);

  const refreshCards = () => {
    VocabularyService.getFilteredVocabulary("your")
      .then((res) => setAllCards(res.data.vocabularyData))
      .catch((error) => displayAlert(tc("error.fetchFailed")), "danger");
  };

  const filterCards = () => {
    let _filteredCards;
    if (searchLanguage === "en") {
      _filteredCards = allCards.filter((card) =>
        card.en.toLowerCase().includes(searchInput)
      );
    } else {
      _filteredCards = allCards.filter((card) =>
        card.de.toLowerCase().includes(searchInput)
      );
    }

    setFilteredCards(_filteredCards);
  };

  const editCard = (card) => {
    setEditDetails({
      de: card.de,
      en: card.en,
      isPublic: card.isPublic,
      tags: card.tags,
      id: card._id,
    });
    setShowEditMenu(true);
  };

  const getTagValues = (tags) => {
    const _tags = tags.map((tag) => tag.value);
    return _tags;
  };

  const deleteCard = (card) => {
    setDeleteTarget(card);
    setDeleteConfirmation(true);
  };

  const displayAlert = (text, variant) => {
    setMessage(text);
    setVariant(variant);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const onDeleteConfirmation = () => {
    VocabularyService.deleteVocabulary(deleteTarget._id)
      .then((res) => {
        displayAlert(tf("card.delete"), "success");
        refreshCards();
        setDeleteConfirmation(false);
      })
      .catch((error) => displayAlert(tf("error.deleteFailed"), "danger"));
  };

  const Card = ({ text, flipCard, cardInfo }) => (
    <div className="card mx-auto" style={{ width: "200px" }}>
      <div className="card-header d-flex justify-content-end">
        <span className="me-3">
          <FontAwesomeIcon
            icon={faPenToSquare}
            style={{ color: "black", cursor: "pointer" }}
            onClick={() => {
              editCard(cardInfo);
            }}
          />
        </span>
        <span>
          <FontAwesomeIcon
            icon={faTrashCan}
            style={{ color: "black", cursor: "pointer" }}
            onClick={() => {
              setShowEditMenu(false);
              deleteCard(cardInfo);
            }}
          />
        </span>
      </div>
      <div
        className="card-body d-flex flex-column align-items-center justify-content-center"
        style={{ height: "200px" }}
      >
        <h1 className="card-text card-text-small">{text}</h1>
      </div>
      <div className="card-footer text-center">
        <button className="btn pressable" onClick={flipCard}>
          {tc("card.revealButton")}
        </button>
      </div>
    </div>
  );

  const MenuCard = ({ card }) => {
    const { isFlipped, flipCard } = useFlipCard();

    return (
      <div className="mx-1">
        <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
          <Card
            text={searchLanguage === "en" ? card.en : card.de}
            flipCard={flipCard}
            cardInfo={card}
          />
          <Card
            text={searchLanguage === "en" ? card.de : card.en}
            flipCard={flipCard}
            cardInfo={card}
          />
        </ReactCardFlip>
      </div>
    );
  };

  const search = () => {
    return (
      <>
        <div className="d-flex flex-column align-items-center">
          <div
            className="m-3 p-3 rounded"
            style={{
              width: `${cardWidth * cardAmount}px`,
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
                onChange={(evt) =>
                  setSearchInput(evt.target.value.toLowerCase())
                }
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() =>
                  setSearchLanguage(searchLanguage === "en" ? "de" : "en")
                }
              >
                {searchLanguage === "en" ? "EN" : "DE"}
              </button>
            </div>
            {showAlert && <CustomAlert variant={variant} message={message} />}
            <div className="card-container-small">
              {filteredCards.length > 0 ? (
                filteredCards.map((card) => (
                  <MenuCard key={card._id} card={card} className="mx-1" />
                ))
              ) : (
                <div style={{ color: "black" }}>{tf("card.noData")}</div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <NavigationBar className="mb-5" />
      <HeadLine title={tp("editCard.title")} slogan={tp("editCard.slogan")} />
      {search()}
      {deleteConfirmation && (
        <DeleteConfirmation
          onDelete={() => {
            onDeleteConfirmation();
            deleteCard(deleteTarget);
          }}
          onCancel={() => setDeleteConfirmation(false)}
          name={searchLanguage === "en" ? deleteTarget.en : deleteTarget.de}
        />
      )}
      {!showEditMenu && <VocabularyBackButton />}
      {showEditMenu && (
        <CreateCard
          de={editDetails.de}
          en={editDetails.en}
          isPublic={editDetails.isPublic}
          tags={getTagValues(editDetails.tags)}
          id={editDetails.id}
          onCloseEditMenu={() => {
            setShowEditMenu(false);
            refreshCards();
          }}
        />
      )}
    </div>
  );
};
export default EditCard;
