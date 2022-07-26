import React, { useEffect, useRef, useState } from "react";
import { ArticleSnippets, Links, Loading } from "../views/topic";
import { AllNotes, ViewNote } from "../views/note";
import { AllVideos, VideoPlayer } from "../views/video";
import { Topic } from "../clib/models";
import { getAllTopicResources } from "../clib/api";
import { ArticleCard, LinkCard, Note, VideoCard } from "../components";

export enum SCREENS {
  LINKS,
  ARTICLE_SNIPPETS,
  ALL_VIDEOS,
  ALL_NOTES,
  VIDEO_PLAYER,
  VIEW_NOTE,
  CODE,
  IMAGES,
  EXCERCISES,
  LOADING,
  NONE,
}

type RouterProps = {
  screen: SCREENS;
  topic: Topic;
};

const Column = ({ resources }) => {
  return (
    <div style={{ flex: 1 }}>
      {resources?.map((r) => {
        if (r.result_type === "note") {
          return (
            <Note
              note={{ title: r.title, id: r.resource_id, topicId: r.topic_id }}
            />
          );
        } else if (r.result_type === "video") {
          return (
            <VideoCard
              date_created="tets"
              date_updated="test"
              iframe={r.misc1}
              title={r.title}
              thumbnail_img={r.misc2}
              id={r.resource_id}
              topicId={r.topicId}
              index={0}
              published={false}
              onClick={() => {}}
              onDelete={() => {}}
            />
          );
        } else if (r.result_type === "link") {
          return (
            <LinkCard
              title={r.title}
              id={r.resource_id}
              source={r.misc}
              favicon_source={r.misc2}
              index={0}
              published={false}
            />
          );
        } else {
          return (
            <ArticleCard
              onEdit={() => {}}
              content={r.title}
              origin={""}
              id={0}
              index={0}
              published={false}
              title={""}
            />
          );
        }
      })}
    </div>
  );
};

export const MainRouter = ({ screen, topic }: RouterProps) => {
  const [topicResources, setTopicResources] = useState({
    col1: [],
    col2: [],
  });

  const topicsCache = useRef(new Map<number, any>());
  const splitToMasonaryRows = (resources) => {
    const columns = {
      col1: [],
      col2: [],
    };
    resources.forEach((r, idx) => {
      if (idx % 2 === 0) {
        columns.col2.push(r);
      } else {
        columns.col1.push(r);
      }
    });
    return columns;
  };

  const fetchTopicResources = async (topicId: number) => {
    const cachedTopic = topicsCache.current.get(topicId);
    if (cachedTopic) {
      setTopicResources(cachedTopic);
    } else {
      const topicResources = await getAllTopicResources(topicId);
      const topicResourceColumns = splitToMasonaryRows(topicResources);
      topicsCache.current.set(topicId, topicResourceColumns);
      setTopicResources(topicResourceColumns);
    }
  };

  useEffect(() => {
    fetchTopicResources(topic.id);
  }, [topic]);

  return (
    <div
      style={{
        flexDirection: "row",
        display: "flex",
        width: "100%",
        padding: 10,
        marginTop: "5%",
      }}
    >
      <Column resources={topicResources.col1} />
      <Column resources={topicResources.col2} />
    </div>
  );
};
