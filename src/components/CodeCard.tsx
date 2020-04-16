import React from 'react';
import { createUseStyles } from 'react-jss';
import { divider } from '../styles';
import { deleteCode } from '../clib/api';
import { useStateValue } from '../state/StateProvider';

type CodeCardProps = {
  id: number;
  index: number;
  content: string;
  origin: string;
};

const useStyles = createUseStyles({
  divider,
});

export const CodeCard = (props: CodeCardProps) => {
  const classes = useStyles();

  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: { codes },
  } = state;

  const deleteCodeBlock = async () => {
    try {
      const res = await deleteCode(props.id);
      if (res.status === 200) {
        let newCodes = codes;
        delete newCodes[props.index];
        dispatch({ type: 'SET_CODES', payload: newCodes });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <article className='center shadow-card mw5 mw7-ns hidden br2 ba dark-gray b--black-10  mv3'>
      <div className='pa3'>
        <p className='f6 f5-ns lh-copy'>{props.content}</p>
        <hr className={classes.divider} />
        <a href={props.origin} className='i f6'>
          {props.origin}
        </a>
        <button
          className='f6 fr link pointer br2 ph1 pv1 mb2 dib black bg-white '
          onClick={deleteCodeBlock}
        >
          <i className='fa fa-trash' /> Delete
        </button>
      </div>
    </article>
  );
};
