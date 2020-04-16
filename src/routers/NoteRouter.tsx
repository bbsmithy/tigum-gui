import React from 'react';
import { AllNotes, ViewNote } from '../views/note';
import { Topic } from '../clib/models';

export enum NOTE_SCREENS {
  ALL_NOTES,
  VIEW_NOTE,
}

type NoteRouterType = {
  screen: NOTE_SCREENS;
  topic: Topic;
  note: any;
  navigate: (screen: NOTE_SCREENS, note: {}) => void;
};

export const NoteRouter = ({ screen, navigate, note }: NoteRouterType) => {
  switch (screen) {
    case NOTE_SCREENS.ALL_NOTES:
      return <AllNotes navigate={navigate} />;
    case NOTE_SCREENS.VIEW_NOTE:
      return <ViewNote navigate={navigate} note={note} />;
    default:
      return <div>Howya</div>;
  }
};
