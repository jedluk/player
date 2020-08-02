import React, { useState, useCallback, useEffect } from 'react';
import { fileValidator, isNotNull, isNull } from '../utils/lib';
import { uploadTracks } from '../utils/http';
import Modal from 'react-modal';
import { useDropzone } from 'react-dropzone';
import FontAwesome from 'react-fontawesome';
import style from './ModalWrapper.module.css';
import { API, Maybe } from '../types';

type ModalProps = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  tracks: API.Tracks[];
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
  if (isNotNull(error)) {
    // @ts-ignore: Object is possibly 'null'.
    return <h2>{error.message}</h2>;
  }
  if (isNull(files)) {
    return <h2>Drop MP3 file here</h2>;
  }
  // @ts-ignore: Object is possibly 'null'.
  return <h2>{files.map((f) => f.name).join(', ')} has been uploaded</h2>;
}

export function ModalWrapper(props: ModalProps) {
  const { isOpen, setOpen, tracks } = props;
  const [error, setError] = useState<Maybe<API.Error>>(null);
  const [files, addFile] = useState(null);

  useEffect(() => Modal.setAppElement('body'), []);

  useEffect(() => {
    if (isNotNull(error)) setTimeout(() => setError(null), 3000);
  }, [error]);

  const onDrop = useCallback(async (files: File[]) => {
    const validatorResult = fileValidator(files);
    if ('error' in validatorResult) return setError(error);
    await uploadTracks(files).catch(setError);
  }, []);

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

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
