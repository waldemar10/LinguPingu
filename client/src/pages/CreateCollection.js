import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ReactCardFlip from "react-card-flip";
import VocabCard from "../components/VocabCard";
import BackButton from "../components/collection/VocabularyBackButton.js";
import NavigationBar from "../components/NavigationBar.js";
import DefaultForm from "../config/Forms/DefaultFormValues.js";
import VocabularyCollectionService from "../services/VocabularyCollectionService";
import VocabularyService from "../services/VocabularyService.js";
import CustomAlert from "../components/common/CustomAlert";
import FilterMenu from "../components/collection/FilterMenu.js";
import TagService from "../services/TagService.js";
import Select from "react-select";
import TagForm from "../components/TagForm.js";
import HeadLine from "../components/common/Headline.js";

import "../styles/VocabCard.css";
import "../styles/Vocabulary.css";
const CreateCollection = (props) => {
  const [editMode] = useState(Object.keys(props).length === 0 ? false : true);
  //Translations
  const [tf, i18next] = useTranslation("form");
  const [tv] = useTranslation("collection");
  const [tp] = useTranslation("mainPages");
  //Alert
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  //Card search
  const [allCards, setAllCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchLanguage, setSearchLanguage] = useState(i18next.language);
  const [searchInput, setSearchInput] = useState("");
  //Card search Filter
  const [selectedFilter, setSelectedFilter] = useState("all");
  //Form
  const [newCollection, setNewCollection] = useState(
    editMode ? props.cards : []
  );
  const [newCollectionName, setNewCollectionName] = useState(
    editMode ? props.name : ""
  );
  const [isPublic, setIsPublic] = useState(editMode ? props.isPublic : false);
  const [formError, setFormError] = useState({ name: "", cards: "" });
  const [loading, setLoading] = useState(false);
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCollectionTags, setSelectedCollectionTags] = useState(
    editMode ? props.tags : []
  );

  const [showPreview, setShowPreview] = useState(false);

  const cardWidth = 208;
  //Bestimmt wie viele Karten in der Suche angezeigt werden
  const cardAmount = 4;

  const selectStyles = {
    option: (provided, state) => ({
      ...provided,
      color: "black",
    }),
  };

  const useFlipCard = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
      setIsFlipped(!isFlipped);
    };

    return { isFlipped, flipCard };
  };

  useEffect(() => {
    VocabularyService.getAll()
      .then((res) => {
        setAllCards(res.data.vocabularyData);
      })
      .catch((error) => displayAlert(tf("error.fetchFailed"), "danger"));

    getTags();
  }, []);

  useEffect(() => {
    setFilteredCards(allCards);
  }, [allCards]);

  useEffect(() => {
    VocabularyService.getFilteredVocabulary(selectedFilter)
      .then((res) => setAllCards(res.data.vocabularyData))
      .catch((error) => displayAlert(tf("error.fetchFailed"), "danger"));
  }, [selectedFilter]);

  useEffect(() => {
    if (allCards?.length > 0) filterCards();
  }, [searchInput, searchLanguage, newCollection.length]);

  useEffect(() => {
    const _filteredCards = allCards.filter((card) =>
      matchTags(selectedTags, card.tags)
    );
    setFilteredCards(_filteredCards);
  }, [selectedTags]);

  const matchTags = (selectedTags, cardTags) => {
    if (selectedTags.length === 0) {
      return true;
    }

    return cardTags.some((tag) => selectedTags.includes(tag.value));
  };

  const filterCards = () => {
    let _filteredCards;
    if (searchLanguage === "en") {
      _filteredCards = allCards.filter(
        (card) =>
          card.en.toLowerCase().includes(searchInput) &&
          !newCollection.some(
            (collectionCard) => collectionCard._id === card._id
          )
      );
    } else {
      _filteredCards = allCards.filter(
        (card) =>
          card.de.toLowerCase().includes(searchInput) &&
          !newCollection.some(
            (collectionCard) => collectionCard._id === card._id
          )
      );
    }

    setFilteredCards(_filteredCards);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleTagChange = (tags) => {
    setSelectedTags(tags);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      setLoading(true);
      const data = {
        name: newCollectionName,
        cards: getCardIds(),
        isPublic: isPublic,
        tags: selectedCollectionTags.length > 0 ? getTagIds() : [],
      };
      if (editMode) {
        VocabularyCollectionService.updateCollection(props.id, data)
          .then((res) => {
            displayAlert(tf("collection.updateSuccess"), "success");
            setLoading(false);
          })
          .catch((error) => {
            let message;
            if (error.response.status == 404)
              message = tf("error.collectionNotFound");
            else if (error.response.status == 405)
              message = tf("error.noChanges");
            else message = tf("error.failed");
            displayAlert(message, "danger");
            setLoading(false);
          });
      } else {
        VocabularyCollectionService.createCollection(data)
          .then((res) => {
            displayAlert(tf("collection.createSuccess"), "success");
            resetForm();
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            displayAlert(tf("error.failed"), "danger");
          });
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    let err = { name: "", cards: "" };

    if (newCollectionName.trim() === "") {
      err.name = tf("error.name");
      valid = false;
    }

    if (newCollection.length === 0) {
      err.cards = tf("error.cards");
      valid = false;
    }

    setFormError(err);
    return valid;
  };

  const resetForm = () => {
    setNewCollectionName(DefaultForm.createCollection.name);
    setNewCollection(DefaultForm.createCollection.cards);
    setIsPublic(DefaultForm.createCollection.isPublic);
    setSelectedCollectionTags(DefaultForm.createCollection.tags);
  };

  const getTags = () => {
    TagService.getAll()
      .then((res) => setAllTags(res.data.tagData))
      .catch((error) => displayAlert(tf("error.fetchFailed"), "danger"));
  };

  const getCardIds = () => {
    const cardIds = newCollection.map((card) => card._id);
    return cardIds;
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

  const displayAlert = (text, variant) => {
    setMessage(text);
    setVariant(variant);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const onDragEnd = (result) => {
    const sourceList = result.source.droppableId;
    // Eintrag aus der Collection entfernen
    if (sourceList === "newCollection" && !result.destination) {
      removeFromArray(result.draggableId);
    }

    if (!result.destination) {
      return;
    }

    const destinationList = result.destination.droppableId;

    //Reorder in der Collection
    if (sourceList === destinationList && destinationList === "newCollection") {
      const reorderedItems = newCollection;
      const [removed] = reorderedItems.splice(result.source.index, 1);
      reorderedItems.splice(result.destination.index, 0, removed);

      setNewCollection(reorderedItems);
    } //Hinzufügen zur Collection
    else if (destinationList === "newCollection") {
      const [movedItem] = filteredCards.splice(result.source.index, 1);
      setNewCollection([...newCollection, movedItem]);
    } else if (
      sourceList === "newCollection" &&
      destinationList === "searchList"
    ) {
      removeFromArray(result.draggableId);
    }
  };

  const removeFromArray = (targetId) => {
    const tempArr = [...newCollection];
    const itemIndex = tempArr.findIndex((item) => item._id == targetId);

    if (itemIndex !== -1) {
      tempArr.splice(itemIndex, 1);
    }

    setNewCollection(tempArr);
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  const Card = ({ text, flipCard }) => (
    <div className="card mx-auto" style={{ width: "200px" }}>
      <div
        className="card-body d-flex flex-column align-items-center justify-content-center"
        style={{ height: "200px" }}
      >
        <h1
          className="card-text card-text-small"
          style={{ wordWrap: "break-word", textAlign: "center" }}
        >
          {text}
        </h1>
      </div>
      <div className="card-footer text-center">
        <button className="btn pressable" onClick={flipCard}>
          {tv("card.revealButton")}
        </button>
      </div>
    </div>
  );

  const DraggableCard = ({ card, provided, snapshot }) => {
    const { isFlipped, flipCard } = useFlipCard();

    return (
      <div
        ref={provided.innerRef}
        snapshot={snapshot}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="mx-1 my-2"
      >
        <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
          <Card
            text={searchLanguage === "en" ? card.en : card.de}
            flipCard={flipCard}
          />
          <Card
            text={searchLanguage === "en" ? card.de : card.en}
            flipCard={flipCard}
          />
        </ReactCardFlip>
      </div>
    );
  };

  const CollectionItem = ({ card, provided, snapshot }) => {
    return (
      <div
        ref={provided.innerRef}
        snapshot={snapshot}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="mx-1 my-2"
      >
        <div
          style={{ color: "black", backgroundColor: "white" }}
          className="rounded p-1 text-center border border-black"
        >
          {searchLanguage === "en" ? card.en : card.de}
        </div>
      </div>
    );
  };

  return (
    <>
      {!editMode && (
        <>
          <NavigationBar className="mb-5" />{" "}
          <HeadLine
            title={tp("createCollection.title")}
            slogan={tp("createCollection.slogan")}
          />
        </>
      )}
      {!showPreview ? (
        <DragDropContext onDragEnd={onDragEnd}>
          {/* Kartensuche container */}
          <div className="d-flex flex-column align-items-center">
            <div
              className="m-3 p-3 rounded responsive-width"
              style={{
               /*  width: `${cardWidth * cardAmount}px`, */
                backgroundColor: "#F9F9F9",
              }}
            >
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder={tf("collection.search")}
                  aria-label="Searching Collection"
                  aria-describedby="button-addon2"
                  onChange={(evt) =>
                    setSearchInput(evt.target.value.toLowerCase())
                  }
                />
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  onClick={() =>
                    setSearchLanguage(searchLanguage === "en" ? "de" : "en")
                  }
                >
                  {searchLanguage === "en" ? "EN" : "DE"}
                </button>
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  data-bs-toggle="collapse"
                  href="#filterMenu"
                  role="button"
                  aria-controls="filterMenu"
                  aria-expanded="false"
                >
                  Filter
                </button>
              </div>
              <div class="collapse" id="filterMenu" style={{ color: "black" }}>
                <FilterMenu
                  selectedFilter={selectedFilter}
                  onFilterChange={handleFilterChange}
                  allTags={allTags}
                  handleTagChange={handleTagChange}
                  isFilteringCollection={false}
                />
              </div>
              <Droppable droppableId="searchList" direction="horizontal">
                {(provided) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="card-container-small"
                    >
                      {filteredCards.length > 0 &&
                        filteredCards.map((card, index) => (
                          <Draggable
                            key={card._id}
                            draggableId={card._id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <DraggableCard
                                  provided={provided}
                                  snapshot={snapshot}
                                  card={card}
                                />
                              );
                            }}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
            {/* Neue Collection */}
            {showAlert && <CustomAlert variant={variant} message={message} />}
            <div className="newCollection-container d-flex flex-column p-3 rounded responsive-width-newCollection">
              <div className="input-group input-group-sm mb-2">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                  {tf("collection.name")}
                </span>
                <input
                  type="text"
                  class="form-control"
                  aria-label="collection name input"
                  aria-describedby="inputGroup-sizing-sm"
                  value={newCollectionName}
                  onChange={(evt) => setNewCollectionName(evt.target.value)}
                />
              </div>
              <div className="text-danger">{formError.name}</div>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  maxHeight: "370px",
                  minHeight: "150px",
                  overflowY: newCollection.length > 0 ? "auto" : "visible",
                }}
                className="rounded p-1 border border-black"
              >
                <Droppable droppableId="newCollection">
                  {(provided) => {
                    return (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {newCollection.map((card, index) => (
                          <Draggable
                            key={card._id}
                            draggableId={card._id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <CollectionItem
                                  provided={provided}
                                  snapshot={snapshot}
                                  card={card}
                                />
                              );
                            }}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
              <div className="text-danger">{formError.cards}</div>
              <div className="d-flex">
                <div style={{ width: "100%" }}>
                  <Select
                    className="mt-2 me-3"
                    value={selectedCollectionTags.map((tag) => ({
                      value: tag,
                      label: tag,
                    }))}
                    onChange={(options) => {
                      setSelectedCollectionTags(
                        options.map((option) => option.value)
                      );
                    }}
                    options={allTags.map((tag) => ({
                      label: tag.tag.toLowerCase(),
                      value: tag.value,
                    }))}
                    placeholder={tf("filter.tagSearch")}
                    isMulti
                    styles={selectStyles}
                  />
                </div>
                <div class="d-flex align-items-center mt-2">
                  <label for="isPrivate" style={{ color: "black" }}>
                    {tf("card.privacy")}
                  </label>
                  <input
                    style={{ marginLeft: "0.5rem" }}
                    type="checkbox"
                    value={isPublic}
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                  />
                </div>
              </div>
              <TagForm refresh={getTags} customClass={"m-2"} />
              <button
                className="btn btn-primary m-2"
                onClick={() => setShowPreview(true)}
              >
                {tf("preview")}
              </button>
              <button className="btn btn-primary m-2" onClick={handleSubmit}>
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
                    {editMode
                      ? tf("collection.updateCollection")
                      : tf("collection.createCollection")}
                  </span>
                )}
              </button>
            </div>
          </div>
        </DragDropContext>
      ) : (
        <>
          <VocabCard
            data={newCollection}
            title={`${newCollectionName} ${tf("preview")}`}
            finishCollection={closePreview}
            isPreview={true}
          />
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary m-2" onClick={closePreview}>
              {tf("endPreview")}
            </button>
          </div>
        </>
      )}
      <BackButton />
    </>
  );
};
export default CreateCollection;
