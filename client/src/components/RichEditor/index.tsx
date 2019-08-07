// RichEditor.js
import React, { Component } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Value, Inline, Block } from 'slate';
import { Editor, RenderMarkProps, RenderBlockProps } from 'slate-react';
import Plain from 'slate-plain-serializer';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
// COMPONENTS
import ToolBar from './ToolBar';
import FileUpload from './FileUpload';
// UTILS
import html from './serializer';
import {
  isBoldHotkey,
  isItalicHotkey,
  isUnderlinedHotkey,
} from './shortcuts';
import { getTodayDate } from '../../utils/date';
// CSS
import * as css from './EditorStyles';

const documentValue = Value.fromJSON({
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
                text: '',
              }
            ]
          },
        ],
      },
    ],
  },
});

interface RichTextState {
  value: Value;
  editorEl: number | null;
  keyEvent: boolean;
  date: string;
  upload: boolean;
  image: string | null;
};

interface RichEditor {
  editor: any;
};

type Props = ReturnType<any> &
  ReturnType<any> & {
    setContent: (s: string) => any;
  };

const DEFAULT_NODE = 'paragraph';

// set initialValue
let initialValue: any;
if (localStorage.content) {
  initialValue = localStorage.content;
}
if (!localStorage.content) {
  initialValue = Plain.serialize(documentValue);
}

class RichEditor extends Component<Props, RichTextState, RichEditor> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: html.deserialize(initialValue),
      editorEl: null,
      keyEvent: false,
      date: getTodayDate(),
      upload: false,
      image: null,
    };
  }

  private ref = (editor: any) => {
    this.editor = editor;
  }

  private handleChange = ({ value }: any) => {
    console.log('%c change', 'background: pink; color: blue;',
      'state', this.state.value, html.serialize(this.state.value), '\n',
      'local', localStorage.content, '\n',
      value, html.serialize(value), '\n',
      );
      // 에디터 value에 변화가 있으면 html 태그 형태로 window.localStorage에 저장
    if (this.state.keyEvent) {
      // localStorage에 저장 된 값과 state에 있는 값이 다를 경우 localStorage 업뎃
      if (value.document !== this.state.value.document) {
        const string = html.serialize(value);
        localStorage.setItem('content', string);
      }
      // redux dispatch
      if (localStorage.getItem('content') !== null) {
        this.props.writingContent({ content: localStorage.content });
      }
    }
    // 에디터 value값 변화 및 시간 업뎃 적용
    this.setState({ value });
  };

  private handleClick = (event: any, editor: any) => {
    const { startBlock, nextBlock, endBlock } = editor.value;
    console.log('click', event, editor,'\n',
      editor.value.blocks,
      // startBlock.type, '\n', 
      // editor.value, '\n', 
      // editor.value.nextBlock
    );
    // if (editor.value.blocks === undefined) {
    //   editor.insertBlock('paragraph');
    // }
    // when there is no text block insert one
    if (startBlock !== null) {
      if (nextBlock === null) {
        if (startBlock.type === endBlock.type) {
          editor.insertBlock('paragraph');
        }
      }
    }
  }

  // 마크 쇼트키 누를시 해당 마크 텍스트 적용
  private handleKeyDown = (event: any, editor: any, next: any) => {
    let mark;

    // if user press on key 'enter' inside a code block keep the format
    const { startBlock } = editor.value;

    if (startBlock !== null) {
      if (startBlock.type === 'code') {
        console.log('code block start', event);
        if (event.keyCode === 13) {
          editor.insertText('\n');
          return;
        }
      }
    }

    if (isBoldHotkey(event)) {
      mark = 'bold'
    } else if (isItalicHotkey(event)) {
      mark = 'italic'
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined'
    } else {
      return next();
    }
    event.preventDefault();
    editor.toggleMark(mark);
  };

  // 마크 클릭시 해당 마크 텍스트 적용
  handleClickMark = (event: any, type: string) => {
    event.preventDefault();
    this.editor.toggleMark(type);
    console.log('click mark:', event, type);
    // if (type === 'link') {
    //   const href = window.prompt('Enter a url') as string;
    //   console.log('where', href);
    //   this.editor.wrapInline({
    //     type: 'link',
    //     node: { href },
    //   });
    // }
  };

  // 블록 클릭시 해당 블록 텍스트 적용
  handleClickBlock = (event: any, type: string, hasBlock: any) => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const { document } = value;
    console.log('click block:', event, type, hasBlock);

    // Handle image file upload
    if (type === 'image') {
      const isActive = hasBlock(type);
      this.setState({ upload : true });
      console.log('%c checking for block image', 'background: orange;', type, isActive);
    }

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
        return <strong {...attributes}>{children}</strong>;
      case 'italic':
        return <em {...attributes}>{children}</em>;
      case 'underlined':
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  }

  // 블록에따라 텍스트 적용
  protected renderBlock = (props?: RenderBlockProps, editor?: any, next?: any) => {
    const { attributes, children, node } = props as RenderBlockProps;
    console.log('%c renderBlock', 'color: pink;', node.type, attributes, children);
    // console.log(node.getBlocks());

    switch ((node as Block).type) {
      case 'block-quote':
        return <blockquote css={css.blockquote} {...attributes}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'heading-one':
        return <h2 {...attributes}>{children}</h2>;
      case 'heading-two':
        return <h3 {...attributes}>{children}</h3>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
      case 'code':
        console.log('case code in block', node.type, children);
        return (
          <pre css={css.codeblock} {...attributes}>
            <code>{children}</code>
          </pre>
        );
      case 'image':
        const src = (node as Block).data.get('src');
        const classname = (node as Block).data.get('className');
        console.log('%c render image', 'background: white; color: pink;', '\n',
          'attributes', {...attributes}, '\n',
          'src', (node as Block).data.get('src'),
          'class', (node as Block).data.get('className'),
        );
        return src ? <img className={classname} src={src} /> : null;
      default:
        return next();
    }
  }

  componentDidMount() {
    console.log('%c get image', 'color: orange;');
    // update initialValue
    if (localStorage.content === undefined) {
      initialValue = Plain.serialize(documentValue);
      this.setState({ value: html.deserialize(initialValue) });
    } else {
      initialValue = localStorage.content;
      this.setState({ value: html.deserialize(initialValue) });
    }

    // on document load focus on editor
    if (this.editor.el) {
      this.editor.el.focus();
    }

    // editor's y coordinate value from top of window + padding
    const y = this.editor.el.getBoundingClientRect().top;
    this.setState({ editorEl: y });

    document.addEventListener('keydown', () => this.setState({ keyEvent: true }));
  }

  // prevent component from rendering when upload is updated in state
  shouldComponentUpdate(nextProps: any, nextState: any) {
    const prevState = this.state;
    const prevProps = this.props;
    const { editor } = this;
    console.log('%c shouldComponentUpdate', 'background: blue; color: white;', '\n',
      'prevState: ', prevState,
      'nextState: ', nextState,
      // 'prevProps: ', this.props.editorState,
      // 'nextProps: ', nextProps.editorState,
    );
    
    const prevImage = this.props.editorState.data.image;
    const nextImage = nextProps.editorState.data.image;
    if (!prevImage) {
      console.log('%c PRevimage', 'color: red;');
      if (prevImage !== nextImage) {
        const { editor } = this;
        console.log('%c UPDATED', 'color: red;', editor);
        this.setState({ image: nextImage, upload: false });
        const change = editor.insertBlock({
          type: 'image',
          data: {
            src: nextImage,
            className: 'editor-image',
          },
        });
        this.handleChange(change);
      }
    }

    if (nextState !== prevState) {
      if (nextState.upload !== prevState.upload) {
        if (nextState.upload === true) {
          return false;
        } else {
          return true;
        }
      }
      return true;
    } else {
      console.log('else', nextState, prevState);
      // return false;
      return false;
    }

  }

  componentDidUpdate(prevProps: any, prevState: any) {
    const prevData = prevProps.editorState.data;
    const newData = this.props.editorState.data;
    const prevValue = prevState.value;
    const nextValue = this.state.value;
    console.log('%c componentDidUpdate', 'color: blue;', prevData, newData, prevValue.blocks, nextValue.blocks);
    if (prevData.image !== prevState.image) {
      console.log('%c did update', 'color: yellow;', newData.image, prevValue.blocks, nextValue.blocks);
      const src = newData.image;
      this.setState({ image: newData.image });
    }
  }

  render() {
    return(
      <div className="editor">
        <FileUpload upload={this.state.upload} value={this.state.value} />
        <ToolBar
          value={this.state.value}
          onClick={this.handleClickMark}
          onClickBlock={this.handleClickBlock}
        />
        <Editor
          css={css.editor(this.state.editorEl)}
          ref={this.ref}
          className="editor--textarea"
          value={this.state.value}
          placeholder="Tell a story..."
          onClick={this.handleClick}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          renderMark={this.renderMark}
          renderBlock={this.renderBlock}
        />
      </div>
    );
  }
}

const mapStateToProps = (store: any) => ({
  editorState: store.editor,
});

export default connect(mapStateToProps, actions)(RichEditor);
