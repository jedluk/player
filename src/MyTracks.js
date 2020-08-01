import React from 'react';
import FontAwesome from 'react-fontawesome';
import { formatTime, formatDuration } from './utils/lib';
import AddNewButton from './AddNewButton';

import './MyTracks.css';

const downloadStyle = {
  fontSize: '1.2rem',
  marginRight: 10,
  cursor: 'pointer',
};

const withoutExtenstion = (track) => track.slice(0, track.lastIndexOf('.'));

// TODO: remove fallback values!
const MyTracks = (props) => {
  const fallbackSong = '05 Stare Miasto.mp3';
  const fallbackTrack = `${process.env.PUBLIC_URL}/${encodeURIComponent(fallbackSong)}`;
  return (
    <div className="tracks-container">
      <div className="header">
        <h1>My tracks</h1>
        <AddNewButton action={props.onAdd} />
      </div>
      <div className="tracks-grid">
        <div>Title</div>
        <div>Genre</div>
        <div>
          <FontAwesome name="calendar" style={{ fontSize: '0.8rem' }} />
        </div>
        <div>
          <FontAwesome name="clock-o" style={{ fontSize: '0.8rem' }} />
        </div>
        <div></div>
        {props.data.map((track) => (
          <React.Fragment key={track.name}>
            <div
              className="action-play"
              onClick={() => props.setTrack(track.flac || fallbackTrack)}
            >
              {withoutExtenstion(track.name)}
              <span>
                <FontAwesome name="volume-up" />
              </span>
            </div>
            <div>{track.genre}</div>
            <div>{formatTime(track.creationTime)}</div>
            <div>{formatDuration(track.duration)}</div>
            <div>
              <a download={track.name || fallbackSong} href={track.midi || fallbackTrack}>
                <FontAwesome name="arrow-circle-o-down" style={downloadStyle} />
              </a>
              <FontAwesome name="ellipsis-h" />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MyTracks;
