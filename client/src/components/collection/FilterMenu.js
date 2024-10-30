import React from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";

const OwnerSelection = ({
  selectedFilter,
  onFilterChange,
  isFilteringCollection,
}) => {
  const [t_filter] = useTranslation("collection");
  const prefix = isFilteringCollection
    ? "filterCollection"
    : "filterVocabulary";

  return (
    <>
      <div className="form-check w-100">
        <input
          className="form-check-input"
          type="radio"
          id="allCardsRadio"
          checked={selectedFilter === "all"}
          onChange={() => onFilterChange("all")}
        />
        <label className="form-check-label" htmlFor="allCardsRadio">
          {t_filter(`${prefix}.all`)}
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          id="yourCardsRadio"
          checked={selectedFilter === "your"}
          onChange={() => onFilterChange("your")}
        />
        <label className="form-check-label" htmlFor="yourRadio">
          {t_filter(`${prefix}.your`)}
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          id="pinguLinguCardsRadio"
          checked={selectedFilter === "pinguLingu"}
          onChange={() => onFilterChange("pinguLingu")}
        />
        <label className="form-check-label" htmlFor="pinguLinguRadio">
          {t_filter(`${prefix}.pingu`)}
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          id="otherUserCardsRadio"
          checked={selectedFilter === "otherUser"}
          onChange={() => onFilterChange("otherUser")}
        />
        <label className="form-check-label" htmlFor="otherUserRadio">
          {t_filter(`${prefix}.otherUser`)}
        </label>
      </div>
    </>
  );
};

const TagMenu = ({ allTags, handleTagChange }) => {
  const [t_form] = useTranslation("form");

  return (
    <>
      {allTags && (
        <Select
          value={allTags.find((option) => option.value === allTags)}
          onChange={(options) => {
            handleTagChange(options.map((option) => option.value));
          }}
          options={allTags.map((tag) => ({ label: tag.tag, value: tag.value }))}
          placeholder={t_form("filter.tagSearch")}
          isMulti
        />
      )}
    </>
  );
};

const FilterMenu = ({
  selectedFilter,
  onFilterChange,
  allTags,
  handleTagChange,
  isFilteringCollection,
}) => {
  return (
    <div className="d-flex">
      <div className="col">
        <OwnerSelection
          selectedFilter={selectedFilter}
          onFilterChange={onFilterChange}
          isFilteringCollection={isFilteringCollection}
        />
      </div>
      <div className="col">
        <TagMenu allTags={allTags} handleTagChange={handleTagChange} />
      </div>
    </div>
  );
};

export default FilterMenu;
