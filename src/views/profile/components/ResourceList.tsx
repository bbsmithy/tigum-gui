import React, { useEffect, useState } from "react";
import { getDate } from "../../../util";
import marked from "marked";
import { LinkCard, VideoCard } from "../../../components";
import { getPublicNotes } from "../../../clib/api";
import { useNotes, useVideos } from "../hooks";

export const NotesList = ({ selectedTopic }: { selectedTopic: any }) => {
  const [notes, isLoading, error] = useNotes(selectedTopic?.id);

  if (isLoading) {
    return <h1>LOADING</h1>;
  }

  if (error) {
    return "ERROR";
  }

  if (notes && notes.length > 0) {
    return notes.map((note) => {
      const renderDate = () => {
        const dateText = new Date(note.date_updated);
        return getDate(dateText);
      };

      return (
        <div className="card w-33 note-card pointer">
          <div className="mw9 center">
            <div className="cf ph2-ns">
              <div
                className="fl ph2 w-90 pv3"
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <h4 style={{ marginTop: 4, marginBottom: 0 }}>{note.title}</h4>
                <div
                  style={{
                    fontSize: 13,
                    marginTop: 10,
                    fontStyle: "italic",
                    color: "gray",
                  }}
                >
                  {renderDate()}
                </div>
              </div>
              <div className="fl w-10 pv4">
                <div>
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  } else {
    return (
      <div>
        <span>No notes yet</span>
      </div>
    );
  }
};

export const SnippetList = ({ selectedTopic }) => {
  if (false) {
    // return snippets.map((snippet, idx) => {
    //   return (
    //     <>
    //       <div
    //         className="note-card"
    //         style={{
    //           padding: 10,
    //           marginTop: 10,
    //           borderRadius: 5,
    //         }}
    //       >
    //         <h4 style={{ marginTop: 5, marginBottom: 5 }}>{snippet.title}</h4>
    //         <div
    //           dangerouslySetInnerHTML={{ __html: marked(snippet.content) }}
    //         />
    //         {snippet.origin != "TIGUM" && (
    //           <div style={{ marginTop: 10 }}>
    //             Source:{" "}
    //             <a
    //               href={`${snippet.origin}`}
    //               target="blank"
    //               style={{ color: "rgb(36, 107, 248)" }}
    //             >
    //               {snippet.origin}
    //             </a>
    //           </div>
    //         )}
    //       </div>
    //     </>
    //   );
    // });
  } else {
    return (
      <div className="no-resources-message">
        <i className="fas fa-newspaper" /> <span>No snippets yet</span>
      </div>
    );
  }
};

export const VideoList = ({ selectedTopic }) => {
  const [videos, isLoading, error] = useVideos(selectedTopic?.id);

  if (isLoading) {
    return "LOADING";
  }

  if (error) {
    console.log(error);
    return "Errr";
  }

  if (videos && videos.length > 0) {
    return videos.map((video, idx) => {
      return <VideoCard {...video} />;
    });
  } else {
    return (
      <div className="no-resources-message">
        <i className="fab fa-youtube" /> <span>No videos yet</span>
      </div>
    );
  }
};

export const LinkList = ({ selectedTopic }) => {
  if (false) {
    // return links.map((link, idx) => {
    //   return <LinkCard link={link} onClick={() => {}} />;
    // });
  } else {
    return (
      <div className="no-resources-message">
        <i className="fas fa-link" /> <span>No links yet</span>
      </div>
    );
  }
};
