import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import VocabCard from "../components/VocabCard";
import BackButton from "../components/collection/VocabularyBackButton.js";
import NavigationBar from "../components/NavigationBar.js";
import VocabularyCollectionService from "../services/VocabularyCollectionService";
import SearchContainer from "../components/collection/SearchContainer";
import "../styles/VocabCard.css";
import CustomAlert from "../components/common/CustomAlert.js";

import TagService from "../services/TagService";
import HeadLine from "../components/common/Headline.js";

import vocabPingu from "../images/PinguIcons/vocabPingu.png";

const Learn = () => {
  const [t_form] = useTranslation("form");
  const [t_pages] = useTranslation("mainPages");
  //Alert
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  //Parameter für Vokabeln
  const [selectedCollection, setSelectedCollection] = useState([]);
  const [collectionName, setCollectionName] = useState([]);
  const [showCollection, setShowCollection] = useState(false);
  //Filter / Search
  const [allCollections, setAllCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const buttonWidth = 150;
  const buttonAmount = 4;

  useEffect(() => {
    VocabularyCollectionService.getAll()
      .then((res) => setAllCollections(res.data.collectionData))
      .catch((error) => displayAlert(t_form("error.fetchFailed"), "danger"));

    TagService.getAll()
      .then((res) => setAllTags(res.data.tagData))
      .catch((error) => displayAlert(t_form("error.fetchFailed"), "danger"));
  }, []);

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

  const handleClick = (index) => {
    //reverse order, weil die karten übereinander liegen
    setSelectedCollection(allCollections[index].cards.reverse());
    setCollectionName(allCollections[index].name);
    setShowCollection(!showCollection);
  };

  const finishCollection = () => {
    setShowCollection(false);
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
      {!showCollection && (
        <>
          <div className="vh100">
            <img src={vocabPingu} className="img-home user-select-none"></img>
          </div>
          <HeadLine
            title={t_pages("learn.title")}
            slogan={t_pages("learn.slogan")}
          />
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
            <BackButton />
          </div>
        </>
      )}
      {showCollection && (
        <div>
          <VocabCard
            data={selectedCollection}
            title={collectionName}
            finishCollection={finishCollection}
            isPreview={false}
          />
        </div>
      )}
    </>
  );
};

export default Learn;
