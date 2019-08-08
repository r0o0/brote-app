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
import uniqueId from '../../utils/uniqueId';
// CSS
import * as css from './EditorStyles';
import { thisExpression } from '@babel/types';

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

const schema = {
  document: {
    last: { type: 'paragraph' },
    normalize: (editor: any, { code, node, child }: any) => {
      switch (code) {
        case 'last_child_type_invalid': {
          const paragraph = Block.create('paragraph')
          return editor.insertNodeByKey(node.key, node.nodes.size, paragraph)
        }
      }
    },
  },
  blocks: {
    image: {
      isVoid: true,
    },
  },
}

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
    // console.log('%c change', 'background: pink; color: blue;',
    //   'state', this.state.value, html.serialize(this.state.value), '\n',
    //   'local', localStorage.content, '\n',
    //   value, html.serialize(value), '\n',
    //   );
      // 에디터 value에 변화가 있으면 html 태그 형태로 window.localStorage에 저장
    if (this.state.keyEvent || this.state.upload) {
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
    // console.log('click', event, editor,'\n',
      // editor.value.blocks,
      // startBlock.type, '\n', 
      // editor.value, '\n', 
      // editor.value.nextBlock
    // );
    // if (editor.value.blocks === undefined) {
    //   editor.insertBlock('paragraph');
    // }
    // when there is no text block insert one
    if (endBlock.type !== 'paragraph') {
      if (startBlock.type === endBlock.type) {
        console.log('same block');
        editor.insertBlock('paragraph');
      }
    }
  }

  // 마크 쇼트키 누를시 해당 마크 텍스트 적용
  private handleKeyDown = (event: any, editor: any, next: any) => {
    let mark;

    // if user press on key 'enter' inside a code block keep the format
    const { startBlock, endBlock } = editor.value;
    console.log('key pressed', startBlock.type, endBlock.type);
    if (startBlock !== null) {
      // block type IMAGE
      if (startBlock.type === 'image' || endBlock.type === 'image') {
        console.log('image block start');
        // delete image on key event: 'backspace'
        if (event.keyCode === 8) {
          console.log('esc', editor);
          editor.delete();
        }
        editor.insertBlock('paragraph');
      }

      // block type CODE
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
      console.log('%c click block image', 'background: orange;', type, isActive);
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
    const {
      attributes,
      children,
      node
    } = props as RenderBlockProps;
    console.log('%c renderBlock', 'color: pink;', node.type, attributes, children);

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
        const id = (node as Block).data.get('data-image-id');
        return src ?
          <img className={classname} src={src} data-image-id={id} />
        : null;
      default:
        return next();
    }
  }

  componentDidMount() {
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

  insertImage(imageInfo: any) {
    const { editor } = this;
    const { data, id } = imageInfo;
    console.log('insert', data);
    const change = editor
      .insertBlock({
        type: 'image',
        data: {
          className: 'editor-image',
          src: data,
          'data-image-id': id,
        }
      })
      .moveAnchorToEndOfDocument()
      .focus();

    this.handleChange(change);
  }

  // prevent component from rendering when upload is updated in state
  shouldComponentUpdate(nextProps: any, nextState: any) {
    const prevState = this.state;
    const prevProps = this.props;
    const prevData = prevProps.editorState.data.image;
    const prevImage = prevData[prevData.length - 1].id;
    const nextData = nextProps.editorState.data.image;
    const nextDataImage = nextData[nextData.length - 1];
    const nextImage = nextDataImage.id;

    if (nextImage !== prevImage) {
      console.log('%c shouldComponentUpdate', 'background: blue; color: white;', '\n',
        'prevState: ', prevState.image, '\n',
        'nextState: ', nextState.image, '\n',
        'prevProps: ', this.props.editorState.data, '\n',
        'nextProps: ', nextProps.editorState.data, '\n',
        'prevImage: ', this.props.editorState.data.image, '\n',
        'nextImage: ', nextProps.editorState.data.image,
      );
      this.setState({ image: nextImage ,upload: false });
      this.insertImage(nextDataImage);
    }

    if (nextState !== prevState) {
      if (nextState.upload !== prevState.upload) {
        console.log('nextState', nextState.upload, 'prevState', prevState.upload);
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

  render() {
    return(
      <div className="editor">
        <ToolBar
          value={this.state.value}
          onClick={this.handleClickMark}
          onClickBlock={this.handleClickBlock}
        />
        <Editor
          schema={schema}
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
