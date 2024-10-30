import React from "react";
import { useTranslation } from "react-i18next";
import FilterMenu from "./FilterMenu";
import "../../styles/Vocabulary.css";
const CollectionCard = ({
  collectionName,
  index,
  handleClick,
  buttonWidth,
}) => {
  return (
    <div
      className="card mx-auto flex-column"
      style={{ width: buttonWidth, cursor: "pointer" }}
    >
      <div
        className="card-body d-flex flex-column align-items-center justify-content-center"
        style={{ height: "200px", color: "black" }}
        onClick={() => handleClick(index)}
      >
        <h1 className="card-text card-text-small">{collectionName}</h1>
      </div>
    </div>
  );
};

const SearchContainer = ({
  itemWidth,
  itemAmount,
  handleClick,
  setSearchInput,
  selectedFilter,
  handleFilterChange,
  data,
  allTags,
  handleTagChange,
  isFilteringCollection,
}) => {
  const [t_form] = useTranslation("form");
  return (
    <div className="d-flex flex-column align-items-center">
      <div
        className="m-3 p-3 rounded responsive-width"
        style={{
          /* width: `${itemWidth * itemAmount}px`, */
          backgroundColor: "#F9F9F9",
        }}
      >
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder={t_form("collection.search")}
            aria-label="Searching Collection"
            aria-describedby="button-addon2"
            onChange={(evt) => setSearchInput(evt.target.value.toLowerCase())}
          />
          <button
            className="btn btn-outline-secondary"
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
        <div className="collapse" id="filterMenu" style={{ color: "black" }}>
          <FilterMenu
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterChange}
            allTags={allTags}
            handleTagChange={handleTagChange}
            isFilteringCollection={isFilteringCollection}
          />
        </div>
        <div className="card-container-small">
          {data.length > 0 ? (
            data.map((collection, index) => (
              <div className="mx-1" key={collection._id}>
                <CollectionCard
                  collectionName={collection.name}
                  index={index}
                  handleClick={handleClick}
                  buttonWidth={itemWidth}
                />
              </div>
            ))
          ) : (
            <div style={{ color: "black" }}>{t_form("collection.noData")}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
