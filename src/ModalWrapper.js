import React, { useState, useCallback, useEffect } from 'react';
import { fileValidator, upload, isNotNull, isNull, hasError } from './utils/lib';
import Modal from 'react-modal';
import { useDropzone } from 'react-dropzone';
import FontAwesome from 'react-fontawesome';
import './Modal.css';

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

function renderIcon(error, file, isDragActive) {
  if (isNotNull(error)) {
    return <FontAwesome name="exclamation-circle" size="5x" />;
  }
  if (isNull(error) && isNull(file)) {
    return <FontAwesome name="music" size="5x" style={{ opacity: isDragActive ? 1 : 0.5 }} />;
  }
  return <FontAwesome name="check" size="5x" />;
}

function renderText(error, file) {
  if (isNotNull(error)) {
    return <h2>{error.message}</h2>;
  }
  if (isNull(file)) {
    return <h2>Drop MP3 file here</h2>;
  }
  return <h2>{file.name} has been uploaded</h2>;
}

export function ModalWrapper(props) {
  const { isOpen, setOpen, tracks } = props;
  const [error, setError] = useState(null);
  const [file, addFile] = useState(null);

  useEffect(() => Modal.setAppElement('body'), []);

  useEffect(() => {
    if (isNotNull(error)) setTimeout(() => setError(null), 3000);
  }, [error]);

  const onDrop = useCallback(async (files) => {
    const [error, file] = fileValidator(files);
    if (isNotNull(error)) {
      setError(error);
      return;
    }
    const resp = await upload(file);
    // TODO: add to list of known files
  }, []);

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  return (
    <React.Fragment>
      <Modal isOpen={isOpen} onRequestClose={handleClose} style={customStyles}>
        <div className="modal-header">
          <span>Add new track</span>
          <button onClick={handleClose}>
            <FontAwesome name="times-circle-o" style={{ fontSize: 20 }} />
          </button>
        </div>
        <div className="modal-content">
          <h1>Upload a file:</h1>
          <div className="modal-upload" {...getRootProps()}>
            {renderIcon(error, file, isDragActive)}
            {renderText(error, file)}
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
}
