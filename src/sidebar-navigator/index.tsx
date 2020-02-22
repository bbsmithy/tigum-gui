import React from "react";
import { NoTopicsMessage } from "./NoTopicsMessage";
import { TOPIC_SCREENS } from "../routers/TopicRouter";
import { TopicsList } from "./TopicsList";
import { useStateValue } from "../state/StateProvider";
import { createUseStyles } from "react-jss";
import { logoutUser } from "../client-lib/api";

const useStyles = createUseStyles({
  sidebarContainer: {
    backgroundColor: "#333",
    color: "white",
    position: "fixed",
    left: 0,
    zIndex: 1000,
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.6)",
    width: "20%",
    height: "100%",
    flexDirection: "row",
    fontFamily: "Montserrat, sans-serif"
  },
  sidebarHeader: {
    display: "block",
    borderBottom: "1px solid rgba(0, 0, 0, 0.6)"
  },
  logoutText: {
    marginRight: 8
  },
  sidebarButton: {
    borderWidth: 0,
    outline: "none",
    borderRadius: 2,
    padding: 15,
    cursor: "pointer",
    backgroundColor: "#333",
    color: "white",
    fontSize: 15,
    fontWeight: 300,
    width: "50%"
  },
  btnIcon: {
    marginRight: "10px"
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
  // @ts-ignore
  const [state, dispatch] = useStateValue();

  const onClickNewTopic = () => {
    toggleModal();
  };

  const {
    content: { topics }
  } = state;

  const classes = useStyles();
  const onLogout = () => {
    dispatch({ type: "LOGOUT" });
    logoutUser();
  };

  return (
    <div className={classes.sidebarContainer}>
      <div className={classes.sidebarHeader}>
        <button
          className={classes.sidebarButton}
          style={{ borderRight: "1px solid black" }}
        >
          <i className={`fa fa-project-diagram ${classes.btnIcon}`} />
          <span>Flow</span>
        </button>
        <button className={classes.sidebarButton}>
          <i className={`far fa-file-alt ${classes.btnIcon}`} />
          <span>Docs</span>
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
