import React from 'react';
import { WithAppContext } from './AppContext';
import { ModalWrapper } from './ModalWrapper';
import { Player } from './Player';
import AddTrack from './AddTrack';
import MyTracks from './MyTracks';
import './App.css';
import { isNotNull } from './utils/lib.ts';

function App(props) {
  const { actions, appState } = props;
  const tracks = appState.files;
  const [isOpen, setOpen] = React.useState(false);
  return (
    <div className="App">
      <ModalWrapper isOpen={isOpen} setOpen={setOpen} tracks={tracks} />
      <div className="App-content">
        {tracks.length === 0 && tracks.every((track) => isNotNull(track.name)) ? (
          <AddTrack onAdd={() => setOpen(true)} />
        ) : (
          <MyTracks
            onAdd={() => setOpen(true)}
            data={tracks.filter((track) => isNotNull(track.name))}
            setTrack={actions.setNewTrack}
          />
        )}
      </div>
      <div className="App-player">
        <Player track={appState.track} />
      </div>
    </div>
  );
}

export default WithAppContext(App);
