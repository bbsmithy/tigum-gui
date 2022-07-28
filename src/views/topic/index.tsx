import React, { useEffect, useRef, useState } from "react";
import { Topic } from "../../clib/models";
import { getAllTopicResources } from "../../clib/api";
import {
  ArticleCard,
  LinkCard,
  LoadingCard,
  Note,
  VideoCard,
} from "../../components";
import { createUseStyles } from "react-jss";
import { goto } from "../../util";
import LoadingSnippet from "../../components/LoadingSnippet";
import { LoadingVideo } from "../../components/LoadingVideo";

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
  topic: Topic;
};

const useStyles = createUseStyles({
  container: {
    flexDirection: "row",
    display: "flex",
    width: "100%",
    padding: 10,
    marginTop: "4%",
  },
});

const Column = ({ resources }) => {
  return (
    <div style={{ flex: 1 }}>
      {resources?.map((r) => {
        if (r.result_type === "note") {
          return (
            <Note
              title={r.title}
              id={r.resource_id}
              topicId={r.topic_id}
              date_updated={r.updated}
              published={r.published}
            />
          );
        } else if (r.result_type === "video") {
          return (
            <VideoCard
              date_created=""
              date_updated={r.updated}
              published={r.published}
              iframe={r.misc1}
              title={r.title}
              thumbnail_img={r.misc2}
              id={r.resource_id}
              topicId={r.topicId}
              index={0}
              onClick={(video: any) => {
                goto(`topic/${r.topic_id}/videos/${video.id}`);
              }}
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
              published={r.published}
            />
          );
        } else {
          return (
            <ArticleCard
              onEdit={() => {}}
              content={r.title}
              origin={r.misc}
              id={0}
              index={0}
              published={r.published}
              title={r.misc2}
            />
          );
        }
      })}
    </div>
  );
};

const MainTopicScreen = ({ topic }: RouterProps) => {
  const [loading, setLoading] = useState(false);

  const [topicResources, setTopicResources] = useState({
    col1: [],
    col2: [],
  });

  const classes = useStyles();

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
      setLoading(true);
      const topicResources = await getAllTopicResources(topicId);
      const topicResourceColumns = splitToMasonaryRows(topicResources);
      topicsCache.current.set(topicId, topicResourceColumns);
      setTopicResources(topicResourceColumns);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopicResources(topic.id);
  }, [topic]);

  if (loading) {
    return (
      <div className={classes.container}>
        <div style={{ flex: 1 }}>
          <LoadingCard />
          <LoadingSnippet />
          <LoadingVideo />
        </div>
        <div style={{ flex: 1 }}>
          <LoadingSnippet />
          <LoadingCard />
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.container}>
        <Column resources={topicResources.col1} />
        <Column resources={topicResources.col2} />
      </div>
    );
  }
};

export default MainTopicScreen;
