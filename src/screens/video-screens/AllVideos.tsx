import React, { useState, useEffect } from "react";
import { NewButton } from "../../components/";
import { Modal, VideoCard } from "../../components/";
import { createVideo, updateTopic, getVideos } from "../../client-lib/api";
import { getEmbedFromUrl } from "../../util/resource_to_html";
import { VIDEO_SCREENS } from "../../routers/VideoRouter";

import { createUseStyles } from "react-jss";
import { useStateValue } from "../../state/StateProvider";

const useStyles = createUseStyles({
  videoLoadingCover: {
    backgroundColor: "#efefef",
    height: 200,
    width: "100%",
    textAlign: "center"
  },
  headerLoadingNote: {
    width: "80%",
    padding: 6,
    marginTop: 10,
    background: "#efefef",

    height: 6
  },
  videoIconLoading: {
    fontSize: 50,
    marginTop: 90,
    color: "gray"
  }
});

export const AllVideos = (props: any) => {
  const [displayVideoModal, setVideoModal] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loadingVideos, setLoadingVideos] = useState(true);

  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: { videos }
  } = state;

  const classes = useStyles();

  const fetchVideos = async (ids: Array<number>) => {
    const res = await getVideos(ids);
    if (res.status === 200) {
      const body = await res.json();
      dispatch({ type: "SET_VIDEOS", payload: body });
      setLoadingVideos(false);
    }
  };

  useEffect(() => {
    fetchVideos(props.topic.videos);
  }, [props.topic.videos]);

  const toggleModal = () => {
    setVideoModal(!displayVideoModal);
  };

  const createVideoResource = async () => {
    const { embedUrl, thumbnailUrl } = getEmbedFromUrl(videoUrl);
    if (embedUrl && thumbnailUrl) {
      const res = await createVideo({
        thumbnail_img: thumbnailUrl,
        topic_id: props.topic.id,
        title: videoTitle,
        iframe: embedUrl,
        origin: videoUrl
      });
      if (res.status === 200) {
        const body = await res.json();
        dispatch({ type: "ADD_VIDEO", payload: body });
        toggleModal();
      }
    }
  };

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setVideoTitle(e.currentTarget.value);
  };

  const onChangeUrl = (e: React.FormEvent<HTMLInputElement>) => {
    setVideoUrl(e.currentTarget.value);
  };

  const onClickVideoCard = (video: any) => {
    props.navigate(VIDEO_SCREENS.VIDEO_PLAYER, video);
  };

  const onDeleteVideoCard = (index: number) => {
    let refreshedVideoResources = [...videos];
    delete refreshedVideoResources[index];
    dispatch({ type: "SET_VIDEOS", payload: refreshedVideoResources });
  };

  const renderVideosLoading = () => {
    return (
      <article className="br2 mv3 mw dib video-card ma3">
        <div className={classes.videoLoadingCover}>
          <i className={`fab fa-youtube ${classes.videoIconLoading}`}></i>
        </div>
        <div className="ph3-ns pv3-ns h-30">
          <div className="dib w-90">
            <div className={classes.headerLoadingNote} />
          </div>
          <div className="dib w-10">
            <span></span>
          </div>
        </div>
      </article>
    );
  };

  const renderVideoResources = () => {
    if (videos.length) {
      return videos.map((video, index) => {
        return (
          <VideoCard
            iframe={video.iframe}
            title={video.title}
            key={video.id}
            thumbnail_img={video.thumbnail_img}
            id={video.id}
            index={index}
            onClick={onClickVideoCard}
            onDelete={onDeleteVideoCard}
          />
        );
      });
    }
    return (
      <div className="no-resources-message">
        <i className="fab fa-youtube" /> <span>No videos yet</span>
      </div>
    );
  };

  return (
    <div className="ph2 mt4 pt3">
      <NewButton onClick={toggleModal} text="New Video" />
      <div className="center w-100 ph3">{renderVideoResources()}</div>
      <Modal
        title="New Video"
        display={displayVideoModal}
        toggleModal={toggleModal}
        onClickAction={createVideoResource}
        buttonText="Create Video"
      >
        <input
          type="text"
          placeholder="Video Title"
          id="topic-title-input"
          value={videoTitle}
          onChange={onChangeTitle}
        />
        <input
          type="text"
          placeholder="URL (Youtube)"
          id="topic-title-input"
          value={videoUrl}
          onChange={onChangeUrl}
        />
      </Modal>
    </div>
  );
};
