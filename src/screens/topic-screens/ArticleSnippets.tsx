import React, { useState, useEffect } from "react";
import { ArticleCard } from "../../components/ArticleCard";
import { createUseStyles } from "react-jss";

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

const useStyles = createUseStyles({
  paragraphLoading: {
    width: "100%",
    marginTop: 10,
    padding: 6,
    height: 5,
    backgroundColor: "#efefef"
  },
  linkLoading: {
    width: "60%",
    marginTop: 30,
    padding: 5,
    height: 6,
    backgroundColor: "#efefef",
    marginBottom: 10
  }
});

export const ArticleSnippets = (props: any) => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setSnippets(dummySnippets);
      setLoading(false);
    }, 500);
  }, []);

  const renderSnippets = () => {
    return snippets.map(snippet => {
      return <ArticleCard content={snippet.content} origin={snippet.origin} />;
    });
  };

  const renderLoading = () => {
    return (
      <article className="center shadow-card mw5 mw7-ns hidden br2 ba dark-gray b--black-10  mv3">
        <div className="ph3 pv2">
          <div className={classes.paragraphLoading}></div>
          <div className={classes.paragraphLoading}></div>
          <div className={classes.paragraphLoading}></div>
          <div className={classes.paragraphLoading}></div>
          <div className={classes.linkLoading}></div>
        </div>
      </article>
    );
  };

  const renderNoSnippets = () => {
    return (
      <div className="topic-section-container">
        <div className="no-resources-message">
          <i className="fas fa-newspaper" /> <span>No snippets yet</span>
        </div>
      </div>
    );
  };

  return (
    <div className="topic-section-container">
      {loading ? renderLoading() : renderSnippets()}
      {!loading && !snippets.length && renderNoSnippets()}
    </div>
  );
};
