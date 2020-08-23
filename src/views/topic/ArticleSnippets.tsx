import React, { useState, useEffect } from 'react';
import { ArticleCard, NewButton, Modal } from '../../components';
import { createUseStyles } from 'react-jss';
import { getArticleSnippets, createArticleSnippet } from '../../clib/api';
import { NewArticleSnippet } from '../../clib/models';

import { useStateValue } from '../../state/StateProvider';

const useStyles = createUseStyles({
  paragraphLoading: {
    width: '100%',
    marginTop: 10,
    height: 8,
    borderRadius: 5,
    backgroundColor: 'gray',
  },
  linkLoading: {
    width: '60%',
    marginTop: 30,
    height: 8,
    backgroundColor: 'gray',
    marginBottom: 10,
  },
  snippetBox: {
    height: 250,
  },
});

const Snippets = (props) => {
  const classes = useStyles();
  const { snippets, loading } = props;
  if (!loading) {
    if (snippets.length) {
      return snippets.map((snippet, idx) => {
        return (
          <ArticleCard
            content={snippet.content}
            origin={snippet.origin}
            index={idx}
            id={snippet.id}
            key={snippet.id}
          />
        );
      });
    } else {
      return (
        <div className='no-resources-message'>
          <i className='fas fa-newspaper' /> <span>No snippets yet</span>
        </div>
      );
    }
  } else {
    return (
      <article className='center shadow-card mw5 mw7-ns hidden br2 ba dark-gray b--black-10  mv3'>
        <div className='ph3 pv2'>
          <div className={classes.paragraphLoading}></div>
          <div className={classes.paragraphLoading}></div>
          <div className={classes.paragraphLoading}></div>
          <div className={classes.paragraphLoading}></div>
          <div className={classes.paragraphLoading}></div>
          <div className={classes.paragraphLoading}></div>
          <div className={classes.paragraphLoading}></div>
          <div className={classes.linkLoading}></div>
        </div>
      </article>
    );
  }
};

export const ArticleSnippets = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [createSnippetModalOpen, setCreateSnippetModalOpen] = useState(false);
  const [snippetContent, setSnippetContent] = useState('');

  const classes = useStyles();
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: { article_snippets, topics, selectedTopic },
  } = state;

  const fetchArticleSnippets = async (ids: number[]) => {
    setLoading(true);
    const res = await getArticleSnippets(ids);
    dispatch({ type: 'SET_SNIPPETS', payload: res });
    setLoading(false);
  };

  useEffect(() => {
    if (topics.data[selectedTopic].article_snippets) {
      fetchArticleSnippets(topics.data[selectedTopic].article_snippets);
    }
  }, [selectedTopic, topics.data]);

  const toggleModal = () => {
    setCreateSnippetModalOpen(!createSnippetModalOpen);
  };

  const createSnippet = async () => {
    if (snippetContent) {
      const newSnippet: NewArticleSnippet = {
        content: snippetContent,
        origin: 'TIGUM',
        topic_id: topics.data[selectedTopic].id,
      };
      const res = await createArticleSnippet(newSnippet);
      dispatch({ type: 'ADD_SNIPPET', payload: res });
      toggleModal();
    }
  };

  const onChangeSnippetContent = (e: any) => {
    setSnippetContent(e.target.value);
  };

  return (
    <div className='ph2 mt4 pt3'>
      <Modal
        title='Create snippet'
        buttonText='Create Snippet'
        display={createSnippetModalOpen}
        onClickAction={createSnippet}
        toggleModal={toggleModal}
      >
        <form className='w-100 black-80'>
          <textarea
            className={`${classes.snippetBox} db border-box hover-black w-100 ba b--black-20 pa2 br2 mb2`}
            onChange={onChangeSnippetContent}
          ></textarea>
        </form>
      </Modal>
      <NewButton onClick={toggleModal} text='New Snippet' />
      <Snippets snippets={article_snippets} loading={loading} />
    </div>
  );
};
