import React, { useState, useEffect } from "react";
import "../styles/MemoryGrid.css";
import "../styles/MemoryCard.css";
import MemoryCard from "../components/MemoryCard.js";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/collection/VocabularyBackButton.js";
import NavigationBar from "../components/NavigationBar.js";
import SearchContainer from "../components/collection/SearchContainer.js";
import VocabularyCollectionService from "../services/VocabularyCollectionService";
import TagService from "../services/TagService";
import CustomAlert from "../components/common/CustomAlert.js";
import memoryPingu from "../images/PinguIcons/memoryPingu.png";

const MemoryGame = () => {
  //SELECTION MENU

  const [t, i18n] = useTranslation("collection");
  const [tg] = useTranslation("games");
  //Filter / Search
  const [allCollections, setAllCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  //Alert
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");

  const buttonWidth = 150;
  const buttonAmount = 4;

  useEffect(() => {
    VocabularyCollectionService.getAll()
      .then((res) => setAllCollections(res.data.collectionData))
      .catch((error) => displayAlert(t("error.fetchFailed"), "danger"));

    TagService.getAll()
      .then((res) => setAllTags(res.data.tagData))
      .catch((error) => displayAlert(t("error.fetchFailed"), "danger"));
  }, []);

  //Filtering and Fetching Data
  useEffect(() => {
    setFilteredCollections(allCollections);
  }, [allCollections]);

  useEffect(() => {
    VocabularyCollectionService.getFilteredCollection(selectedFilter)
      .then((res) => setAllCollections(res.data.collectionData))
      .catch((error) => displayAlert(t("error.fetchFailed"), "danger"));
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

  const displayAlert = (text, variant) => {
    setMessage(text);
    setVariant(variant);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  // GAME HANDLING

  const [showGame, setShowGame] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState([]);
  const [cards, setCards] = useState([]);
  const [collectionName, setCollectionName] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const navigate = useNavigate();
  const [choiceCounter, setChoiceCounter] = useState(0);
  const [isWrong, setIsWrong] = useState(false);
  const [gameState, setGameState] = useState(false);

  const handleClick = (index) => {
    const selectedCollection = allCollections[index];
    setCollectionName(selectedCollection.name);
    setSelectedCollection(selectedCollection.cards);
    setShowGame(true);
    shuffleCards(selectedCollection.cards);
  };

  //Funktion um ein Array zu mischen
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffleCards = (collection) => {
    setChoiceCounter(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    const shuffledCollection = [...collection].sort(() => Math.random() - 0.5);
    const numberOfCards = Math.max(
      Math.floor(Math.random() * (shuffledCollection.length / 2)) + 1,
      4
    );

    const shuffledCards = [];
    for (let i = 0; i < numberOfCards; i++) {
      const card = shuffledCollection[i];

      if (card) {
        //De und Eng Karten haben selbe ID, um die MatchingFrage zu erleichtern
        const engCard = {
          id: card._id,
          en: card.en,
          matched: false,
          isFlipped: false,
        };
        const gerCard = {
          id: card._id,
          de: card.de,
          matched: false,
          isFlipped: false,
        };

        shuffledCards.push(engCard, gerCard);
      }
    }

    //Alle Karten (DE/ENG) in einem Array 'cards'
    setCards(shuffleArray(shuffledCards));
  };

  // Choice handling (zwei Karten ausgewählt)
  const handleChoice = (data) => {
    if (choiceCounter < 2) {
      choiceOne ? setChoiceTwo(data) : setChoiceOne(data);
      setChoiceCounter(choiceCounter + 1);
      console.log(choiceCounter);
    }
  };

  //Comparing the two cards
  useEffect(() => {
    if (choiceOne !== null) {
      setIsWrong(false);
    }
    if (choiceOne && choiceTwo) {
      if (choiceOne.id === choiceTwo.id) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.id === choiceOne.id) {
              return { ...card, matched: true, isFlipped: true };
            } else {
              return card;
            }
          });
        });
        setIsWrong(false);

        setChoiceCounter(0);
      } else {
        setTimeout(() => {
          setCards((prevCards) => {
            return prevCards.map((card) => {
              if (card.matched === false) {
                setIsWrong(true);
                return { ...card, isFlipped: false };
              } else {
                return card;
              }
            });
          });

          setChoiceCounter(0);
        }, 1000);
      }

      setIsWrong(false);
      setChoiceOne(null);
      setChoiceTwo(null);
    }
  }, [choiceCounter, choiceOne, choiceTwo]);

  useEffect(() => {
    if (cards.length === 0) return;
    const allMatched = cards.every((card) => card.matched);
    console.log(allMatched);

    if (allMatched) {
      console.log("GAME OVER");
      setGameState(true);
    } else {
      console.log("Spiel läuft noch...");
    }
  }, [cards]);
  return (
    <>
      <NavigationBar className="mb-5" />
      <div className="memory-game" />
      {showAlert && <CustomAlert variant={variant} message={message} />}
      {!showGame && (
        <>
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
              {tg("backToGames")}
            </button>
          </div>
        </>
      )}
      <div className="card-grid">
        {showGame &&
          cards &&
          cards.map((card, index) => (
            <div key={index} className="memory">
              {card.en && (
                <MemoryCard
                  data={card}
                  card={card}
                  title={collectionName}
                  term={card.en}
                  handleChoice={handleChoice}
                  setIsWrong={isWrong}
                  flipped={
                    card === choiceOne || card === choiceTwo || card.matched
                  }
                />
              )}
              {card.de && (
                <MemoryCard
                  data={card}
                  card={card}
                  title={collectionName}
                  term={card.de}
                  handleChoice={handleChoice}
                  setIsWrong={isWrong}
                  flipped={
                    card === choiceOne || card === choiceTwo || card.matched
                  }
                />
              )}
            </div>
          ))}
      </div>
      {gameState && (
        <div className="justify-content-center d-flex align-items-center">
          <BackButton />
          <img src={memoryPingu} className="img-home user-select-none"></img>
        </div>
      )}
    </>
  );
};
export default MemoryGame;
