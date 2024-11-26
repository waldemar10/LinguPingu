import React from "react";

const NavigationTabs = ({ tabs, selectedTab, handleTabChange, t }) => {
  return (
    <ul className="nav nav-pills">
      {tabs.map((tab) => (
        <li key={tab} className="nav-item g-hover">
          <a
            className={`nav-link ${selectedTab === tab ? "active" : ""}`}
            onClick={() => handleTabChange(tab)}>
            {t(`headers.${tab}`)}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default NavigationTabs;
