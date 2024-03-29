import React, { useState } from 'react';
import { NoTopicsMessage } from './NoTopicsMessage';
import { SCREENS } from '../../routers/MainRouter';
import { TopicsList } from './TopicsList';
import { useStateValue } from '../../state/StateProvider';
import { createUseStyles } from 'react-jss';
import { logoutUser } from '../../clib/api';
import { goto } from '../../util';
import { Modal } from '../../components';
import SettingsModal from './SettingsModal';

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
    display: "flex",
    '@media (max-width: 1195px)': {
      width: '100%',
      padding: 10,
      flexDirection: "column",
    },
    flexDirection: "row",
    margin: 3,
    paddingTop: 10,
    paddingBottom: 10
  },
  logoutText: {
    marginLeft: 8,
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
      margin: 2,
      padding: 5,
      marginRight: 10,
    },
    '@media (max-width: 1195px)': {
      width: '100%',
      padding: 7,
    },
  },
  logo: {
    flexGrow: 5,
    marginLeft: 10,
    '@media (max-width: 1195px)': {
      padding: 0,
      marginLeft: 0,
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
    flexGrow: 5,
    '@media (max-width: 1195px)': {
      width: '100%',
      marginBottom: 12,
    },
  },
  btnIcon: {
    marginRight: '10px',
    fontSize: 10,
  }
});

interface SideBarProps {
  screen: SCREENS;
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
          src={require('../../logo-tigum.png')}
          className={classes.logo}
          height={25}
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
        <span>New Topic</span>
      </button>
    </div>
  );
};

export const SideBar: React.FC<SideBarProps> = ({
  screen,
  toggleModal,
}: SideBarProps) => {

  const [accountModal, setAccountModal] = useState(false);

  const classes = useStyles();
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: { topics },
    navigation: { showSidebar },
  } = state;

  const noTopics = topics.keys.length === 0 && !topics.loading

  const onClickNewTopic = () => {
    toggleModal();
  };

  const toggleAccountModal = () => {
    setAccountModal(!accountModal)
  }

  if (showSidebar) {
    return (
      <>
        <div className={`${classes.sidebarContainer}`}>
          <SideBarHeader onClickNewTopic={onClickNewTopic} />
          {!noTopics && <TopicsList />}
          {noTopics && <NoTopicsMessage />}
          <div id='sidebar-footer' className='pointer' onClick={toggleAccountModal}>
            <span className='sidebar-footer-option'>
              <i className='fas fa-cog'></i>
              <span className={classes.logoutText}>Settings</span>
            </span>
          </div>
          <SettingsModal 
            display={accountModal} 
            toggle={toggleAccountModal}
          />
        </div>
      </>
    );
  }
  return null;
};
