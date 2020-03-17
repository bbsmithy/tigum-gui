import React from 'react';

const CodeMirrorBlock = props => {
  return (
    <pre>
      <code>{props.blockProps.content}</code>
    </pre>
  );
};
export default CodeMirrorBlock;
