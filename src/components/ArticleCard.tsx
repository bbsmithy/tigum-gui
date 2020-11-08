import React from 'react';
import { createUseStyles } from 'react-jss';
import { deleteArticleSnippet } from '../clib/api';
import { useStateValue } from '../state/StateProvider';

const useStyles = createUseStyles({
  divider: {
    border: '0.5px solid #efefef',
  },
  snippet: {
    fontFamily: "Arial",
    width: "85%",
    maxWidth: 1000,
    '@media (max-width: 600px)':{
      width: "100%"
    },
    margin: "auto",
    marginTop: 15,
    padding: "8px 15px"
  },
  source: {
    color: "white",
  },
  sourceContainer: {
    flex: 1,
    overflow: "hidden"
  },
  deleteBtn: {
    borderRadius: 3,
    border: "none",
    backgroundColor: "#246bf8",
    color: "white",
    padding: 8,
    float: "right",
    fontSize: 13,
    cursor: "pointer"
  },
  deleteBtnConatiner: {
    flex: 1
  },
  controlsContainer:{
    display: "flex",
    justifyContent: "space-between"
  }
});

export type ArticleCardProps = {
  origin: string;
  content: string;
  id: number;
  index: number;
};

export const ArticleCard = (props: ArticleCardProps) => {
  // @ts-ignore
  const [state, dispatch] = useStateValue()
  const classes = useStyles()
  const {
    content: { article_snippets },
  } = state;

  const deleteSnippet = async () => {
    try {
      const res = await deleteArticleSnippet(props.id);
      if (res.status === 200) {
        let newSnippets = article_snippets;
        delete newSnippets[props.index];
        dispatch({ type: 'SET_SNIPPETS', payload: newSnippets });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <article className={`shadow-card hidden br3 ba b--black-10 text mv3 ${classes.snippet}`}>
      <p className='f6 f5-ns lh-copy white'>{props.content}</p>
      <div className={classes.controlsContainer}>
        <div className={classes.sourceContainer}>
          <a href={props.origin} target="blank" className={classes.source}>
            {props.origin}
          </a>
        </div>
        <div className={classes.deleteBtnConatiner}>
          <button
            className={classes.deleteBtn}
            onClick={deleteSnippet}
          >
            <i className='fa fa-trash' /> Delete
          </button>
        </div>
      </div>
    </article>
  );
};
