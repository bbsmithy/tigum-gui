import React, { useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import { getPublicResources } from "../../clib/api";
import { getDate } from "../../util";
import UserNotFound from "./components/UserNotFound";
import LoadingSnippet from "../../components/LoadingSnippet";
import marked from "marked";
import { LoadingVideo } from "../../components/LoadingVideo";
import { LinkCard, LoadingCard, VideoCard } from "../../components";
import ProfileButton from "./components/ProfileButton";
import TopicList from "./components/TopicList";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
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
import Sidebar from "./components/Sidebar";
import DisplayVideo from "./screens/DisplayVideo";

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
    zIndex: 20,
    "@media (max-width: 1000px)": {
      position: "absolute",
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
  backgroundBlur: {
    backgroundColor: "gray",
    opacity: 0.5,
    zIndex: 5,
    width: "100%",
    height: "100%",
    position: "absolute",
    "@media (min-width: 1000px)": {
      display: "none",
    },
  },
});

const ProfileRouter = ({}) => {
  const classes = useStyles();

  const getUserName = () => {
    return window.location.pathname.split("/")[2];
  };

  const [topics, error, isLoading] = useProfile(getUserName());
  const [menuOpen, setMenu] = useState(window.innerWidth > 1000);
  const [selectedTopic, setSelectedTopic] = useState<any>();

  const topicResourcesCache = useRef<Map<number, any>>(new Map());

  const navigate = useNavigate();

  const currentTopicId = window.location.pathname.split("/")[3];

  const findIntialTopic = (topicId: any, topics: any[]) => {
    return topics.find((t) => t.id == topicId);
  };

  const navigateToTopic = (topic: any) => {
    const currentUrlPath = window.location.pathname.split("/");
    const newLink = `/${currentUrlPath[1]}/${currentUrlPath[2]}/${topic.id}/${currentUrlPath[4]}`;
    navigate(newLink);
    onSelectTopic(topic);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const onSelectTopic = async (topic) => {
    if (window.innerWidth < 1000) {
      setMenu(false);
    }
    const cachedResourcesForTopic = topicResourcesCache.current.get(topic.id);
    if (cachedResourcesForTopic) {
      setSelectedTopic(cachedResourcesForTopic);
    } else {
      const resources = await getPublicResources(topic.id);
      const topicData = { ...topic, resources };
      topicResourcesCache.current.set(topic.id, topicData);
      setSelectedTopic(topicData);
    }
  };

  useEffect(() => {
    if (topics) {
      const initialTopic = findIntialTopic(currentTopicId, topics);
      if (initialTopic) {
        onSelectTopic(initialTopic);
      }
    }
  }, [topics]);

  return (
    <>
      <div className={`cf helvetica ${classes.mainContainer}`}>
        {menuOpen && (
          <>
            <div className={classes.topicSidebar}>
              <ProfileButton openMenu={closeMenu} userName={getUserName()} />
              {topics && topics.length > 0 && (
                <TopicList
                  topics={topics}
                  onSelectTopic={navigateToTopic}
                  classes={classes}
                />
              )}
            </div>
            <div className={classes.backgroundBlur} onClick={closeMenu}></div>
          </>
        )}

        <div className={classes.topicContent}>
          <Routes>
            <Route path="/p/:user/">
              <Route
                path=":topic_id"
                element={
                  <DisplayTopic
                    selectedTopic={selectedTopic}
                    topics={topics}
                    onClickMenu={() => {
                      setMenu(!menuOpen);
                    }}
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
              <Route
                path=":topic_id/videos/:video_id/"
                element={<DisplayVideo />}
              />
              <Route path="bio" element={<h1>View profile</h1>} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default ProfileRouter;
