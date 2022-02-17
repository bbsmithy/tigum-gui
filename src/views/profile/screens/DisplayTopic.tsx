import React from "react";
import { Outlet } from "react-router-dom";
import TopicHeader from "../components/TopicHeader";

const DisplayTopic = ({ classes, selectedTopic }) => {
  return (
    <>
      <>
        <div className="fl w-100">
          <div
            style={{
              borderRadius: 4,
              color: "white",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div style={{ width: "100%" }}>
              {selectedTopic && <TopicHeader selectedTopic={selectedTopic} />}
              <div style={{ marginTop: 15 }}>
                <Outlet />
              </div>
            </div>
            {/* {topics.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    color: "gray",
                    margin: "auto",
                    marginTop: "15%",
                  }}
                >
                  <i
                    className="far fa-folder-open"
                    style={{ fontSize: 35, marginBottom: 5 }}
                  ></i>
                  <h3>{user} hasn't published any topics yet</h3>
                </div>
              )} */}
          </div>
        </div>
      </>
      {/* {!loading && userNotFound && <UserNotFound userName={user} />} */}
      {/* {loading && (
        <div className={classes.loadingProfile}>
          <i
            className={`fas fa-circle-notch fa-spin white`}
            style={{ fontSize: 35, marginTop: 20 }}
          ></i>
          <h3 style={{ textAlign: "center" }}>Searching the cosmos</h3>
        </div>
      )} */}
    </>
  );
};

export default DisplayTopic;
