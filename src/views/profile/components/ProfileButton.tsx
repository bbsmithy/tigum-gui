import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  menuIcon: {
    "@media (max-width: 1000px)": {
      marginTop: 20,
    },
    "@media (min-width: 1000px)": {
      display: "none",
    },
  },
});

const ProfileButton = ({ openMenu, userName }) => {
  const classes = useStyles();

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        color: "white",
        padding: 10,
        borderBottom: "1px solid gray",
      }}
    >
      <i
        className={`fas fa-bars white pointer pr3 ${classes.menuIcon}`}
        onClick={openMenu}
      ></i>
      <img
        src="https://avatars.githubusercontent.com/u/30689746?v=4"
        style={{ height: 40, marginTop: 7, borderRadius: 20 }}
      ></img>
      <h3 style={{ marginLeft: 10 }}>{userName}</h3>
    </div>
  );
};

export default ProfileButton;
