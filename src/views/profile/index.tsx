import React, { useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import {
  getPublicLinks,
  getPublicNotes,
  getPublicSnippets,
  getPublicTopics,
  getPublicVideos,
} from "../../clib/api";
import { getDate } from "../../util";
import UserNotFound from "./components/UserNotFound";
import LoadingSnippet from "../../components/LoadingSnippet";
import marked from "marked";
import { LoadingVideo } from "../../components/LoadingVideo";
import { LinkCard, LoadingCard, VideoCard } from "../../components";
import ProfileButton from "./components/ProfileButton";
import TopicList from "./components/TopicList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DisplayTopic from "./screens/DisplayTopic";
import TopicHeader from "./components/TopicHeader";

import {
  LinkList,
  NotesList,
  SnippetList,
  VideoList,
} from "./components/ResourceList";
import { useProfile } from "./hooks";
import { topic } from "firebase-functions/v1/pubsub";

const useStyles = createUseStyles({
  mainContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
  },
  topicSidebar: {
    flex: 2,
    overflow: "hidden",
    backgroundColor: "#333",
    border: 2,
    marginRight: "1%",
    borderRadius: 3,
    height: "100%",
    minWidth: 250,
    "@media (max-width: 1000px)": {
      display: "none",
    },
  },
  topicContent: {
    flex: 10,
  },
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
  mobileSearchInput: {
    color: "white",
    width: "100%",
    border: "1px solid gray",
    height: 30,
    fontSize: 14,
    boxShadow: "2px 2px 1px 0px rgb(0 0 0 / 75%)",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  loadingProfile: {
    fontSize: 25,
    width: "40%",
    color: "white",
    margin: "auto",
    background: "#333",
    textAlign: "center",
    marginTop: "10%",
    height: 200,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
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

export const Profile = ({}) => {
  const classes = useStyles();

  const getUserName = () => {
    return window.location.pathname.split("/")[2];
  };

  const [topics, error, isLoading] = useProfile(getUserName());
  const [menuOpen, setMenu] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<any>();

  const onSelectTopic = (topic) => {
    setSelectedTopic(topic);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  return (
    <>
      <BrowserRouter>
        {menuOpen && (
          <div
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "#333",
              padding: 15,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3 style={{ color: "white" }}>Topics</h3>
              </div>
              <div>
                <i
                  className="fas fa-times white"
                  style={{ marginTop: 20, fontSize: 20 }}
                  onClick={closeMenu}
                ></i>
              </div>
            </div>
            <input
              placeholder="Search All"
              className={classes.mobileSearchInput}
            ></input>
            {topics &&
              topics.map((topic) => {
                return (
                  <div
                    style={{
                      border: "1px solid gray",
                      marginTop: 10,
                      borderRadius: 5,
                      padding: "15px 10px",
                      background: "#333",
                      color: "white",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>{topic.title}</div>
                    <div>
                      <i className="fas fa-chevron-right white"></i>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
        <div className={`cf helvetica ${classes.mainContainer}`}>
          <div className={classes.topicSidebar}>
            <ProfileButton openMenu={() => {}} userName={getUserName()} />
            {topics && topics.length > 0 && (
              <TopicList
                topics={topics}
                onSelectTopic={onSelectTopic}
                classes={classes}
              />
            )}
          </div>
          <div className={classes.topicContent}>
            <Routes>
              <Route path="/p/:user/">
                <Route
                  path=":topic_id"
                  element={
                    <DisplayTopic
                      selectedTopic={selectedTopic}
                      classes={classes}
                    />
                  }
                >
                  <Route
                    path="notes"
                    element={<NotesList selectedTopic={selectedTopic} />}
                  />
                  <Route
                    path="snippets"
                    element={<SnippetList selectedTopic={selectedTopic} />}
                  />
                  <Route
                    path="videos"
                    element={<VideoList selectedTopic={selectedTopic} />}
                  />
                  <Route
                    path="links"
                    element={<LinkList selectedTopic={selectedTopic} />}
                  />
                </Route>
                <Route path="bio" element={<h1>View profile</h1>} />
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};
