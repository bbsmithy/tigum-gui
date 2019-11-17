import React, { useState, useEffect } from "react";
import { ArticleCard, NewButton, Modal } from "../../components/";
import { createUseStyles } from "react-jss";
import { getArticleSnippets, createArticleSnippet } from "../../client-lib/api";
import { ArticleSnippet, NewArticleSnippet } from "../../client-lib/models";

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
  },
  snippetBox: {
    height: 250
  }
});

export const ArticleSnippets = (props: any) => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createSnippetModalOpen, setCreateSnippetModalOpen] = useState(false);
  const [snippetContent, setSnippetContent] = useState("");

  const classes = useStyles();

  const fetchArticleSnippets = async (ids: number[]) => {
    setLoading(true);
    const res = await getArticleSnippets(ids);
    const snippets = await res.json();
    setSnippets(snippets);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticleSnippets([3, 4, 5, 6, 7]);
  }, []);

  const renderSnippets = () => {
    return snippets.map(snippet => {
      return (
        <ArticleCard
          content={snippet.content}
          origin={snippet.origin}
          key={snippet.id}
        />
      );
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

  const toggleModal = () => {
    setCreateSnippetModalOpen(!createSnippetModalOpen);
  };

  const createSnippet = async () => {
    if (snippetContent) {
      const newSnippet: NewArticleSnippet = {
        content: snippetContent,
        origin: "TIGUM",
        topic_id: 123,
        user_id: 123
      };
      await createArticleSnippet(newSnippet);
      toggleModal();
      fetchArticleSnippets([4, 3, 5, 6, 7]);
    }
  };

  const onChangeSnippetContent = (e: any) => {
    setSnippetContent(e.target.value);
  };

  const renderAddSnippetModal = () => {
    return (
      <Modal
        title="Create snippet"
        buttonText="Create"
        display={createSnippetModalOpen}
        onClickAction={createSnippet}
        toggleModal={toggleModal}
      >
        <form className="w-100 black-80">
          <textarea
            className={`${classes.snippetBox} db border-box hover-black w-100 ba b--black-20 pa2 br2 mb2`}
            onChange={onChangeSnippetContent}
          ></textarea>
        </form>
      </Modal>
    );
  };

  return (
    <div className="topic-section-container">
      {renderAddSnippetModal()}
      <NewButton onClick={toggleModal} text="New Snippet" />
      {loading ? renderLoading() : renderSnippets()}
      {!loading && !snippets.length && renderNoSnippets()}
    </div>
  );
};
