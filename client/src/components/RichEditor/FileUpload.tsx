import React, { useState, useEffect, useRef } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import Icon from '@material-ui/core/Icon';
// UTILS
import uniqueId from '../../utils/uniqueId';

interface Props {
  setContent: ({}) => void;
  type: string;
  classname: string;
  isActive: boolean;
  hasBlock: (type: string) => void;
  icons: string;
  icon: string;
  onClickBlock: (event: React.MouseEvent, type: string, hasBlock: (type: string) => void) => void;
}

function FileUpload(props: Props) {
  const {
    setContent,
    type,
    classname,
    isActive,
    hasBlock,
    icons,
    icon,
    onClickBlock,
  } = props;

  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const fileUploader = useRef<HTMLInputElement>(null);

  // get uploaded file info
  const handleChange = () => {
    if (fileUploader && fileUploader.current) {
      const getFile: any = fileUploader.current.files;
      if (getFile.length !== 0) {
        setUploadedFile(getFile[0]);
      }
    }
  };

  // trigger input[type="file"] and image block
  const handleClick = (event: React.MouseEvent) => {
    if (fileUploader && fileUploader.current) {
      fileUploader.current.click();
    }
    onClickBlock(event, type, hasBlock);
  }

  useEffect(() => {
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        const source: HTMLImageElement = new Image();
        source.src = reader.result as string;
        const fileType = uploadedFile.type.split('/')[1];
        const id = uniqueId('i#', fileType);

        // get uploadedImage width and height information
        source.onload = () => {
          const width = source.width;
          const height = source.height;
          const orientation = width > height ? 'landscape' : 'portrait';
          const image = {
            id,
            data: reader.result,
            type: fileType,
            orientation,
          };
          setContent({ image });
        }
      };

      // erase uploaded file data
      reader.onloadend = () => setUploadedFile(null);

      reader.readAsDataURL(uploadedFile);
      // console.log('%c  component did mount    ', 'background: yellow;', '\n',
      //   'uploadedFile:', uploadedFile, '\n',
      //   'reader:', reader, '\n',
      //   'reader.result:', reader.result,'\n',
      // );
    }

    // reset input[type=file] value when componentWillUnmount
    return () => {
      if (uploadedFile === null) {
        if (fileUploader && fileUploader.current) {
          fileUploader.current.value = '';
        }
      }
    };
  }, [uploadedFile]);

  return (
    <React.Fragment>
      <input
        type="file"
        id="file"
        name="file"
        ref={fileUploader}
        accept='image/*'
        onChange={handleChange}
        hidden
      />
      <label
        htmlFor="file"
        data-active={isActive}
        key={`btn--${type}`}
        className={classname}
        onClick={handleClick}
        role="button"
      >
        <Icon className={icons}>{icon}</Icon>
      </label>
    </React.Fragment>
  );
}

export default connect(null, actions)(FileUpload);
