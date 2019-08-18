import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
// COMPONENTS
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/styles';
import FileUpload from './FileUpload';
// Others
import { markData, blockData, EditorData } from './data';

// MUI
const styles = {
  root: {
    height: '18px',
    padding: '8px 8px 16px',
    borderBottom: '1px solid #ccc',
    marginBottom: '24px',
  },
  buttons: {
    height: '18px',
    margin: '0 4px',
  },
  icons: {
    width: 'inherit',
    height: '0',
    fontSize: '18px',
    color: 'var(--light-70)',
  },
  iconBlock: {
    margin: '0 5px',
  }
};

const toolbar = css`
  box-sizing: content-box;
  [data-active="true"] span {
    color: var(--primary);
  }
  @media(min-width: 1024px) {
    padding-left: 120px !important;
    padding-right: 120px !important;
  }
  label: toolbar;
`;

const iconU = css`
  font-size: 17px !important;
  label: i--underlined;
`;

interface Props {
  value: any;
  onClick: (event: any, type: string) => void;
  onClickBlock: (event: any, type: string, hasBlock: any) => void;
  classes: any;
  // handleFile: (e: any) => void;
}

function ToolBar(props: Props) {
  // PROPS
  const { value, onClick, onClickBlock, classes } = props;
  const { buttons, icons } = classes;

  // 같은 마크가 적용이 되어 있는지 확인
  const hasMark = (type: string) => value.activeMarks.some((mark: any) => mark.type === type);
  const hasBlock = (type: string) => value.blocks.some((node: any) => node.type === type);

  const renderMarkButton = (markData: EditorData[]) =>
    markData.map((data: EditorData, i) => {
      const { type, icon } = data;
      const isActive = hasMark(type);

    return (
      <button
        className={`btn--${type} ${buttons}`}
        onClick={(event) => onClick(event, type)}
        data-active={isActive}
        key={`btn--${type}`}
      >
        <Icon
          css={type === 'underlined' ? iconU : null}
          className={icons}
        >
          {icon}
        </Icon>
      </button>
    );
  });

  const renderBlockButton = (blockData: EditorData[]) =>
    blockData.map((data: EditorData) => {
      const { type, icon } = data;
      let isActive = hasBlock(type);
      // console.log('type', type, isActive);
      if (['numbered-list', 'bulleted-list'].includes(type)) {
        const { document, blocks } = value;
        if (blocks.size > 0) {
          const parent = document.getParent(blocks.first().key)
          isActive = hasBlock('list-item') && parent && parent.type === type
        }
      }

      return (
        <React.Fragment key={`btn--${type}`}>
          {type === 'image' ?
            <FileUpload
              type={type}
              classname={`btn--${type} ${classes.buttons} ${classes.iconBlock}`}
              isActive={isActive}
              hasBlock={hasBlock}
              icons={icons}
              icon={icon}
              onClickBlock={onClickBlock}
            /> :
            <button
              className={`btn--${type} ${classes.buttons} ${classes.iconBlock}`}
              data-active={isActive}
              onClick={(event) => onClickBlock(event, type, hasBlock)}
            >
              <Icon 
                className={icons}
              >
                {icon}
              </Icon>
            </button>
          }
        </React.Fragment>
      );
    });

  return (
    <div className={classes.root} css={toolbar}>
      {renderMarkButton(markData)}
      {renderBlockButton(blockData)}
    </div>
  )
}

export default withStyles(styles)(ToolBar);
