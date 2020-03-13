import React, { useState } from 'react';
import { TOPIC_SCREENS } from '../routers/TopicRouter';
import { OptionsButton, Option } from '../components/OptionsButton';
import './styles.css';

interface TopicNavigationBarProps {
  title: string;
  topic: any;
  navigate: (screen: TOPIC_SCREENS, topic: any) => void;
}

const topicMenuOptions: Array<Option> = [
  { title: 'Delete', icon: 'fas fa-trash', onClick: () => {} }
];

export const TopicNavigationBar = ({
  title,
  topic,
  navigate
}: TopicNavigationBarProps) => {
  const [selectedNavItem, setSelectedNavItem] = useState(0);

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
    },
    {
      title: 'Test',
      icon: 'fas fa-graduation-cap',
      screen: TOPIC_SCREENS.IMAGES
    }
  ];

  return (
    <nav className='dt fixed topic-navigation-bar w-80 border-box ph3-ns z-2'>
      <div className='dtc'>
        <i className='fas fa-bars white pointer pr3'></i>
        <h2 id='topic-header'>{title}</h2>
        <OptionsButton options={topicMenuOptions} />
      </div>
      <div className='dtc v-mid tr'>
        {navItems.map((navItem, idx) => {
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
        })}
      </div>
    </nav>
  );
};
