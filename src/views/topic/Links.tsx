import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { NewButton, LinkCard, LoadingCard } from '../../components';
import { Modal } from '../../components/Modal';
import { getLinks, createLink } from '../../clib/api';
import { useStateValue } from '../../state/StateProvider';
import { NewLink } from '../../clib/models';
import { setPageTitle } from '../../util';

const useStyles = createUseStyles({
  headerLoadingLink: {
    width: '70%',
    padding: 6,
    marginTop: 10,
    background: '#efefef',
    height: 6,
  },
  dateLoadingLink: {
    width: '50%',
    padding: 3,
    marginTop: 10,
    background: '#efefef',
    height: 6,
  },
});

export const Links = (props: any) => {
  const [newLinkModalIsOpen, setNewLinkModalOpen] = useState(false);
  const [linkTitle, setLinkTitle] = useState('');
  const [linkSrc, setLinkSrc] = useState('');
  const [loading, setLoading] = useState(true);
  const [creatingLink, setCreatingLink] = useState(false);
  const classes = useStyles();

  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: {
      links,
      selectedTopic,
      topics: { data },
    },
  } = state;

  const toggleModal = () => {
    setNewLinkModalOpen(!newLinkModalIsOpen);
  };

  const topic = data[selectedTopic];

  const fetchLinks = async (topic_content: Array<number>) => {
    try {
      const res = await getLinks(topic_content);
      dispatch({ type: 'SET_LINKS', payload: res });
      setLoading(false);
    } catch (e) {
      dispatch({ type: 'SET_LINKS', payload: [] });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (topic.links.length) {
      setPageTitle(`${topic.title} | Links`)
      fetchLinks(topic.links);
    } else {
      dispatch({ type: 'SET_LINKS', payload: [] });
      setLoading(false);
    }
  }, [topic.links]);

  const resetAddLink = () => {
    setLinkTitle('');
    setLinkSrc('');
  };

  const createNewLink = async () => {
    try {
      setCreatingLink(true);
      const newLink: NewLink = {
        topic_id: selectedTopic,
        source: linkSrc,
        title: linkTitle,
      };
      const res = await createLink(newLink);
      dispatch({ type: 'ADD_LINK', payload: res });
      setCreatingLink(false);
      toggleModal();
      resetAddLink();
    } catch (e) {
      setCreatingLink(false);
    }
  };

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setLinkTitle(e.currentTarget.value);
  };

  const onChangeSrc = (e: React.FormEvent<HTMLInputElement>) => {
    setLinkSrc(e.currentTarget.value);
  };

  const renderLinks = () => {
    if (!loading) {
      if (links.length) {
        return links.map((link: any) => <LinkCard link={link} key={link.id} />);
      } else {
        return renderNoLinks();
      }
    } else {
      return <LoadingCard />;
    }
  };

  const renderNoLinks = () => {
    return (
      <div className='no-resources-message'>
        <i className='fas fa-link' /> <span>No links yet</span>
      </div>
    );
  };

  return (
    <div className='ph2 mt4 pt3 w-100'>
      <NewButton onClick={toggleModal} text='New Link' />
      {renderLinks()}
      <Modal
        title='New Link'
        display={newLinkModalIsOpen}
        toggleModal={toggleModal}
        buttonText='Create Link'
        loadingAction={creatingLink}
        onClickAction={createNewLink}
      >
        <input
          type='text'
          placeholder='Title'
          id='topic-title-input'
          value={linkTitle}
          onChange={onChangeTitle}
        />
        <input
          type='text'
          placeholder='URL'
          id='topic-title-input'
          value={linkSrc}
          onChange={onChangeSrc}
        />
      </Modal>
    </div>
  );
};
