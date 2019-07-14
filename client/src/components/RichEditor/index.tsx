// RichEditor.js
import React, { Component } from 'react';
import { Value } from 'slate';
import { Editor, RenderMarkProps, RenderBlockProps } from 'slate-react';
import { isKeyHotkey } from 'is-hotkey';
import ToolBar from './ToolBar';

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                object: 'leaf',
                text: "A line of text in a paragraph."
              },
            ],
          },
        ],
      },
    ],
  },
});

interface RichTextState {
  value: Value;
}

interface RichEditor {
  editor: any;
};

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

const DEFAULT_NODE = 'paragraph';

class RichEditor extends Component<{}, RichTextState, RichEditor> {
  constructor(props: {}) {
    super(props);
    this.state = { value: initialValue };
  }

  private ref = (editor: any) => {
    this.editor = editor;
  }

  private handleChange = ({ value }: any) => this.setState({ value });

  // 마크 쇼트키 누를시 해당 마크 텍스트 적용
  private handleKeyDown = (event: any, editor: any, next: any) => {
    console.log('keydown', event.key);
    let mark;
    if (isBoldHotkey(event)) {
      mark = 'bold'
    } else if (isItalicHotkey(event)) {
      mark = 'italic'
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined'
    } else if (isCodeHotkey(event)) {
      mark = 'code'
    } else {
      return next();
    }
    event.preventDefault();
    editor.toggleMark(mark);
  };

  // 마크 클릭시 해당 마크 텍스트 적용
  handleClickMark = (event: any, type: string) => {
    console.log('click', this.editor, type);

    event.preventDefault();
    this.editor.toggleMark(type);
  };

  // 블록 클릭시 해당 블록 텍스트 적용
  handleClickBlock = (event: any, type: string, hasBlock: any) => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = hasBlock(type);
      const isList = hasBlock('list-item')

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = hasBlock('list-item');
      const isType = value.blocks.some((block: any) => {
        return !!document.getClosest(block.key, (parent: any) => parent.type === type);
      });

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type);
      } else {
        editor.setBlocks('list-item').wrapBlock(type);
      }
    }
  }

  // 마크에따라 텍스트 적용
  protected renderMark = (props: RenderMarkProps, editor: any, next: any) => {
    const { children, mark, attributes } = props;
    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      default:
        return next();
    }
  }

  // 블록에따라 텍스트 적용
  protected renderBlock = (props: RenderBlockProps, editor: any, next: any) => {
    const { attributes, children, node } = props;
    switch (node.type) {
      case 'block-quote':
        console.log('blockquote', {...attributes}, children);
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      default:
        return next();
    }
  }

  componentDidMount() {
    this.editor.el.focus();
  }

  render() {
    return(
      <div className="editor">
        <ToolBar
          value={this.state.value}
          onClick={this.handleClickMark}
          onClickBlock={this.handleClickBlock}
        />
        <Editor
          ref={this.ref}
          value={this.state.value}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          renderMark={this.renderMark}
          renderBlock={this.renderBlock}
        />
      </div>
    );
  }
}

export default RichEditor;
