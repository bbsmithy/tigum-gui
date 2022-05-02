import React from "react";

const Sidebar = ({ topics, classes, closeMenu }) => {
  return (
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
  );
};

export default Sidebar;
