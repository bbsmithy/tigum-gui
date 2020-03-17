import React from 'react';

type StyleButtonProps = {
  style: string;
  active: boolean;
  icon: string;
  label: string;
  onToggle: (style: string) => void;
};

export const StyleButton = (props: StyleButtonProps) => {
  let className = 'RichEditor-styleButton';
  if (props.active) {
    className += ' RichEditor-activeButton';
  }

  const onToggle = e => {
    e.preventDefault();
    props.onToggle(props.style);
  };

  return (
    <span className={className} onMouseDown={onToggle}>
      {props.icon ? <i className={props.icon}></i> : props.label}
    </span>
  );
};
