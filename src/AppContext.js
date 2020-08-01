import React, { useCallback, useState } from 'react';

export const WithAppContext = (Component) => {
  const WithAppContextComponent = (props) => {
    const [track, setTrack] = useState('');
    const [files, addFile] = useState([]);

    const addNewFile = useCallback(
      (file) => {
        addFile([...files, file]);
      },
      [files, addFile]
    );

    const appContext = {
      actions: {
        addNewFile,
        setTrack,
      },
      state: {
        track,
        files,
      },
    };

    return <Component {...props} appState={appContext.state} actions={appContext.actions} />;
  };

  return WithAppContextComponent;
};
