import React, { useState, useEffect, useRef } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

function FileUpload(props: any) {
  // console.log('FileUpload', props);
  const { upload, value, setContent, editor } = props;
  const display = () => upload ? 'block' : 'none';
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const fileUploader = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (uploadedFile) {
      // console.log('fileUploaded', uploadedFile, '\n', uploadedFile.name);
      // setContent({ image: uploadedFile });
      const reader = new FileReader();
      reader.onload = function (e: any) {
        setContent({ image: e.target.result });
      };

      reader.readAsDataURL(uploadedFile);
      console.log('%c      ', 'background: yellow;', reader, '\n', reader.result,'\n', value,);
    }
  }, [uploadedFile]);

  const handleChange = () => {
    if (fileUploader && fileUploader.current) {
      const getFile: any = fileUploader.current.files;
      console.log('file uploader', getFile);
      if (getFile.length !== 0) {
        setUploadedFile(getFile[0]);
      }
    }
  };

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
  )
}

export default connect(null, actions)(FileUpload);
