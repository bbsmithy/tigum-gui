import React, { ReactNode, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from './Button';

const useStyles = createUseStyles({
  modal: {
    position: 'fixed' /* Stay in place */,
    zIndex: 1000 /* Sit on top */,
    left: 0,
    top: 0,
    width: '100%' /* Full width */,
    height: '100%' /* Full height */,
    overflow: 'auto' /* Enable scroll if needed */,
    backgroundColor: 'rgba(0,0,0,.4)' /* Fallback color */,
  },
  modalShow: {
    display: 'block',
  },
  modalHidden: {
    display: 'none',
  },
  modalTitle: {
    fontSize: 13,
    padding: 5,
    display: 'inline',
    color: 'white',
  },
  /* Modal Header */
  modalHeader: {
    marginTop: 13,
    marginBottom: 10,
    padding: '2px 12px',
    color: 'black',
    '& h2': {
      fontFamily: 'Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: 25,
    },
  },
  /* Modal Body */
  modalBody: {
    padding: '2px 16px',
    marginBottom: 10,
  },
  /* Modal Footer */
  modalFooter: {
    height: 50,
  },
  /* Modal Content */
  modalContent: {
    position: 'relative',
    backgroundColor: '#333',
    margin: '5% auto' /* 15% from the top and centered */,
    padding: 5,
    border: '1px solid white',
    borderRadius: 5,
    maxWidth: 700,
    width: '100%',
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    animationName: 'animatetop',
    animationDuration: '0.2s',
  },
  close: {
    color: 'white',
    float: 'right',
    cursor: 'pointer',
  },
});


type ModalAction = {
  action: (data?: any) => void,
  textColor: string;
  text: string;
  position: string,
  icon?: string,
  btnColor?: string;

}
interface ModalProps {
  display: boolean;
  toggleModal: () => void;
  actions: Array<ModalAction>;
  onClickAction?: () => void;
  title: string;
  buttonText: string;
  actionDisabled?: boolean;
  children: ReactNode;
  loadingAction?: string;
}

export const Modal = (props: ModalProps) => {
  const classes = useStyles();

  console.log("loadingAction: ", props.loadingAction)

  return (
    <div
      id='app-modal'
      className={`${classes.modal} ${
        props.display ? classes.modalShow : classes.modalHidden
      }`}
    >
      <div className={classes.modalContent}>
        <div className={classes.modalHeader}>
          <h2 className={classes.modalTitle}>{props.title}</h2>
          <i
            className={`fas fa-times ${classes.close}`}
            onClick={props.toggleModal}
          ></i>
        </div>
        <div className={classes.modalBody}>{props.children}</div>
        <div className={classes.modalFooter}>

          {props.actions.map((a) => {
            if (a.position === "left") {
              return (
                <div className='fl ml3'>
                  <Button
                    disabled={props.actionDisabled}
                    onClickAction={a.action}
                    buttonText={a.text}
                    buttonColor={a.btnColor}
                    icon={a.icon}
                    loadingAction={props.loadingAction === a.text}
                  />
                </div>
              )
            } else {
              return (
                <div className='fr mr3'>
                  <Button
                    disabled={props.actionDisabled}
                    onClickAction={a.action}
                    icon={a.icon}
                    buttonColor={a.btnColor}
                    buttonText={a.text}
                    loadingAction={props.loadingAction === a.text}
                  />
                </div>
              )
            }
          })}
        </div>
      </div>
    </div>
  );
};
