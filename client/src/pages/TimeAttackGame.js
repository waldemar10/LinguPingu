import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar.js";
import VocabularyCollectionService from "../services/VocabularyCollectionService";
import SearchContainer from "../components/collection/SearchContainer";
import "../styles/VocabCard.css";
import Game from "../components/TimeAttackLogic.js";

import TagService from "../services/TagService";
import CustomAlert from "../components/common/CustomAlert.js";
import HeadLine from "../components/common/Headline.js";

import happyWalkPingu from "../images/PinguIcons/happyWalkPingu.png";

const TimeAttackGame = () => {
  const [t_form] = useTranslation("form");
  const [t_pages] = useTranslation("mainPages");
  const [t] = useTranslation("games");
  //Alert
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  //Parameter für Vokabeln
  const [selectedCollection, setSelectedCollection] = useState([]);
  const [collectionName, setCollectionName] = useState([]);
  //Filter / Search
  const [allCollections, setAllCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [showGame, setShowGame] = useState(false);
  const [gameData, setGameData] = useState([]);

  const buttonWidth = 150;
  const buttonAmount = 4;

  const navigate = useNavigate();

  useEffect(() => {
    VocabularyCollectionService.getAll()
      .then((res) => setAllCollections(res.data.collectionData))
      .catch((error) => displayAlert(t_form("error.fetchFailed"), "danger"));

    TagService.getAll()
      .then((res) => setAllTags(res.data.tagData))
      .catch((error) => displayAlert(t_form("error.fetchFailed"), "danger"));
  }, []);

  //Filtering and Fetching Data
  useEffect(() => {
    setFilteredCollections(allCollections);
  }, [allCollections]);

  useEffect(() => {
    VocabularyCollectionService.getFilteredCollection(selectedFilter)
      .then((res) => setAllCollections(res.data.collectionData))
      .catch((error) => displayAlert(t_form("error.fetchFailed"), "danger"));
  }, [selectedFilter]);

  useEffect(() => {
    if (allCollections?.length > 0) filterCollections();
  }, [searchInput]);

  useEffect(() => {
    const _filteredCollections = allCollections.filter((collection) =>
      matchTags(selectedTags, collection.tags)
    );
    setFilteredCollections(_filteredCollections);
  }, [selectedTags]);

  const matchTags = (selectedTags, collectionTags) => {
    if (selectedTags.length === 0) {
      return true;
    }

    return collectionTags.some((tag) => selectedTags.includes(tag.value));
  };

  const filterCollections = () => {
    const _filteredCollections = allCollections.filter((collection) =>
      collection.name.toLowerCase().includes(searchInput)
    );
    setFilteredCollections(_filteredCollections);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleTagChange = (tags) => {
    setSelectedTags(tags);
  };

  //Game Logic
  const handleClick = (index) => {
    prepareData(allCollections[index]);
    setSelectedCollection(allCollections[index]);
    setShowGame(true);
  };
  /*
  const finishCollection = () => {
    setShowCollection(false);
  };
  */

  const prepareData = (collection) => {
    const data = collection.cards.map((card) => ({
      de: card.de,
      en: card.en,
    }));

    data.sort(() => Math.random() - 0.5);

    setGameData(data);
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
      <NavigationBar className="mb-5" />
      {showAlert && <CustomAlert variant={variant} message={message} />}
      {!showGame && (
        <>
          <HeadLine
            title={"Time Attack"}
            slogan={t_pages("timeAttack.slogan")}
          />
          <div className="vh100">
            <img
              src={happyWalkPingu}
              className="img-home user-select-none"
            ></img>
          </div>
          <SearchContainer
            itemWidth={buttonWidth}
            itemAmount={buttonAmount}
            setSearchInput={setSearchInput}
            selectedFilter={selectedFilter}
            handleFilterChange={handleFilterChange}
            handleClick={handleClick}
            data={filteredCollections}
            allTags={allTags}
            handleTagChange={handleTagChange}
            isFilteringCollection={true}
          />
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-outline-primary btn-lg m-2"
              onClick={() => navigate("/games")}
            >
              {t("backToGames")}
            </button>
          </div>
        </>
      )}
      {showGame && <Game data={gameData} />}
    </>
  );
};

export default TimeAttackGame;
