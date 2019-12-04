import React, { useEffect, useState } from "react";
import { getCodes, createCode } from "../../client-lib/api";
import { Topic, NewCode } from "../../client-lib/models";
import { NewButton, Modal } from "../../components/";
import { createUseStyles } from "react-jss";

type CodeScreenProps = {
  topic: Topic;
};

const useStyles = createUseStyles({
  codeBox: {
    height: 250,
    marginTop: 10
  }
});

export const Code = (props: CodeScreenProps) => {
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [codeContent, setCodeContent] = useState();
  const [selectedLang, setSelectedLang] = useState();

  const classes = useStyles();

  const fetchCodes = async () => {
    console.log(props.topic);
    if (props.topic.code) {
      const res = await getCodes(props.topic.code);
      console.log(res);
    }
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  const toggleModal = () => {
    setCodeModalOpen(!codeModalOpen);
  };

  const onChangeSnippetContent = (e: any) => {
    setCodeContent(e.target.value);
  };

  const onClickCreateCodeSnippet = async () => {
    const newCode: NewCode = {
      content: codeContent,
      language: selectedLang,
      origin: "TIGUM",
      topic_id: props.topic.id,
      user_id: 123
    };
    const res = await createCode(newCode);
    console.log("NEW CODE", res);
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

  return (
    <div className="topic-section-container">
      <div className="no-resources-message">
        <i className="fas fa-code" /> <span>No code yet</span>
      </div>
      {renderAddSnippetModal()}
      <NewButton onClick={toggleModal} text="New Code" />
    </div>
  );
};
