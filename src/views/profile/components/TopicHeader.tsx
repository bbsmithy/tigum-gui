import React from "react";
import { createUseStyles } from "react-jss";
import { NavLink, useResolvedPath } from "react-router-dom";

const useStyles = createUseStyles({
  searchInput: {
    "@media (max-width: 420px)": {
      display: "none",
    },
    color: "white",
    width: "100%",
    border: "1px solid white",
    padding: 7,
    fontSize: 14,
    boxShadow: "2px 2px 1px 0px rgb(0 0 0 / 75%)",
    borderRadius: 5,
    marginRight: 20,
    backgroundColor: "#333",
  },
  selectedTopicNavBarItem: {
    marginLeft: 4,
    marginRight: 4,
    padding: "5px 10px",
    height: 33,
    fontSize: "bold",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  shadow: {
    borderBottom: "3px solid rgb(36, 107, 248)",
  },
  selectedTopicHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectTopicTitle: {
    fontSize: 30,
    margin: 4,
    marginBottom: 20,
    padding: 0,
  },
});

const TopicHeader = ({ selectedTopic }) => {
  const classes = useStyles();

  return (
    <div className={classes.selectedTopicHeader}>
      <div>
        <h2 className={classes.selectTopicTitle}>{selectedTopic.title}</h2>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <NavLink to="notes">
            <i className="fas fa-pen-square" />
            <span style={{ marginLeft: 6 }}>Notes</span>
          </NavLink>
          <NavLink to="snippets">
            <i className="fas fa-newspaper" />
            <span style={{ marginLeft: 6 }}>Snippets</span>
          </NavLink>
          <NavLink to="videos">
            <i className="fab fa-youtube" />
            <span style={{ marginLeft: 6 }}>Videos</span>
          </NavLink>
          <NavLink to="links">
            <i className="fas fa-link" />
            <span style={{ marginLeft: 6 }}>Links</span>
          </NavLink>
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ width: 250 }}>
          <input
            placeholder="Search All 🔎"
            className={classes.searchInput}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default TopicHeader;
