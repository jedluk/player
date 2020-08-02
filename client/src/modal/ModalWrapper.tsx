import React, { useState, useCallback, useEffect } from 'react';
import { fileValidator, isNotNull, isNull } from '../utils/lib';
import { uploadTracks } from '../utils/http';
import Modal from 'react-modal';
import { useDropzone } from 'react-dropzone';
import FontAwesome from 'react-fontawesome';
import { API, Maybe } from '../types';

import style from './ModalWrapper.module.css';

type ModalProps = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  fetchTracks: () => void;
};

const customStyles = {
  content: {
    width: '40%',
    height: '50%',
    borderRadius: 10,
    margin: 'auto',
    padding: 0,
    overflow: 'hidden',
  },
};

function renderIcon(error: Maybe<API.Error>, file: Maybe<File[]>, isDragActive: boolean) {
  if (isNotNull(error)) {
    return <FontAwesome name="exclamation-circle" size="5x" />;
  }
  if (isNull(error) && isNull(file)) {
    return <FontAwesome name="music" size="5x" style={{ opacity: isDragActive ? 1 : 0.5 }} />;
  }
  return <FontAwesome name="check" size="5x" />;
}

function renderText(error: Maybe<API.Error>, files: Maybe<File[]>) {
  if (error !== null) {
    return <h2>{error.message}</h2>;
  }
  return (
    <h2>
      {files === null ? (
        'Drop MP3 file here'
      ) : (
        <>
          {files
            .map((file: File) => file.name)
            .map((fileName: string) => (
              <div key={fileName}>{fileName}</div>
            ))}
        </>
      )}
    </h2>
  );
}

export function ModalWrapper(props: ModalProps) {
  const { isOpen, setOpen, fetchTracks } = props;
  const [error, setError] = useState<Maybe<API.Error>>(null);
  const [files, setFiles] = useState<Maybe<File[]>>(null);

  useEffect(() => Modal.setAppElement('body'), []);

  useEffect(() => {
    if (isNotNull(error)) setTimeout(() => setError(null), 3000);
  }, [error]);

  const onDrop = useCallback(
    async (files: File[]) => {
      const { error: validationError } = fileValidator(files);
      if (validationError !== null) return setError(validationError);
      await uploadTracks(files).catch(setError);
      setFiles(files);
    },
    [setError]
  );

  const handleClose = useCallback(() => {
    setOpen(false);
    if (files !== null) fetchTracks();
    setFiles(null);
  }, [setOpen, files, setFiles, fetchTracks]);

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  return (
    <React.Fragment>
      <Modal isOpen={isOpen} onRequestClose={handleClose} style={customStyles}>
        <div className={style['modal-header']}>
          <span>Add new track</span>
          <button onClick={handleClose}>
            <FontAwesome name="times-circle-o" style={{ fontSize: 20 }} />
          </button>
        </div>
        <div className={style['modal-content']}>
          <h1>Upload a file:</h1>
          <div className={style['modal-upload']} {...getRootProps()}>
            {renderIcon(error, files, isDragActive)}
            {renderText(error, files)}
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
}
