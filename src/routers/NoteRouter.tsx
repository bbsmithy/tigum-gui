import React from "react";
import { AllNotes, ViewNote } from "../screens/note-screens";
import { Topic } from "../client-lib/models";

export enum NOTE_SCREENS {
  ALL_NOTES,
  VIEW_NOTE
}

type NoteRouterType = {
  screen: NOTE_SCREENS;
  topic: Topic;
  note: any;
  setTopic: (topic: any) => void;
  navigate: (screen: NOTE_SCREENS, note: {}) => void;
};

export const NoteRouter = ({
  screen,
  topic,
  setTopic,
  navigate,
  note
}: NoteRouterType) => {
  switch (screen) {
    case NOTE_SCREENS.ALL_NOTES:
      return <AllNotes topic={topic} setTopic={setTopic} navigate={navigate} />;
    case NOTE_SCREENS.VIEW_NOTE:
      return <ViewNote navigate={navigate} note={note} />;
    default:
      return <div>Howya</div>;
  }
};
