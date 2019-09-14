import React from "react";

export const ArticleSnippets = (props: any) => {
  return (
    <div className="topic-section-container">
      <h1>Article Snippets</h1>
      <p>{props.topic.content}</p>
    </div>
  );
};
