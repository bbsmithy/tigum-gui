import React, { useEffect, useState } from 'react';
import { getImages, createImage } from '../../clib/api';
import { Topic, NewImage } from '../../clib/models';
import { NewButton, Modal, ImageCard } from '../../components';
import { createUseStyles } from 'react-jss';
import { useStateValue } from '../../state/StateProvider';

type ImagescreenProps = {
  topic: Topic;
};

export const Images = (props: ImagescreenProps) => {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageSrc, setImageSource] = useState();
  const [loadingImages, setLoadingImages] = useState(true);
  const [creatingImage, setCreatingImage] = useState(false);

  // @ts-ignore
  const [
    {
      content: { images },
    },
    dispatch,
  ] = useStateValue();

  const fetchImages = async () => {
    if (props.topic.images) {
      setLoadingImages(true);
      const res = await getImages(props.topic.images);
      dispatch({ type: 'SET_IMAGES', payload: res });
      setLoadingImages(false);
    } else {
      setLoadingImages(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [props.topic]);

  const toggleModal = () => {
    setImageModalOpen(!imageModalOpen);
  };

  const onChangeSrcUrl = (e: any) => {
    setImageSource(e.target.value);
  };

  const onClickCreateImagesnippet = async () => {
    if (imageSrc) {
      let newImage: NewImage = {
        src: imageSrc,
        origin: 'TIGUM',
        topic_id: props.topic.id,
      };
      try {
        setCreatingImage(true);
        const res = await createImage(newImage);
        setCreatingImage(false);
        setImageModalOpen(false);
        let result = { ...newImage, id: res.id };
        dispatch({ type: 'ADD_IMAGE', payload: result });
      } catch (e) {
        setImageModalOpen(false);
      }
    }
    return;
  };

  const renderAddSnippetModal = () => {
    return (
      <Modal
        title='Create Image'
        buttonText='Create'
        display={imageModalOpen}
        loadingAction={creatingImage}
        onClickAction={onClickCreateImagesnippet}
        toggleModal={toggleModal}
      >
        <input
          type='text'
          placeholder='Image url'
          id='topic-title-input'
          value={imageSrc}
          onChange={onChangeSrcUrl}
        />
      </Modal>
    );
  };

  const renderLoading = () => {
    return (
      <article className='center shadow-card mw5 mw7-ns hidden br2 ba dark-gray b--black-10  mv3'>
        <div className='ph3 pv2'>loading</div>
      </article>
    );
  };

  const renderImages = () => {
    if (!loadingImages) {
      if (images.length) {
        return images.map((image, idx) => {
          return (
            <ImageCard
              src={image.src}
              origin={image.origin}
              id={image.id}
              index={idx}
            />
          );
        });
      } else {
        return (
          <div className='no-resources-message'>
            <i className='fas fa-image' /> <span>No images yet</span>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className='ph2 mt4 pt3'>
      {renderImages()}
      {renderAddSnippetModal()}
      <NewButton onClick={toggleModal} text='New Image' />
    </div>
  );
};
