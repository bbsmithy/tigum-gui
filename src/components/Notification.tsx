import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    position: 'absolute',
    padding: 25,
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    borderRadius: 7,
    textAlign: 'center',
    minWidth: 170,
    zIndex: 5000,
  },
  icon: {
    color: 'white',
    marginRight: 10,
  },
  messageText: {
    color: 'white',
  },
  success: {
    backgroundColor: '#28a745',
  },
  progress: {
    backgroundColor: '#007bff',
  },
  error: {
    backgroundColor: '#dc3545',
  },
  warn: {
    backgroundColor: '#fd7e14',
  },
  left: {
    bottom: 20,
    left: 30,
  },
  right: {
    bottom: 20,
    right: 30,
  },
});

type NotificationProps = {
  variant: 'success' | 'error' | 'warn';
  message: string;
  position?: 'left' | 'right';
};

const NotificationIcon = ({ variant, iconClass }) => {
  switch (variant) {
    case 'success': {
      return (
        <i className={`fa fa-check-circle ${iconClass}`} aria-hidden='true'></i>
      );
    }
    case 'error': {
      return (
        <i
          className={`fa fa-exclamation-triangle ${iconClass}`}
          aria-hidden='true'
        ></i>
      );
    }
    case 'progress': {
      return <i className={`ml1 fas fa-circle-notch fa-spin ${iconClass}`}></i>;
    }
    case 'warn': {
      return (
        <i className={`fa fa-info-circle ${iconClass}`} aria-hidden='true'></i>
      );
    }
    default: {
      return null;
    }
  }
};

const Notification = ({
  message,
  variant,
  position = 'left',
}: NotificationProps) => {
  const classes = useStyles();
  return (
    <div
      className={`${classes.container} ${classes[variant]} ${classes[position]}`}
    >
      <NotificationIcon variant={variant} iconClass={classes.icon} />
      <span className={classes.messageText}>{message}</span>
    </div>
  );
};

export default Notification;
