import React from 'react';
import { MarkdownEditor } from './lib';

const styles = {
  mainContainer: { backgroundColor: '#333' },
  markdownContainer: { color: '#333' },
  markdownEditor: { backgroundColor: '#333', color: 'white' },
  htmlContainer: { color: 'white' },
};

export const MDE = () => {
  return <MarkdownEditor height={window.innerHeight} styles={styles} />;
};
