import logo from "../logo.png";
import React from "react";
import { NoTopicsMessage } from "./NoTopicsMessage";
import { TOPIC_SCREENS } from "../routers/TopicRouter";
import { TopicsList } from "./TopicsList";
import { useStateValue } from "../state/StateProvider";
import { createUseStyles } from "react-jss";
import { logoutUser } from "../client-lib/api";
import { deleteJWT } from "../util";

const useStyles = createUseStyles({
  sidebarContainer: {
    backgroundColor: "#333",
    color: "white"
  },
  logoutText: {
    marginRight: 8
  }
});

interface SideBarProps {
  navigate: (screen: TOPIC_SCREENS, data: any) => void;
  screen: TOPIC_SCREENS;
  toggleModal: () => void;
}

export const SideBar: React.FC<SideBarProps> = ({
  navigate,
  screen,
  toggleModal
}: SideBarProps) => {
  const onClickNewTopic = () => {
    toggleModal();
  };

  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: { topics }
  } = state;

  const classes = useStyles();
  const onLogout = () => {
    dispatch({ type: "LOGOUT" });
    logoutUser();
  };

  return (
    <div id="sidebar" className={classes.sidebarContainer}>
      <div id="sidebar-header">
        <button id="new-btn" onClick={onClickNewTopic}>
          <span>New Project</span>
          <i className="fas fa-plus-circle" />
        </button>
      </div>
      <div id="sidebar-list">
        <TopicsList screen={screen} navigate={navigate} />
        {topics.keys.length === 0 && !topics.loading && <NoTopicsMessage />}
      </div>
      <div id="sidebar-footer" className="pointer" onClick={onLogout}>
        <span className="sidebar-footer-option">
          <span className={classes.logoutText}>Logout</span>
          <i className="fas fa-sign-out-alt"></i>
        </span>
      </div>
    </div>
  );
};
