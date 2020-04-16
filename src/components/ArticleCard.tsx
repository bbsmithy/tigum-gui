import React from 'react';
import { createUseStyles } from 'react-jss';
import { deleteArticleSnippet } from '../clib/api';
import { useStateValue } from '../state/StateProvider';

const useStyles = createUseStyles({
  divider: {
    border: '0.5px solid #efefef',
  },
});

export type ArticleCardProps = {
  origin: string;
  content: string;
  id: number;
  index: number;
};

export const ArticleCard = (props: ArticleCardProps) => {
  const classes = useStyles();

  // @ts-ignore
  const [state, dispatch] = useStateValue();
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
    <article className='center shadow-card mw5 mw7-ns hidden br2 ba b--black-10 text mv3'>
      <div className='pa3'>
        <p className='f6 f5-ns lh-copy'>{props.content}</p>
        <a href={props.origin} className='i f6'>
          {props.origin}
        </a>
        <button
          className='f6 fr link pointer br2 ph1 pv1 mb2 dib black bg-white '
          onClick={deleteSnippet}
        >
          <i className='fa fa-trash' /> Delete
        </button>
      </div>
    </article>
  );
};
