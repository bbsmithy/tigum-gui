import React, { useState, useEffect } from "react";
import { DocumentRouter, DOCUMENT_SCREENS } from "../../routers/DocumentRouter";

export const Documents = (props: any) => {
  const [screen, setScreen] = useState(DOCUMENT_SCREENS.ALL_DOCUMENTS);
  const [document, setNote] = useState();

  const navigate = (screen: DOCUMENT_SCREENS, document: any) => {
    setScreen(screen);
    if (document) setNote(document);
  };

  useEffect(() => {
    navigate(DOCUMENT_SCREENS.ALL_DOCUMENTS, {});
  }, [props.topic]);

  return (
    <DocumentRouter
      topic={props.topic}
      document={document}
      screen={screen}
      navigate={navigate}
    />
  );
};
