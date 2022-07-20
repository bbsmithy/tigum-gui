import React, { useState } from "react";
import { Button } from "./Button";
import ClickAwayListener from "./ClickAwayListener";

export const ImageSelectionDialog = ({
  y,
  x,
  onClickAway,
  openImageFiles,
  insertNewImageUrl,
  uploading,
}: {
  y: number;
  x: number;
  onClickAway: () => void;
  openImageFiles: () => void;
  insertNewImageUrl: (url: string) => void;
  uploading?: boolean;
}) => {
  const [imageUrl, setImageUrl] = useState("");

  const onClickDone = () => {
    insertNewImageUrl(imageUrl);
    onClickAway();
  };

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <div
        style={{
          position: "absolute",
          background: "white",
          padding: 10,
          borderRadius: 5,
          boxShadow: "0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%)",
          border: "1px solid gray",
          zIndex: 10000,
          width: 250,
          top: y,
          left: x,
          textAlign: "center",
        }}
      >
        <div style={{ flexDirection: "row", display: "flex" }}>
          <input
            style={{
              fontSize: 12,
              flex: 6,
              marginRight: 2,
              borderRadius: 5,
              border: "1px solid gray",
            }}
            value={imageUrl}
            onChange={(evt) => {
              setImageUrl(evt.target.value);
            }}
            type="text"
            id="url-md-input"
            placeholder="🔗 Enter Image URL"
          ></input>
          <button
            onClick={onClickDone}
            style={{
              fontSize: 13,
              background: "rgb(53, 126, 221)",
              border: "1px solid rgb(53, 126, 221)",
              boxShadow:
                "0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)",
              borderRadius: 5,
              padding: 6,
              cursor: "pointer",
              color: "white",
            }}
          >
            Done
          </button>
        </div>
        <p
          style={{
            textAlign: "center",
            marginTop: 10,
            marginBottom: 10,
            color: "#333",
          }}
        >
          or
        </p>
        <Button
          loadingAction={uploading}
          buttonText={uploading ? "Uploading" : "Upload Image"}
          onClickAction={openImageFiles}
          style={{ width: "100%" }}
        ></Button>
      </div>
    </ClickAwayListener>
  );
};
