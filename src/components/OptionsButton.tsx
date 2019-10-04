import React, { useState, useEffect } from "react";

export type Option = {
  title: string;
  icon: string;
  onClick: () => void;
};

type OptionsListProps = {
  options: Array<Option>;
};

type OptionsButtonProps = {
  options: Array<Option>;
};

const OptionsList = (props: OptionsListProps) => {
  return (
    <div className="options-list-container">
      {props.options.map(option => {
        return (
          <div className="options-list-item">
            <i className={`${option.icon} option-list-icon`} />
            <span>{option.title}</span>
          </div>
        );
      })}
    </div>
  );
};

export const OptionsButton = (props: OptionsButtonProps) => {
  const [showOptions, setShowOptions] = useState(false);

  const onClickMenu = (e: any) => {
    e.stopPropagation();
    window.addEventListener("click", () => {
      setShowOptions(false);
    });
    setShowOptions(true);
  };

  return (
    <div onClick={onClickMenu} className="dib ph3">
      <div className="pa1 tc br-100 options-btn">
        <i className="fas fa-ellipsis-v" />
      </div>
      {showOptions && <OptionsList options={props.options} />}
    </div>
  );
};
