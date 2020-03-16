'use strict';

import React from 'react';
import { stateToHTML } from 'draft-js-export-html';
import './styles.css';
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromHTML,
  ContentState
} from 'draft-js';
import Prism from 'prismjs';
import PrismDecorator from 'draft-js-prism';
import CodeUtils from 'draft-js-code';

const decorator = new PrismDecorator({
  prism: Prism,
  defaultSyntax: 'javascript'
});

const fromHTMLToEditorState = html => {
  try {
    const content = convertFromHTML(html);
    const state = ContentState.createFromBlockArray(content);
    return EditorState.createWithContent(state, decorator);
  } catch (e) {
    return false;
  }
};

class RichEditorExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty()
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => this.setState({ editorState });
    this.onSave = () => this._onSave();
    this.onDelete = () => this._onDelete();
    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.onTab = e => this._onTab(e);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
  }

  componentWillReceiveProps(nextProps, prevProps) {
    if (nextProps.htmlContent !== prevProps.htmlContent) {
      const content = fromHTMLToEditorState(nextProps.htmlContent);

      this.setState({
        editorState: content
      });
    }
  }

  keyBindingFn = evt => {
    const { editorState } = this.state;
    if (!CodeUtils.hasSelectionInBlock(editorState))
      return Editor.getDefaultKeyBinding(evt);

    const command = CodeUtils.getKeyBinding(evt);

    return command || Editor.getDefaultKeyBinding(evt);
  };

  handleReturn = evt => {
    const { editorState } = this.state;
    if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';

    this.onChange(CodeUtils.handleReturn(evt, editorState));
    return 'handled';
  };

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    let newState;

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      newState = CodeUtils.handleKeyCommand(editorState, command);
    }

    if (!newState) {
      newState = RichUtils.handleKeyCommand(editorState, command);
    }

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onTab(evt) {
    const { editorState } = this.state;
    if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';

    this.onChange(CodeUtils.onTab(evt, editorState));
    return 'handled';
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  _onSave() {
    const content = stateToHTML(this.state.editorState.getCurrentContent());
    console.log(content);
    this.props.onSave(content);
  }

  _onDelete() {
    const ans = window.confirm('Are you sure you want to delete this note?');
    if (ans) {
      this.props.onClickDelete();
    }
  }

  render() {
    const { editorState } = this.state;

    return (
      <div className='RichEditor-root' id='editor-root'>
        <div
          className='editor-controls fixed'
          style={{ width: this.props.width }}
        >
          <div>
            <div>
              <span className='btn-note' onClick={this.props.onClickBack}>
                <i className='fa fa-arrow-left' />
              </span>
              <span className='note-title'>{this.props.title}</span>
            </div>
            <div>
              <span className='btn-note fr mt3' onClick={this.onDelete}>
                <i className='fa fa-trash' />
              </span>
              <span className='btn-note fr mt3' onClick={this.onSave}>
                {this.props.saving ? (
                  <i class='fas fa-circle-notch fa-spin'></i>
                ) : (
                  <i className='fa fa-save' />
                )}
              </span>
            </div>
          </div>
          <div>
            <BlockStyleControls
              editorState={editorState}
              onToggle={this.toggleBlockType}
            />
            <InlineStyleControls
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
            />
          </div>
        </div>

        <div className={`RichEditor-editor`} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            placeholder='Take some notes...'
            plugins={this.state.plugins}
            ref='editor'
          />
        </div>
      </div>
    );
  }
}

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.icon ? (
          <i className={this.props.icon}></i>
        ) : (
          this.props.label
        )}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'Code Block', style: 'code-block', icon: 'fas fa-code' },
  { label: 'Blockquote', style: 'blockquote', icon: 'fas fa-quote-right' },
  { label: 'UL', style: 'unordered-list-item', icon: 'fas fa-list-ul' },
  { label: 'OL', style: 'ordered-list-item', icon: 'fas fa-list-ol' }
];

const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className='RichEditor-controls'>
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          icon={type.icon}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD', icon: 'fas fa-bold' },
  { label: 'Italic', style: 'ITALIC', icon: 'fas fa-italic' },
  { label: 'Underline', style: 'UNDERLINE', icon: 'fas fa-underline' },
  { label: 'Monospace', style: 'CODE' }
];

const InlineStyleControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className='RichEditor-controls'>
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          icon={type.icon}
        />
      ))}
    </div>
  );
};

export default RichEditorExample;
