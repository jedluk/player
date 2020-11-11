/* tslint:disable:: Object is possibly 'null'. */
import React, { useCallback, useState, useRef, useEffect } from 'react'
import FontAwesome from 'react-fontawesome'
import VolumeSetter from './VolumeSetter'
import { formatDuration } from '../../utils/lib'
import { FILE_SEPARATOR } from '../../utils/config'

import style from './Player.module.css'

type PlayerProps = {
  track: string
  nextTrack: string | null
  setTrack: (track: string) => void
}

export const Player = ({ track, nextTrack, setTrack }: PlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [assetURL, setAssetURL] = useState<string>('')
  const [isPlayed, setPlayed] = useState<boolean>(false)
  const [museDuration, setMuseDuration] = useState<number>(0)
  const [currentSec, setCurrentSec] = useState<number>(0)

  const audioReady = audioRef !== null && audioRef.current !== null
  const playerReady = audioReady && museDuration > 0
  console.log({ audioRef, museDuration })

  useEffect(() => setAssetURL('http://localhdost:8083/api/stream/file'), [])

  useEffect(() => {
    if (assetURL !== '') {
      setCurrentSec(0)
      // @ts-ignore: Object is possibly 'null'.
      audioRef.current.currentTime = 0
      // @ts-ignore: Object is possibly 'null'.
      audioRef.current.play()
      // setPlayed(true)
    }
  }, [assetURL])

  const handleLoadMetaData = useCallback(
    event => setMuseDuration(Math.ceil(event.target.duration)),
    [setMuseDuration]
  )

  const handleMuseTimeUpdate = useCallback(
    event => setCurrentSec(event.target.currentTime),
    [setCurrentSec]
  )

  const handleRangeChange = useCallback(
    event => {
      if (audioRef !== null && audioRef.current !== null) {
        const { value } = event.target
        audioRef.current.currentTime = parseInt(value)
        setCurrentSec(parseInt(value))
      }
    },
    [setCurrentSec]
  )

  const handlePlayOrPause = useCallback(() => {
    if (audioRef !== null && audioRef.current !== null) {
      if (audioRef.current.paused) {
        audioRef.current.play()
        setPlayed(true)
      } else {
        audioRef?.current.pause()
        setPlayed(false)
      }
    }
  }, [audioRef, setPlayed])

  const handleRestart = useCallback(() => {
    if (audioRef !== null && audioRef.current !== null) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
      setCurrentSec(0)
      setPlayed(true)
    }
  }, [setCurrentSec, setPlayed])

  const handleSkip = useCallback(
    (sec: number, value: number) => {
      if (audioRef !== null && audioRef.current !== null) {
        const audio = audioRef.current
        if (
          (sec >= 0 && audio.currentTime + sec < museDuration) ||
          audio.currentTime + sec >= 0
        ) {
          audioRef.current.currentTime = audioRef.current.currentTime + sec
          setCurrentSec(value + sec)
        }
      }
    },
    [museDuration, setCurrentSec]
  )

  const handleMuseEnd = useCallback(() => {
    if (nextTrack !== null) setTrack(nextTrack)
  }, [setTrack, nextTrack])

  return (
    <div className={style['player-container']}>
      <div className={style['player-buttons']}>
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
        <VolumeSetter audio={audioRef} />
      </div>
      <div className={style['player-slider']}>
        {playerReady ? (
          <h3>{track.slice(track.lastIndexOf(FILE_SEPARATOR) + 1, -4)}</h3>
        ) : null}
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
          onEnded={handleMuseEnd}
          src={assetURL}
        />
        {playerReady ? (
          <>
            <span className={style['time-start']}>{formatDuration(0)}</span>
            <span className={style['time-stop']}>
              {formatDuration(museDuration)}
            </span>
          </>
        ) : null}
      </div>
    </div>
  )
}
