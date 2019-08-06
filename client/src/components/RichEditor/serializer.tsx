import React from 'react';
import Html, { Rule } from 'slate-html-serializer';
import { BLOCK_TAGS, MARK_TAGS } from './tags';
import store from '../../redux/store';

const image = () => store.subscribe(() => store.getState().editor.data.image);
const src = image ? image: '';

const rules: Rule[] = [
  // block element
  {
    deserialize(el: Element, next: any) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: 'block',
          type: type,
          data: {
            className: el.getAttribute('class'),
            src: el.getAttribute('src'),
          },
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj: any, children: any) {
      if (obj.object === 'block') {
        switch (obj.type) {
          case 'code':
            return (
              <pre>
                <code>
                  {children}
                </code>
              </pre>
            );
          case 'paragraph':
            return <p>{children}</p>;
          case 'block-quote':
            return <blockquote>{children}</blockquote>;
          case 'heading-one':
            return <h2>{children}</h2>;
          case 'heading-two':
            return <h3>{children}</h3>;
          case 'list-item':
            return <li>{children}</li>;
          case 'numbered-list':
            return <ol>{children}</ol>;
          case 'bulleted-list':
            return <ul>{children}</ul>;
          case 'image':
            const src = obj.data.src;
            const classname = obj.data.className;
            console.log('serializer image', src, classname, obj.data);
            return <img className={classname} src={src} />;
        }
      }
    },
  },
  // marks
  {
    deserialize(el: Element, next: any) {
      const type = MARK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: 'mark',
          type: type,
          data: {
          },
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj: any, children: any) {
      if (obj.object === 'mark') {
        switch (obj.type) {
          case 'bold':
            return <strong>{children}</strong>;
          case 'italic':
            return <em>{children}</em>;
          case 'underlined':
            return <u>{children}</u>;
          case 'code':
            return <code>{children}</code>;
        }
      }
    },
  },
];

const html = new Html({ rules });

export default html;