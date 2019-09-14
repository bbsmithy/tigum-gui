import React, { useState, useEffect } from "react";
import { NoteRouter, NOTE_SCREENS } from "../../routers/NoteRouter";

export const MyNotes = (props: any) => {
  const [screen, setScreen] = useState(NOTE_SCREENS.ALL_NOTES);
  const [note, setNote] = useState();

  const navigate = (screen: NOTE_SCREENS, note: any) => {
    setScreen(screen);
    if (note) setNote(note);
  };

  useEffect(() => {
    navigate(NOTE_SCREENS.ALL_NOTES, {});
  }, [props.topic]);

  return (
    <NoteRouter
      topic={props.topic}
      note={note}
      screen={screen}
      setTopic={props.setTopic}
      navigate={navigate}
    />
  );
};
