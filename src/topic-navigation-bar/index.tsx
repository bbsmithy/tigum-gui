import React, { useState, useEffect } from 'react';
import { TOPIC_SCREENS } from '../routers/TopicRouter';
import { OptionsButton, Option } from '../components/OptionsButton';
import './styles.css';
import { useStateValue } from '../state/StateProvider';
import { createUseStyles } from 'react-jss';

interface TopicNavigationBarProps {
  title: string;
  topic: any;
  navigate: (screen: TOPIC_SCREENS, topic: any) => void;
}

const topicMenuOptions: Array<Option> = [
  { title: 'Delete', icon: 'fas fa-trash', onClick: () => {} }
];

const useStyles = createUseStyles({
  mobileNavItemsButton: {
    width: 70,
    color: 'white',
    fontSize: 12,
    backgroundColor: '#333',
    textAlign: 'center',
    float: 'right',
    padding: 5,
    borderRadius: 3,
    cursor: 'pointer'
  }
});

export const TopicNavigationBar = ({
  title,
  topic,
  navigate
}: TopicNavigationBarProps) => {
  const [selectedNavItem, setSelectedNavItem] = useState(0);
  const [useMobileNavItems, setMobileNavItems] = useState(false);
  const classes = useStyles();

  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    navigation: { showSidebar, useFullWidth }
  } = state;

  const handleWindowResize = evt => {
    if (evt.target.innerWidth < 650) {
      setMobileNavItems(true);
    } else if (evt.target.innerWidth > 650) {
      setMobileNavItems(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const toggleSidebar = () => {
    const shouldUseFullWidth = window.innerWidth < 960;

    showSidebar
      ? dispatch({
          type: 'HIDE_SIDEBAR',
          payload: { useFullWidth: shouldUseFullWidth }
        })
      : dispatch({
          type: 'SHOW_SIDEBAR',
          payload: { useFullWidth: shouldUseFullWidth }
        });
  };

  const navItems = [
    {
      title: 'Docs',
      icon: 'fas fa-pen-square',
      screen: TOPIC_SCREENS.MY_NOTES
    },
    {
      title: 'Videos',
      icon: 'fab fa-youtube',
      screen: TOPIC_SCREENS.VIDEOS
    },
    {
      title: 'Snippets',
      icon: 'fas fa-newspaper',
      screen: TOPIC_SCREENS.ARTICLE_SNIPPETS
    },
    {
      title: 'Links',
      icon: 'fas fa-link',
      screen: TOPIC_SCREENS.LINKS
    }
    // {
    //   title: 'Test',
    //   icon: 'fas fa-graduation-cap',
    //   screen: TOPIC_SCREENS.IMAGES
    // }
  ];

  const renderNavItemsDesktop = () => {
    return navItems.map((navItem, idx) => {
      return (
        <div
          className={`btn topic-nav-btn f6 f5-ns dib mr3 mr4-ns ${idx ===
            selectedNavItem && 'selected'}`}
          key={navItem.title}
          onClick={() => {
            navigate(navItem.screen, topic.id);
            setSelectedNavItem(idx);
          }}
        >
          <i className={navItem.icon} /> {navItem.title}
        </div>
      );
    });
  };

  const renderNavItemsMobile = () => {
    return (
      <div className={classes.mobileNavItemsButton}>
        <span>Nav</span>
        <i className={`fas fa-chevron-down`}></i>
      </div>
    );
  };

  return (
    <nav
      className={`dt fixed topic-navigation-bar ${
        showSidebar && !useFullWidth ? 'w-80' : 'w-100'
      } border-box ph3-ns z-2`}
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
