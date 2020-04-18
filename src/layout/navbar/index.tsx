import React, { useState, useEffect } from 'react';
import { OptionsButton, Option } from '../../components/OptionsButton';
import './styles.css';
import { useStateValue } from '../../state/StateProvider';
import { createUseStyles } from 'react-jss';
import { goto } from '../../util';

interface TopicNavigationBarProps {
  title: string;
  topic: any;
}

const topicMenuOptions: Array<Option> = [
  { title: 'Delete', icon: 'fas fa-trash', onClick: () => {} },
];

const useStyles = createUseStyles({
  mobileNavItemsContainer: {
    float: 'right',
  },
  mobileNavItemsButton: {
    color: 'white',
    fontSize: 12,
    backgroundColor: '#333',
    textAlign: 'center',
    padding: 5,
    borderRadius: 3,
    cursor: 'pointer',
  },
  mobileNavDropdown: {
    backgroundColor: '#333',
    borderRadius: 5,
    boxShadow: '2px 2px 1px 0px rgba(0, 0, 0, 0.75)',
    position: 'absolute',
    right: 15,
    marginTop: 3,
    color: 'white',
    fontSize: 12,
    padding: 5,
  },
  mobileNavItem: {
    padding: 7,
    textAlign: 'center',
    cursor: 'pointer',
  },
  selectedNavItem: {
    marginRight: 5,
  },
  selectedNavIcon: {
    marginRight: 5,
  },
});

const navItems = [
  {
    title: 'Notes',
    icon: 'fas fa-pen-square',
    screen: 0,
  },
  {
    title: 'Videos',
    icon: 'fab fa-youtube',
    screen: 1,
  },
  {
    title: 'Snippets',
    icon: 'fas fa-newspaper',
    screen: 2,
  },
  {
    title: 'Links',
    icon: 'fas fa-link',
    screen: 3,
  },
];

export const TopicNavigationBar = ({ title }: TopicNavigationBarProps) => {
  const [useMobileNavItems, setMobileNavItems] = useState(false);
  const [displayMobileNavOptions, setDisplayMobileNavOptions] = useState(false);
  const classes = useStyles();

  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: { selectedTopic },
    navigation: { showSidebar, useFullWidth, topicScreen },
  } = state;

  useEffect(() => {
    setNavOptionsType(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const setNavOptionsType = (width: number) => {
    if (width < 580) {
      setMobileNavItems(true);
    } else if (width > 580) {
      setMobileNavItems(false);
    }
  };

  const handleWindowResize = (evt) => {
    setNavOptionsType(evt.target.innerWidth);
  };

  const toggleSidebar = () => {
    const shouldUseFullWidth = window.innerWidth < 960;
    showSidebar
      ? dispatch({
          type: 'HIDE_SIDEBAR',
          payload: { useFullWidth: shouldUseFullWidth },
        })
      : dispatch({
          type: 'SHOW_SIDEBAR',
          payload: { useFullWidth: shouldUseFullWidth },
        });
  };

  const toggleMobileNavMenu = () => {
    setDisplayMobileNavOptions(!displayMobileNavOptions);
  };

  const renderNavItemsDesktop = () => {
    return navItems.map((navItem) => {
      return (
        <div
          className={`btn topic-nav-btn f6 f5-ns dib mr3 mr4-ns ${
            navItem.screen === topicScreen && 'selected'
          }`}
          key={navItem.title}
          onClick={() => {
            goto(`/topic/${selectedTopic}/${navItem.title.toLowerCase()}`);
          }}
        >
          <i className={navItem.icon} /> {navItem.title}
        </div>
      );
    });
  };

  const renderNavItemsMobile = () => {
    return (
      <div className={classes.mobileNavItemsContainer}>
        <div
          className={classes.mobileNavItemsButton}
          onClick={toggleMobileNavMenu}
        >
          <i
            className={`${navItems[topicScreen].icon} ${classes.selectedNavIcon}`}
          />
          <span className={classes.selectedNavItem}>
            {navItems[topicScreen].title}
          </span>
          <i
            className={`fas ${
              displayMobileNavOptions ? 'fa-chevron-up' : 'fa-chevron-down'
            }`}
          ></i>
        </div>
        {displayMobileNavOptions && (
          <div className={classes.mobileNavDropdown}>
            {navItems.map((item) => {
              if (item.screen === topicScreen) return;
              return (
                <div
                  className={classes.mobileNavItem}
                  onClick={() => {
                    dispatch({
                      type: 'SET_TOPIC_SCREEN',
                      payload: item.screen,
                    });
                    setDisplayMobileNavOptions(false);
                  }}
                >
                  <i className={`${item.icon} ${classes.selectedNavIcon}`} />
                  <span className={classes.selectedNavItem}>{item.title}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      className={`dt fixed topic-navigation-bar ${
        showSidebar && !useFullWidth ? 'w-80' : 'w-100'
      } border-box ph3 z-2`}
    >
      <div className='dtc'>
        <i
          className='fas fa-bars white pointer pr3'
          onClick={toggleSidebar}
        ></i>
        <h2 id='topic-header'>{title}</h2>
        <OptionsButton options={topicMenuOptions} />
      </div>
      <div className='dtc v-mid tr'>
        {useMobileNavItems ? renderNavItemsMobile() : renderNavItemsDesktop()}
      </div>
    </nav>
  );
};
