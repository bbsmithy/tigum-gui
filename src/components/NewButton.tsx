import React from 'react';

export const NewButton = (props: any) => {
  return (
    <div className='new-button pointer' onClick={props.onClick}>
      <i className='fas fa-plus'></i>
    </div>
  );
};
