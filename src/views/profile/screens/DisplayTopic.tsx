import React from "react";
import { Outlet } from "react-router-dom";
import TopicHeader from "../components/TopicHeader";
import { usePublicResourcesForTopic } from "../hooks";

const DisplayTopic = ({ classes, selectedTopic, onClickMenu, topics }) => {
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
              {selectedTopic && (
                <TopicHeader
                  selectedTopic={selectedTopic}
                  onClickMenu={onClickMenu}
                />
              )}
              <div style={{ marginTop: 15 }}>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default DisplayTopic;
