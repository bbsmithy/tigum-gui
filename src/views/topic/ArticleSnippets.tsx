import React, { useState, useEffect, useRef } from 'react';
import { ArticleCard, NewButton, Modal } from '../../components';
import { MarkdownEditor } from 'devkeep-md-editor';
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
    color: "white",
    border: "1px solid white",
    resize: "none"
  },
  snippetsContainer: {
    paddingBottom: 200
  },
  snippetLoading: {
    width: "85%",
    maxWidth: 1000,
    '@media (max-width: 600px)':{
      width: "100%"
    },
    margin: "auto",
    marginTop: 15,
    padding: "8px 15px"
  }
});

const theme = {
  toolbar: {
    background: '#424242',
    color: 'white',
    activeBtnBackground: '#242020',
    activeBtnColor: 'white',
    disabledBtnBackground: 'gray',
    disabledBtnColor: '#333',
  },
  preview: { background: '#424242', color: 'white' },
  editor: { background: '#424242', color: 'white' },
  cursorColor: 'white',
  height: '20vh'
};

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
      <article className={`shadow-card mw5 mw7-ns hidden br3 ba dark-gray b--black-10  mv3 ${classes.snippetLoading}`}>
          <div className={classes.paragraphLoading}></div>
          <div className={classes.paragraphLoading}></div>
          <div className={classes.paragraphLoading}></div>
          <div className={classes.paragraphLoading}></div>
          <div className={classes.paragraphLoading}></div>
          <div className={classes.paragraphLoading}></div>
          <div className={classes.paragraphLoading}></div>
          <div className={classes.linkLoading}></div>
      </article>
    );
  }
};

export const ArticleSnippets = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [createSnippetModalOpen, setCreateSnippetModalOpen] = useState(false);
  const [snippetContent, setSnippetContent] = useState('');
  const cmRef = useRef()

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

  const codeMirrorHandle = (cm) => {
    cmRef.current = cm
  }

  const onCreateSnippet = async () => {
    try {
        if (cmRef.current) {
          // @ts-ignore
          const snippetValue = cmRef.current.getValue()
          if (snippetValue) {
            const newSnippet: NewArticleSnippet = {
              content: snippetValue,
              origin: 'TIGUM',
              topic_id: topics.data[selectedTopic].id,
            };
            const res = await createArticleSnippet(newSnippet);
            dispatch({ type: 'ADD_SNIPPET', payload: res });
            toggleModal();
          }
        }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='ph2 mt4 pt3'>
      <Modal
        title='Create snippet'
        buttonText='Create Snippet'
        display={createSnippetModalOpen}
        onClickAction={onCreateSnippet}
        toggleModal={toggleModal}
      >
          <MarkdownEditor
            initialValue={''}
            onSave={onCreateSnippet}
            codeMirrorHandle={codeMirrorHandle}
            spellChecker={false}
            useHighlightJS
            highlightTheme='agate'
            theme={theme}
            title={""}
            onEditTitle={(title) => alert(title)}
            autoFocusEditTitle={true}
          />
      </Modal>
      <NewButton onClick={toggleModal} text='New Snippet' />
      <div className={classes.snippetsContainer}>
        <Snippets snippets={article_snippets} loading={loading} />
      </div>
    </div>
  );
};
