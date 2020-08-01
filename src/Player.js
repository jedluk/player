import React, { useCallback, useState, useRef, useEffect } from 'react';
import FontAwesome from 'react-fontawesome';
import { formatDuration, getFileName } from './utils/lib';
import './Player.css';

export const Player = (props) => {
  const audioRef = useRef(null);
  const [assetURL, setAssetURL] = useState('');
  const [isPlayed, setPlayed] = useState(false);
  const [museDuration, setMuseDuration] = useState(0);
  const [currentSec, setCurrentSec] = useState(0);

  const audioReady = audioRef !== null && audioRef.current !== null;
  const playerReady = audioReady && assetURL.endsWith('.mp3') && museDuration > 0;

  useEffect(() => {
    if (props.track !== '') {
      setAssetURL(props.track);
    }
  }, [props.track]);

  useEffect(() => {
    if (assetURL !== '') {
      setCurrentSec(0);
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setPlayed(true);
    }
  }, [assetURL]);

  const handleLoadMetaData = useCallback(
    (event) => setMuseDuration(Math.ceil(event.target.duration)),
    [setMuseDuration]
  );

  const handleMuseTimeUpdate = useCallback((e) => setCurrentSec(e.target.currentTime), [
    setCurrentSec,
  ]);

  const handleRangeChange = useCallback(
    (e) => {
      if (playerReady) {
        const { value } = e.target;
        audioRef.current.currentTime = parseInt(value);
        setCurrentSec(parseInt(value));
      }
    },
    [playerReady, setCurrentSec]
  );

  const handlePlayOrPause = useCallback(() => {
    if (playerReady) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setPlayed(true);
      } else {
        audioRef.current.pause();
        setPlayed(false);
      }
    }
  }, [playerReady, audioRef, setPlayed]);

  const handleRestart = useCallback(() => {
    if (playerReady) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setCurrentSec(0);
      setPlayed(true);
    }
  }, [playerReady, setCurrentSec, setPlayed]);

  const handleSkip = useCallback(
    (sec, value) => {
      if (playerReady) {
        const audio = audioRef.current;
        if ((sec >= 0 && audio.currentTime + sec < museDuration) || audio.currentTime + sec >= 0) {
          audioRef.current.currentTime = audioRef.current.currentTime + sec;
          setCurrentSec(value + sec);
        }
      }
    },
    [playerReady, museDuration, setCurrentSec]
  );

  return (
    <div className="player-container">
      <div className="player-buttons">
        <button onClick={handleRestart}>
          <FontAwesome name="refresh" />
        </button>
        <button onClick={() => handleSkip(-10, currentSec)}>
          <FontAwesome name="step-backward" />
        </button>
        <button onClick={handlePlayOrPause}>
          <FontAwesome name={isPlayed ? 'pause' : 'play'} />
        </button>
        <button onClick={() => handleSkip(10, currentSec)}>
          <FontAwesome name="step-forward" />
        </button>
      </div>
      <div className="player-slider">
        {playerReady ? <h3>{getFileName(audioRef.current.src)}</h3> : null}
        <input
          type="range"
          name="playbackRate"
          min={0}
          max={museDuration}
          onChange={handleRangeChange}
          value={currentSec}
        />
        <audio
          ref={audioRef}
          onLoadedMetadata={handleLoadMetaData}
          onTimeUpdate={handleMuseTimeUpdate}
          src={assetURL}
        />
        {playerReady ? (
          <>
            <span className="time-start">{formatDuration(0)}</span>
            <span className="time-stop">{formatDuration(museDuration)}</span>
          </>
        ) : null}
      </div>
    </div>
  );
};
