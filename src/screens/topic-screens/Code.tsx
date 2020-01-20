import React, { useEffect, useState } from "react";
import { getCodes, createCode } from "../../client-lib/api";
import { Topic, NewCode } from "../../client-lib/models";
import { NewButton, Modal, CodeCard } from "../../components/";
import { createUseStyles } from "react-jss";
import { useStateValue } from "../../state/StateProvider";

type CodeScreenProps = {
  topic: Topic;
};

const useStyles = createUseStyles({
  codeBox: {
    height: 250,
    marginTop: 10
  },
  codeLineLoading20: {
    width: "20%",
    marginTop: 10,
    padding: 6,
    height: 5,
    backgroundColor: "#efefef"
  },
  codeLineLoading30: {
    width: "30%",
    marginTop: 10,
    padding: 6,
    height: 5,
    backgroundColor: "#efefef"
  },
  codeLineLoading40: {
    width: "40%",
    marginTop: 10,
    padding: 6,
    height: 5,
    backgroundColor: "#efefef"
  },
  codeLineLoading80: {
    width: "80%",
    marginTop: 10,
    padding: 6,
    height: 5,
    backgroundColor: "#efefef"
  },
  codeLineLoading70: {
    width: "70%",
    marginTop: 10,
    padding: 6,
    height: 5,
    backgroundColor: "#efefef"
  },
  codeLineLoading10: {
    width: "10%",
    marginTop: 10,
    padding: 6,
    height: 5,
    backgroundColor: "#efefef"
  }
});

export const Code = (props: CodeScreenProps) => {
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [codeContent, setCodeContent] = useState();
  const [selectedLang, setSelectedLang] = useState("any");
  const [loadingCodes, setLoadingCodes] = useState(true);
  const [creatingCode, setCreatingCode] = useState(false);

  // @ts-ignore
  const [
    {
      content: { codes }
    },
    dispatch
  ] = useStateValue();

  const classes = useStyles();

  const fetchCodes = async () => {
    if (props.topic.code) {
      setLoadingCodes(true);
      const res = await getCodes(props.topic.code);
      dispatch({ type: "SET_CODES", payload: res });
      setLoadingCodes(false);
    } else {
      dispatch({ type: "SET_CODES", payload: [] });
      setLoadingCodes(false);
    }
  };

  useEffect(() => {
    fetchCodes();
  }, [props.topic]);

  const toggleModal = () => {
    setCodeModalOpen(!codeModalOpen);
  };

  const onChangeSnippetContent = (e: any) => {
    setCodeContent(e.target.value);
  };

  const onClickCreateCodeSnippet = async () => {
    let newCode: NewCode = {
      content: codeContent,
      language: selectedLang,
      origin: "TIGUM",
      topic_id: props.topic.id,
      user_id: 123
    };
    try {
      setCreatingCode(true);
      const res = await createCode(newCode);
      setCreatingCode(false);
      setCodeModalOpen(false);
      let result = { ...newCode, id: res.id };
      dispatch({ type: "ADD_CODE", payload: result });
    } catch (e) {
      setCodeModalOpen(false);
    }
  };

  const onSelectLanguage = (e: any) => {
    setSelectedLang(e.target.value);
  };

  const renderAddSnippetModal = () => {
    return (
      <Modal
        title="Create Code Snippet"
        buttonText="Create"
        display={codeModalOpen}
        loadingAction={creatingCode}
        onClickAction={onClickCreateCodeSnippet}
        toggleModal={toggleModal}
      >
        <form className="w-100 black-80">
          <textarea
            className={`${classes.codeBox} db border-box hover-black w-100 ba b--black-20 pa2 br2 mb2`}
            onChange={onChangeSnippetContent}
          ></textarea>
        </form>
        <select onChange={onSelectLanguage}>
          <option value="any">Any</option>
          <option value="javascript">Javascript</option>
          <option value="java">Java</option>
          <option value="c">C</option>
          <option value="rust">Rust</option>
          <option value="Python">Python</option>
          <option value="Tyepscript">Typescript</option>
        </select>
      </Modal>
    );
  };

  const renderLoading = () => {
    return (
      <article className="center shadow-card mw5 mw7-ns hidden br2 ba dark-gray b--black-10  mv3">
        <div className="ph3 pv2">
          <div className={classes.codeLineLoading10}></div>
          <div className={classes.codeLineLoading70}></div>
          <div className={classes.codeLineLoading30}></div>
          <div className={classes.codeLineLoading80}></div>
          <div className={classes.codeLineLoading20}></div>
        </div>
      </article>
    );
  };

  const renderCodes = () => {
    if (!loadingCodes) {
      if (codes.length) {
        return codes.map((code, idx) => {
          return (
            <CodeCard
              content={code.content}
              origin={code.origin}
              id={code.id}
              index={idx}
            />
          );
        });
      } else {
        return (
          <div className="no-resources-message">
            <i className="fas fa-code" /> <span>No code yet</span>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="topic-section-container">
      {renderCodes()}
      {renderAddSnippetModal()}
      <NewButton onClick={toggleModal} text="New Code" />
    </div>
  );
};
