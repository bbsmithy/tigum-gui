import React, { useState, useEffect } from "react";
import { ArticleCard } from "../../components/ArticleCard";
import { ArticleCardProps } from "../../types";

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
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setSnippets(dummySnippets);
    }, 500);
  }, []);

  if (snippets.length) {
    return (
      <div className="topic-section-container">
        {snippets.map(snippet => {
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
