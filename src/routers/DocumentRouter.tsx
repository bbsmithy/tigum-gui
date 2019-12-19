import React from "react";
import { AllDocuments } from "../screens/document-screens";
import { Topic } from "../client-lib/models";

export enum DOCUMENT_SCREENS {
  ALL_DOCUMENTS,
  VIEW_DOCUMENT
}

type DocumentRouterType = {
  screen: DOCUMENT_SCREENS;
  topic: Topic;
  document: any;
  navigate: (screen: DOCUMENT_SCREENS, document: {}) => void;
};

export const DocumentRouter = ({
  screen,
  navigate,
  document
}: DocumentRouterType) => {
  switch (screen) {
    case DOCUMENT_SCREENS.ALL_DOCUMENTS:
      return <AllDocuments navigate={navigate} />;
    default:
      return (
        <div className="topic-section-container">
          <div className="no-resources-message">
            <i className="fas fa-file-alt" /> <span>No documents yet</span>
          </div>
        </div>
      );
  }
};
