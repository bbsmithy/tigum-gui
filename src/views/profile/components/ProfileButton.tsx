import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  menuIcon: {
    "@media (min-width: 1000px)": {
      display: "none",
    },
    fontSize: 20,
  },
});

const ProfileButton = ({ openMenu, userName }) => {
  const classes = useStyles();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        color: "white",
        paddingLeft: 20,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,
        // borderBottom: "1px solid gray",
        alignItems: "center",
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <img
          src="https://avatars.githubusercontent.com/u/30689746?v=4"
          style={{ height: 30, borderRadius: 15 }}
        ></img>
        <h3 style={{ marginLeft: 10 }}>{userName}</h3>
      </div>
      <div style={{ textAlign: "center" }}>
        <i
          className={`fas fa-times white pointer pr3 ${classes.menuIcon}`}
          onClick={openMenu}
        ></i>
      </div>
    </div>
  );
};

export default ProfileButton;
