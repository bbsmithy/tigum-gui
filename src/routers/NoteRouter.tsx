import React from "react";
import { AllNotes } from "../screens/note-screens";
import { Topic } from "../sidebar-navigator/TopicItem";

export enum NOTE_SCREENS {
  ALL_NOTES,
  VIEW_NOTE
}

type NoteRouterType = {
  screen: NOTE_SCREENS;
  topic: Topic;
};

export const NoteRouter = ({ screen, topic }: NoteRouterType) => {
  switch (screen) {
    case NOTE_SCREENS.ALL_NOTES:
      return <AllNotes topic={topic} />;
    case NOTE_SCREENS.VIEW_NOTE:
      return;
    default:
      return <div>Howya</div>;
  }
};
