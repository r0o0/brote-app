import React, { useState, useEffect, useRef } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
// UTILS
import uniqueId from '../../utils/uniqueId';

function FileUpload(props: any) {
  const { upload, setContent } = props;
  const display = () => upload ? 'block' : 'none';
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const fileUploader = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    if (fileUploader && fileUploader.current) {
      const getFile: any = fileUploader.current.files;
      if (getFile.length !== 0) {
        setUploadedFile(getFile[0]);
      }
    }
  };

  useEffect(() => {
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        const fileType = uploadedFile.type.split('/')[1];
        const id = uniqueId('i#', fileType);
        const image = {
          id,
          data: reader.result,
          type: fileType,
        };
        setContent({ image });
      };

      reader.onloadend = () => setUploadedFile(null);

      reader.readAsDataURL(uploadedFile);
      console.log('%c  component did mount    ', 'background: yellow;', '\n',
        'uploadedFile:', uploadedFile, '\n',
        'reader:', reader, '\n',
        'reader.result:', reader.result,'\n',
      );
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
    <div css={css`
      display: ${display()};
    `}>
      <input
        type="file"
        ref={fileUploader}
        onChange={handleChange}
      />
    </div>
  );

}

export default connect(null, actions)(FileUpload);
