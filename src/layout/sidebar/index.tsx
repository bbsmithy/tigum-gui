import React from 'react';
import { NoTopicsMessage } from './NoTopicsMessage';
import { TOPIC_SCREENS } from '../../routers/TopicRouter';
import { TopicsList } from './TopicsList';
import { useStateValue } from '../../state/StateProvider';
import { createUseStyles } from 'react-jss';
import { logoutUser } from '../../clib/api';

const useStyles = createUseStyles({
  sidebarContainer: {
    backgroundColor: '#333',
    color: 'white',
    position: 'fixed',
    width: '20%',
    minWidth: 200,
    left: 0,
    zIndex: 1000,
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.6)',
    height: '100%',
    fontFamily: 'Montserrat, sans-serif',
  },
  sidebarHeader: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
    '@media (max-width: 1195px)': {
      width: '100%',
      padding: 10,
    },
    margin: 3,
  },
  logoutText: {
    marginRight: 8,
  },
  sidebarButton: {
    borderWidth: 0,
    outline: 'none',
    borderRadius: 2,
    cursor: 'pointer',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.6)',
    color: 'white',
    backgroundColor: '#1f1f1f',
    '@media (min-width: 1196px)': {
      float: 'right',
      margin: 2,
      padding: 5,
      marginTop: 10,
      marginRight: 10,
    },
    '@media (max-width: 1195px)': {
      width: '100%',
      padding: 7,
    },
  },

  logo: {
    padding: 10,
    '@media (max-width: 1195px)': {
      padding: 0,
    },
  },
  closeIcon: {
    padding: 2.5,
    '@media (min-width: 1195px)': {
      padding: 0,
      display: 'none',
    },
  },
  logoContainer: {
    '@media (max-width: 1195px)': {
      width: '100%',
      marginBottom: 12,
    },
  },
  btnIcon: {
    marginRight: '10px',
    fontSize: 10,
  },
});

interface SideBarProps {
  navigate: (screen: TOPIC_SCREENS, data: any) => void;
  screen: TOPIC_SCREENS;
  toggleModal: () => void;
}

const SideBarHeader = (props) => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();

  const classes = useStyles();

  const closeSidebar = () => {
    dispatch({ type: 'HIDE_SIDEBAR', payload: { useFullWidth: true } });
  };

  return (
    <div className={classes.sidebarHeader}>
      <div className={`dib ${classes.logoContainer}`}>
        <img
          src={require('../../logo.png')}
          className={classes.logo}
          height={22}
        />
        <i
          className={`fas fa-bars white pointer fr ${classes.closeIcon}`}
          onClick={closeSidebar}
        ></i>
      </div>
      <button
        className={`${classes.sidebarButton} btn`}
        onClick={props.onClickNewTopic}
      >
        <i className={`fa fa-plus-circle ${classes.btnIcon}`} />
        <span>New Project</span>
      </button>
    </div>
  );
};

export const SideBar: React.FC<SideBarProps> = ({
  navigate,
  screen,
  toggleModal,
}: SideBarProps) => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();

  const onClickNewTopic = () => {
    toggleModal();
  };

  const {
    content: { topics },
    navigation: { showSidebar },
  } = state;

  const classes = useStyles();
  const onLogout = () => {
    dispatch({ type: 'LOGOUT' });
    logoutUser();
  };
  if (showSidebar) {
    return (
      <div className={`${classes.sidebarContainer}`}>
        <SideBarHeader onClickNewTopic={onClickNewTopic} />
        <TopicsList screen={screen} navigate={navigate} />
        {topics.keys.length === 0 && !topics.loading && <NoTopicsMessage />}
        <div id='sidebar-footer' className='pointer' onClick={onLogout}>
          <span className='sidebar-footer-option'>
            <span className={classes.logoutText}>Logout</span>
            <i className='fas fa-sign-out-alt'></i>
          </span>
        </div>
      </div>
    );
  }
  return null;
};
