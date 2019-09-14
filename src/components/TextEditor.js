import React, { useState } from "react";
import { Editor, EditorState } from "draft-js";

export const TextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onChange = state => {
    setEditorState(state);
  };
  return <Editor editorState={editorState} onChange={onChange} />;
};
