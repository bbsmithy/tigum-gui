import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { NewButton, LinkCard } from "../../components";
import { Modal } from "../../components/Modal";
import { getLinks, createLink } from "../../client-lib/api";
import { useStateValue } from "../../state/StateProvider";
import { NewLink } from "../../client-lib/models";

const useStyles = createUseStyles({
  headerLoadingLink: {
    width: "70%",
    padding: 6,
    marginTop: 10,
    background: "#efefef",
    height: 6
  },
  dateLoadingLink: {
    width: "50%",
    padding: 3,
    marginTop: 10,
    background: "#efefef",
    height: 6
  }
});

export const Links = (props: any) => {
  const [newLinkModalIsOpen, setNewLinkModalOpen] = useState(false);
  const [linkTitle, setLinkTitle] = useState("");
  const [linkSrc, setLinkSrc] = useState("");
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: {
      links,
      selectedTopic,
      topics: { data }
    }
  } = state;

  const toggleModal = () => {
    setNewLinkModalOpen(!newLinkModalIsOpen);
  };

  const topic = data[selectedTopic];

  const fetchLinks = async (topic_content: Array<number>) => {
    try {
      const res = await getLinks(topic_content);
      dispatch({ type: "SET_LINKS", payload: res.reverse() });
      setLoading(false);
    } catch (e) {
      console.log(e);
      dispatch({ type: "SET_LINKS", payload: [] });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (topic.links.length) {
      fetchLinks(topic.links);
    } else {
      dispatch({ type: "SET_LINKS", payload: [] });
      setLoading(false);
    }
  }, [topic.links]);

  const createNewLink = async () => {
    const newLink: NewLink = {
      topic_id: selectedTopic,
      user_id: 123,
      source: linkSrc,
      title: linkTitle
    };
    const res = await createLink(newLink);
    if (res.status === 200) {
      const newLink = await res.json();
      dispatch({ type: "ADD_LINK", payload: newLink });
      toggleModal();
      setLinkTitle("");
    }
  };

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setLinkTitle(e.currentTarget.value);
  };

  const onChangeSrc = (e: React.FormEvent<HTMLInputElement>) => {
    setLinkSrc(e.currentTarget.value);
  };

  const renderLoading = () => {
    return (
      <div className="card note-card">
        <div className="mw9 center">
          <div className="cf ph2-ns pb4">
            <div className="fl ph2 w-90 pv1">
              <div className="bg-white">
                <div className={classes.headerLoadingLink}></div>
                <div className={classes.dateLoadingLink}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderLinks = () => {
    return links.map((link: any) => <LinkCard link={link} key={link.id} />);
  };

  const renderNoLinks = () => {
    return (
      <div className="no-resources-message">
        <i className="fas fa-link" /> <span>No links yet</span>
      </div>
    );
  };

  return (
    <div className="ph2 mt4 pt3">
      <NewButton onClick={toggleModal} text="New Link" />
      {console.log(loading, links)}
      {loading ? renderLoading() : renderLinks()}
      {!links.length && !loading && renderNoLinks()}
      <Modal
        title="New Link"
        display={newLinkModalIsOpen}
        toggleModal={toggleModal}
        buttonText="Add Link"
        onClickAction={createNewLink}
      >
        <input
          type="text"
          placeholder="Title"
          id="topic-title-input"
          value={linkTitle}
          onChange={onChangeTitle}
        />
        <input
          type="text"
          placeholder="URL"
          id="topic-title-input"
          value={linkSrc}
          onChange={onChangeSrc}
        />
      </Modal>
    </div>
  );
};
