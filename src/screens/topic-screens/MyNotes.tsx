import React from "react";
import { NoteRouter, NOTE_SCREENS } from "../../routers/NoteRouter";

export const MyNotes = (props: any) => {
  return <NoteRouter topic={props.data} screen={NOTE_SCREENS.ALL_NOTES} />;
};
