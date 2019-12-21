import React, { useState } from "react";
import { TOPIC_SCREENS } from "../routers/TopicRouter";
import { OptionsButton, Option } from "../components/OptionsButton";
import "./styles.css";

interface TopicNavigationBarProps {
  title: string;
  topic: any;
  navigate: (screen: TOPIC_SCREENS, topic: any) => void;
}

const topicMenuOptions: Array<Option> = [
  { title: "Delete", icon: "fas fa-trash", onClick: () => {} }
];

export const TopicNavigationBar = ({
  title,
  topic,
  navigate
}: TopicNavigationBarProps) => {
  const [selectedNavItem, setSelectedNavItem] = useState(0);

  const navItems = [
    {
      title: "My Notes",
      icon: "fas fa-pen-square",
      screen: TOPIC_SCREENS.MY_NOTES
    },
    {
      title: "Videos",
      icon: "fab fa-youtube",
      screen: TOPIC_SCREENS.VIDEOS
    },
    {
      title: "Article Snippets",
      icon: "fas fa-newspaper",
      screen: TOPIC_SCREENS.ARTICLE_SNIPPETS
    },
    {
      title: "Code",
      icon: "fas fa-code",
      screen: TOPIC_SCREENS.CODE
    },
    {
      title: "Images",
      icon: "fas fa-images",
      screen: TOPIC_SCREENS.IMAGES
    },
    {
      title: "Links",
      icon: "fas fa-link",
      screen: TOPIC_SCREENS.LINKS
    }
  ];

  const onSelectNavItem = (e: any) => {
    navigate(navItems[e.currentTarget.value].screen, topic.id);
    setSelectedNavItem(parseInt(e.currentTarget.value));
  };

  return (
    <nav className="dt fixed bg-white w-80 border-box ph3-ns bb b--light-gray z-2">
      <div className="dtc w-25">
        <h2 id="topic-header">{title}</h2>
        <OptionsButton options={topicMenuOptions} />
      </div>
      <div className="dtc v-mid w-75 tr">
        {navItems.map((navItem, idx) => {
          console.log(idx, selectedNavItem);
          return (
            <button
              className={`btn topic-nav-btn f6 f5-ns dib mr3 mr4-ns ${idx ===
                selectedNavItem && "selected"}`}
              key={navItem.title}
              value={idx}
              onClick={onSelectNavItem}
            >
              <i className={navItem.icon} /> {navItem.title}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
