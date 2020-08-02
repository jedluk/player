import React from 'react';
import FontAwesome from 'react-fontawesome';
import { formatTime, formatDuration } from '../utils/lib';
import AddNewButton from '../common/Button';
import { API } from '../types';

import style from './MyTracks.module.css';

type MyTracksProps = {
  onAdd: () => void;
  setTrack: (track: string) => void;
  data: API.Tracks[];
};

const downloadStyle = {
  fontSize: '1.2rem',
  marginRight: 10,
  cursor: 'pointer',
};

const withoutExtenstion = (track: string) => track.slice(0, track.lastIndexOf('.'));

// TODO: remove fallback values!
const MyTracks = (props: MyTracksProps) => {
  const fallbackSong = '05 Stare Miasto.mp3';
  const fallbackTrack = `${process.env.PUBLIC_URL}/${encodeURIComponent(fallbackSong)}`;
  return (
    <div className={style['tracks-container']}>
      <div className={style['header']}>
        <h1>My tracks</h1>
        <AddNewButton action={props.onAdd} />
      </div>
      <div className={style['tracks-grid']}>
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
          <React.Fragment key={track.title}>
            <div className={style['action-play']} onClick={() => props.setTrack(track.url)}>
              {withoutExtenstion(track.title)}
              <span>
                <FontAwesome name="volume-up" />
              </span>
            </div>
            <div>{track.genre}</div>
            <div>sth</div>
            <div>sth</div>
            <div>
              <a download={track.title} href={track.url}>
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
