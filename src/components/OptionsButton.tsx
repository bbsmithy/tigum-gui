import React, { useState } from "react";

export type Option = {
  title: string;
  icon: string;
  onClick: () => void;
};

type OptionsListProps = {
  options: Array<Option>;
  positionX: number;
  positionY: number;
};

type OptionsButtonProps = {
  options: Array<Option>;
};

const OptionsList = (props: OptionsListProps) => {
  return (
    <div
      style={{
        position: "absolute"
      }}
    >
      {props.options.map(option => {
        return <div>{option.title}</div>;
      })}
    </div>
  );
};

export const OptionsButton = (props: OptionsButtonProps) => {
  const [showOptions, setShowOptions] = useState({
    show: false,
    positionX: 0,
    positionY: 0
  });

  const onClickMenu = (e: any) => {
    setShowOptions({
      show: true,
      positionX: e.clientX,
      positionY: e.clientY
    });
  };

  return (
    <div onClick={onClickMenu}>
      <i className="fas fa-ellipsis-v" />
      {showOptions.show && (
        <OptionsList
          options={props.options}
          positionX={showOptions.positionX}
          positionY={showOptions.positionY}
        />
      )}
    </div>
  );
};
