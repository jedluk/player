import React, { useCallback, useState } from 'react';

export const WithAppContext = (Component) => {
  const WithAppContextComponent = (props) => {
    const [files, addFile] = useState([]);
    const [track, setTrack] = useState('');

    const settleFiles = useCallback((files) => addFile(files), [addFile]);

    const addNewFile = useCallback(
      (file) => {
        addFile([...files, file]);
      },
      [files, addFile]
    );

    const appState = {
      track,
      files,
    };

    return (
      <Component
        {...props}
        appState={appState}
        settleFiles={settleFiles}
        addNewFile={addNewFile}
        setTrack={setTrack}
      />
    );
  };

  return WithAppContextComponent;
};
