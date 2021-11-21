import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  button: {
    border: 'none',
    fontSize: '.875rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '.5rem',
    paddingBottom: '.5rem',
    color: 'white',
    borderRadius: 5,
    cursor: 'pointer',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
  },

});

export const Button = (props) => {
  const { loadingAction, buttonText, onClickAction, disabled, icon, buttonColor = "#357edd" } = props;
  const classes = useStyles();

  return (
    <button className={classes.button} disabled={disabled} style={{backgroundColor: disabled ? "gray" : buttonColor }} onClick={onClickAction}>
      {loadingAction ? (
        <i className='fas fa-circle-notch fa-spin'></i>
      ) : (
        <>
        {buttonText}
        {icon && <i className={icon} style={{ marginLeft: 5 }}></i>}
        </>
      )}
    </button>
  );
};
