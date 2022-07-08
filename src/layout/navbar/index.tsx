import React, { useState, useEffect } from "react";
import { OptionsButton, Option } from "../../components/OptionsButton";
import { SCREENS } from "../../routers/MainRouter";
import { deleteTopic } from "../../clib/api";
import { useStateValue } from "../../state/StateProvider";
import { createUseStyles } from "react-jss";
import { goto } from "../../util";
import "./styles.css";
import { SearchBar } from "./SearchBar";

interface TopicNavigationBarProps {
  title: string;
  topic: any;
}

const useStyles = createUseStyles({
  mobileNavItemsContainer: {
    float: "right",
  },
  mobileNavItemsButton: {
    color: "white",
    fontSize: 12,
    backgroundColor: "#333",
    textAlign: "center",
    padding: 5,
    borderRadius: 3,
    cursor: "pointer",
  },
  mobileNavDropdown: {
    backgroundColor: "#333",
    borderRadius: 5,
    boxShadow: "2px 2px 1px 0px rgba(0, 0, 0, 0.75)",
    position: "absolute",
    right: 15,
    marginTop: 3,
    color: "white",
    fontSize: 12,
    padding: 5,
  },
  mobileNavItem: {
    padding: 7,
    textAlign: "center",
    cursor: "pointer",
  },
  selectedNavItem: {
    marginRight: 5,
  },
  selectedNavIcon: {
    marginRight: 5,
  },
  searchBarContainer: {
    flex: 2,
  },
  titleContainer: {
    flex: 1.5,
    display: "flex",
    flexDirection: "row",
  },
  titleTextContainer: {
    flex: 6,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: 200,
    display: "block",
  },
  navbarContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#1f1f1f",
  },
  navItemsContainer: {
    flex: 2,
    float: "right",
    marginTop: 8,
  },
  navIconContainer: {
    flex: 1,
    marginTop: 15,
    maxWidth: 30,
  },
  optionsButtonContainer: {
    flex: 2,
    marginTop: 10,
  },
});

const navItems = [
  {
    title: "Links",
    icon: "🔗",
    screen: SCREENS.LINKS,
  },
  {
    title: "Snippets",
    icon: "📋",
    screen: SCREENS.ARTICLE_SNIPPETS,
  },
  {
    title: "Videos",
    icon: "📺",
    screen: SCREENS.ALL_VIDEOS,
  },
  {
    title: "Notes",
    icon: "📝",
    screen: SCREENS.ALL_NOTES,
  },
];

export const TopicNavigationBar = ({ title }: TopicNavigationBarProps) => {
  const [useMobileNavItems, setMobileNavItems] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [displayMobileNavOptions, setDisplayMobileNavOptions] = useState(false);
  const classes = useStyles();

  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: { selectedTopic, topics },
    navigation: { showSidebar, useFullWidth, topicScreen },
  } = state;

  const topicMenuOptions: Array<Option> = [
    {
      title: "Delete",
      icon: "fas fa-trash",
      onClick: () => deleteTopicAndNavToNextTopic(),
    },
  ];

  useEffect(() => {
    setNavOptionsType(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const setNavOptionsType = (width: number) => {
    if (width < 600) {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }
    if (width < 1000) {
      setMobileNavItems(true);
    } else if (width > 1000) {
      setMobileNavItems(false);
    }
  };

  const deleteTopicAndNavToNextTopic = async () => {
    try {
      await deleteTopic(selectedTopic);
      dispatch({ type: "DELETE_TOPIC", payload: selectedTopic });
      goto(`/topic/${topics.keys[0]}/notes`);
    } catch (e) {
      return;
    }
  };

  const handleWindowResize = (evt) => {
    setNavOptionsType(evt.target.innerWidth);
  };

  const toggleSidebar = () => {
    const shouldUseFullWidth = window.innerWidth < 960;
    showSidebar
      ? dispatch({
          type: "HIDE_SIDEBAR",
          payload: { useFullWidth: shouldUseFullWidth },
        })
      : dispatch({
          type: "SHOW_SIDEBAR",
          payload: { useFullWidth: shouldUseFullWidth },
        });
  };

  const toggleMobileNavMenu = () => {
    setDisplayMobileNavOptions(!displayMobileNavOptions);
  };

  const renderNavItemsDesktop = () => {
    return navItems.map((navItem) => {
      return (
        <div
          className={`btn topic-nav-btn fr f6 f5-ns dib mr3 mr4-ns ${
            navItem.screen === topicScreen && "selected"
          }`}
          key={navItem.title}
          onClick={() => {
            goto(`/topic/${selectedTopic}/${navItem.title.toLowerCase()}`);
          }}
        >
          {navItem.icon} {navItem.title}
        </div>
      );
    });
  };

  const renderNavItemsMobile = () => {
    return (
      <div className={classes.mobileNavItemsContainer}>
        <div
          className={classes.mobileNavItemsButton}
          onClick={toggleMobileNavMenu}
        >
          <i
            className={`${navItems[topicScreen].icon} ${classes.selectedNavIcon}`}
          />
          <span className={classes.selectedNavItem}>
            {navItems[topicScreen].title}
          </span>
          <i
            className={`fas ${
              displayMobileNavOptions ? "fa-chevron-up" : "fa-chevron-down"
            }`}
          ></i>
        </div>
        {displayMobileNavOptions && (
          <div className={classes.mobileNavDropdown}>
            {navItems.map((item) => {
              if (item.screen === topicScreen) return;
              return (
                <div
                  className={classes.mobileNavItem}
                  onClick={() => {
                    goto(`/topic/${selectedTopic}/${item.title.toLowerCase()}`);
                    setDisplayMobileNavOptions(false);
                  }}
                >
                  <span className={classes.selectedNavItem}>
                    {item.icon} {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      className={`fixed ${classes.navbarContainer} ${
        showSidebar && !useFullWidth ? "w-80" : "w-100"
      } border-box ph3 z-2`}
    >
      <div className={classes.titleContainer}>
        <div className={classes.navIconContainer}>
          <i
            className="fas fa-bars white pointer pr3"
            onClick={toggleSidebar}
          ></i>
        </div>
        <div className={classes.titleTextContainer}>
          <h2 id="topic-header">{title}</h2>
        </div>
        {!displayMobileNavOptions && (
          <div className={classes.optionsButtonContainer}>
            <OptionsButton options={topicMenuOptions} />
          </div>
        )}
      </div>
      {showSearch && (
        <div className={classes.searchBarContainer}>
          <SearchBar />
        </div>
      )}
      <div className={classes.navItemsContainer}>
        {useMobileNavItems ? renderNavItemsMobile() : renderNavItemsDesktop()}
      </div>
    </nav>
  );
};
