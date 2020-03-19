import React, { useRef, useState, useEffect } from 'react';
import { stateToHTML } from 'draft-js-export-html';
import './styles.css';
import Editor from 'draft-js-plugins-editor';
import {
  EditorState,
  RichUtils,
  convertFromHTML,
  ContentState,
  CompositeDecorator,
  convertFromRaw
} from 'draft-js';
import Prism from 'prismjs';
import PrismDecorator from 'draft-js-prism';
import CodeUtils from 'draft-js-code';
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';

// Draft plugins
import createSoftNewLinePlugin from '@jimmycode/draft-js-soft-newline-plugin';
import createPrismPlugin from 'draft-js-prism-plugin';
import CodeMirrorBlock from './CodeMirrorBlock';

type DevKeepEditorProps = {
  onSave: (html: string) => void;
  onDelete: () => void;
  onBack: () => void;
  htmlContent: string;
  saving: boolean;
  title: string;
  width: number;
};

// Draft.js helper functions
const fromHTMLToEditorState = (html: string) => {
  try {
    const content = convertFromHTML(html);
    const state = ContentState.createFromBlockArray(content.contentBlocks);
    return EditorState.createWithContent(state);
  } catch (e) {
    return false;
  }
};

const getBlockStyle = block => {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
};

// Used to customize the output of editor blocks
// See https://draftjs.org/docs/advanced-topics-block-components/ from more details
// const customBlockRender = contentBlock => {
//   const type = contentBlock.getType();
//   debugger;
//   if (type === 'code-block') {
//     const content = contentBlock.getText();
//     return {
//       component: CodeMirrorBlock,
//       editable: true,
//       props: {
//         content
//       }
//     };
//   }
// };

// Start of Component DevKeepEditor
const DevKeepEditor = (props: DevKeepEditorProps) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const softNewLinePlugin = createSoftNewLinePlugin();
  const prismPlugin = createPrismPlugin({
    prism: Prism,
    defaultSyntax: 'javascript'
  });

  useEffect(() => {
    const newContent = fromHTMLToEditorState(props.htmlContent);
    if (newContent) {
      setEditorState(newContent);
    }
  }, [props.htmlContent]);

  const onChangeEditorState = editorState => setEditorState(editorState);

  const handleKeyCommand = command => {
    let newState;
    if (CodeUtils.hasSelectionInBlock(editorState)) {
      newState = CodeUtils.handleKeyCommand(editorState, command);
    }

    if (!newState) {
      newState = RichUtils.handleKeyCommand(editorState, command);
    }

    if (newState) {
      onChangeEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const toggleBlockType = blockType => {
    onChangeEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = inlineStyle => {
    onChangeEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const onTab = evt => {
    if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';
    onChangeEditorState(CodeUtils.onTab(evt, editorState));
    return 'handled';
  };

  const onFocus = () => {
    // @ts-ignore
    // editorRef.focus();
  };

  const onSave = () => {
    const content = stateToHTML(editorState.getCurrentContent());
    props.onSave(content);
  };

  const onDelete = () => {
    const ans = window.confirm('Are you sure you want to delete this note?');
    if (ans) {
      props.onDelete();
    }
  };

  return (
    <div className='RichEditor-root' id='editor-root'>
      <div className='editor-controls fixed' style={{ width: props.width }}>
        <div className='pv3'>
          <div className='fl w-80-m w-80-l w-70'>
            <span className='btn-note' onClick={props.onBack}>
              <i className='fa fa-arrow-left' />
            </span>
            <span className='note-title'>{props.title}</span>
          </div>
          <div className='fl w-20-m w-20-l w-30'>
            <span className='btn-note mt3' onClick={onDelete}>
              <i className='fa fa-trash' />
            </span>
            <span className='btn-note mt3' onClick={onSave}>
              {props.saving ? (
                <i className='fas fa-circle-notch fa-spin'></i>
              ) : (
                <i className='fa fa-save' />
              )}
            </span>
          </div>
        </div>
        <div className='mt3'>
          <BlockStyleControls
            editorState={editorState}
            onToggle={toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={toggleInlineStyle}
          />
        </div>
      </div>

      <div className={`RichEditor-editor`} onClick={onFocus}>
        <Editor
          blockStyleFn={getBlockStyle}
          // blockRenderMap={}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={onChangeEditorState}
          onTab={onTab}
          plugins={[softNewLinePlugin, prismPlugin]}
        />
      </div>
    </div>
  );
};

export default DevKeepEditor;
