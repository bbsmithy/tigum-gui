import React from "react";
import { ArticleCard } from "../../components/ArticleCard";

const dummySnippets = [
  {
    origin:
      "https://techcrunch.com/2019/10/16/evervault-raises-3-2m-from-sequoia-kleiner-for-an-api-to-build-apps-with-privacy-baked-in/",
    content: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
rebum.`
  },
  {
    origin:
      "https://techcrunch.com/2019/10/16/evervault-raises-3-2m-from-sequoia-kleiner-for-an-api-to-build-apps-with-privacy-baked-in/",
    content: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
rebum.`
  },
  {
    origin:
      "https://techcrunch.com/2019/10/16/evervault-raises-3-2m-from-sequoia-kleiner-for-an-api-to-build-apps-with-privacy-baked-in/",
    content: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
rebum.`
  },
  {
    origin:
      "https://techcrunch.com/2019/10/16/evervault-raises-3-2m-from-sequoia-kleiner-for-an-api-to-build-apps-with-privacy-baked-in/",
    content: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
rebum.`
  }
];

export const ArticleSnippets = (props: any) => {
  if (true) {
    return (
      <div className="topic-section-container">
        {dummySnippets.map(snippet => {
          return (
            <ArticleCard content={snippet.content} origin={snippet.origin} />
          );
        })}
      </div>
    );
  }
  return (
    <div className="topic-section-container">
      <div className="no-resources-message">
        <i className="fas fa-newspaper" /> <span>No snippets yet</span>
      </div>
    </div>
  );
};
