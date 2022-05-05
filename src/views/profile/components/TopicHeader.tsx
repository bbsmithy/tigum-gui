import React from "react";
import { createUseStyles } from "react-jss";
import { NavLink, useLocation, useResolvedPath } from "react-router-dom";

const useStyles = createUseStyles({
  searchInput: {
    "@media (max-width: 420px)": {
      height: 10,
      width: "60%",
      marginRight: 20,
    },
    maxWidth: 250,
    color: "white",
    width: "100%",
    padding: 7,
    fontSize: 14,
    borderRadius: 7,
    border: "none",
    backgroundColor: "#414a4c",
    float: "right",
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
    margin: 10,
    "@media (max-width: 420px)": {
      // position: "fixed",
      zIndex: 10,
    },
  },
  selectTopicTitle: {
    fontSize: 20,
    margin: 4,
    padding: 0,
    display: "inline-block",
  },
  tabBtn: {
    color: "white",
    textDecoration: "none",
    padding: "5px 7px 5px 7px",
    marginRight: 5,
    borderRadius: 7,
    whiteSpace: "nowrap",
    fontSize: 15,
  },
  tabActiveBtn: {
    color: "white",
    textDecoration: "none",
    padding: "5px 7px 5px 7px",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(36, 107, 248)",
    marginRight: 5,
    borderRadius: 7,
    fontSize: 15,
    whiteSpace: "nowrap",
    "-webkit-tap-highlight-color": "rgba(255, 255, 255, 0)",
  },
  tabsContainer: {
    display: "flex",
    flexDirection: "row",
    overflowX: "scroll",
    "@media (max-width: 420px)": {
      width: window.innerWidth,
    },
  },
  titleAndSearchContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    "@media (max-width: 420px)": {
      width: window.innerWidth,
    },
    width: "100%",
    marginBottom: 15,
    alignItems: "center",
  },
  menuIcon: {
    fontSize: 18,
    marginRight: 8,
    "-webkit-tap-highlight-color": "rgba(255, 255, 255, 0)",
  },
});

const SearchBar = ({ classes }) => {
  return (
    <input placeholder="Search All" className={classes.searchInput}></input>
  );
};

const TopicHeader = ({ selectedTopic, onClickMenu }) => {
  const classes = useStyles();

  const location = useLocation();
  const { pathname } = location;
  const route = pathname ? pathname.split("/")[4] : "";

  return (
    <div className={classes.selectedTopicHeader}>
      <div className={classes.titleAndSearchContainer}>
        <div
          style={{
            flex: 1,
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>
            <i
              className={`fas fa-bars white pointer ${classes.menuIcon}`}
              onClick={onClickMenu}
            />
          </div>
          <div>
            <h1 className={classes.selectTopicTitle}>{selectedTopic.title}</h1>
          </div>
        </div>
        <div style={{ flex: 1, justifyContent: "center" }}>
          <SearchBar classes={classes} />
        </div>
      </div>

      <div className={classes.tabsContainer}>
        {selectedTopic?.resources.notes.length > 0 && (
          <NavLink
            to="notes"
            className={
              route === "notes" ? classes.tabActiveBtn : classes.tabBtn
            }
          >
            📝 Notes
          </NavLink>
        )}
        {selectedTopic?.resources.videos.length > 0 && (
          <NavLink
            to="videos"
            className={
              route === "videos" ? classes.tabActiveBtn : classes.tabBtn
            }
          >
            📺 Videos
          </NavLink>
        )}
        {selectedTopic?.resources.snippets.length > 0 && (
          <NavLink
            to="snippets"
            className={
              route === "snippets" ? classes.tabActiveBtn : classes.tabBtn
            }
          >
            📋 Snippets
          </NavLink>
        )}
        {selectedTopic?.resources.links.length > 0 && (
          <NavLink
            to="links"
            className={
              route === "links" ? classes.tabActiveBtn : classes.tabBtn
            }
          >
            🔗 Links
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default TopicHeader;
