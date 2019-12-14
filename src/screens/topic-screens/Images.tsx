import React, { useEffect, useState } from "react";
import { getImages, createImage } from "../../client-lib/api";
import { Topic, NewImage } from "../../client-lib/models";
import { NewButton, Modal, ImageCard } from "../../components/";
import { createUseStyles } from "react-jss";
import { useStateValue } from "../../state/StateProvider";

type ImagescreenProps = {
  topic: Topic;
};

const useStyles = createUseStyles({
  codeBox: {
    height: 250,
    marginTop: 10
  }
});

export const Images = (props: ImagescreenProps) => {
  const [codeModalOpen, setImageModalOpen] = useState(false);
  const [imageSrc, setImageSource] = useState();
  const [loadingImages, setLoadingImages] = useState(true);
  const [creatingImage, setCreatingImage] = useState(false);

  // @ts-ignore
  const [
    {
      content: { images }
    },
    dispatch
  ] = useStateValue();

  const classes = useStyles();

  const fetchImages = async () => {
    console.log(props.topic);
    if (props.topic.images) {
      setLoadingImages(true);
      const res = await getImages(props.topic.images);
      console.log(props.topic);
      dispatch({ type: "SET_IMAGES", payload: res });
      setLoadingImages(false);
    } else {
      setLoadingImages(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [props.topic]);

  const toggleModal = () => {
    setImageModalOpen(!codeModalOpen);
  };

  const onChangeSrcUrl = (e: any) => {
    setImageSource(e.target.value);
  };

  const onClickCreateImagesnippet = async () => {
    if (imageSrc) {
      let newImage: NewImage = {
        src: imageSrc,
        origin: "TIGUM",
        topic_id: props.topic.id,
        user_id: 123
      };
      try {
        setCreatingImage(true);
        const res = await createImage(newImage);
        setCreatingImage(false);
        setImageModalOpen(false);
        let result = { ...newImage, id: res.id };
        dispatch({ type: "ADD_IMAGE", payload: result });
      } catch (e) {
        setImageModalOpen(false);
      }
    }
    return;
  };

  const renderAddSnippetModal = () => {
    return (
      <Modal
        title="Create Image"
        buttonText="Create"
        display={codeModalOpen}
        loadingAction={creatingImage}
        onClickAction={onClickCreateImagesnippet}
        toggleModal={toggleModal}
      >
        <input
          type="text"
          placeholder="Image url"
          id="topic-title-input"
          value={imageSrc}
          onChange={onChangeSrcUrl}
        />
      </Modal>
    );
  };

  const renderLoading = () => {
    return (
      <article className="center shadow-card mw5 mw7-ns hidden br2 ba dark-gray b--black-10  mv3">
        <div className="ph3 pv2">loading</div>
      </article>
    );
  };

  const renderImages = () => {
    if (!loadingImages) {
      if (images.length) {
        return images.map(image => {
          return <ImageCard src={image.src} origin={image.origin} />;
        });
      } else {
        return (
          <div className="no-resources-message">
            <i className="fas fa-image" /> <span>No images yet</span>
          </div>
        );
      }
    }
    return renderLoading();
  };

  return (
    <div className="topic-section-container">
      {renderImages()}
      {renderAddSnippetModal()}
      <NewButton onClick={toggleModal} text="New Image" />
    </div>
  );
};
