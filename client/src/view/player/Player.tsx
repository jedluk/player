import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useContext,
} from 'react'
import { Context } from '../../AppContext'
import { streamURL } from '../../network/http'
import { API } from '../../types'
import { formatDuration, joinClasses } from '../../utils/lib'
import { Buttons } from './Buttons'

import style from './Player.module.css'

type PlayerProps = {
  track: string
  trackDetails?: API.TrackDetails
  nextTrack: string | null
  setTrack: (track: string) => void
}

export const Player = ({
  track,
  nextTrack,
  trackDetails,
  setTrack,
}: PlayerProps) => {
  const { gridExpanded } = useContext(Context)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [assetURL, setAssetURL] = useState<string>('')
  const [isPlayed, setPlayed] = useState<boolean>(false)
  const [museDuration, setMuseDuration] = useState<number>(0)
  const [currentSec, setCurrentSec] = useState<number>(0)

  const audioReady = audioRef !== null && audioRef.current !== null
  const playerReady = audioReady && museDuration > 0

  useEffect(() => {
    if (track !== '') setAssetURL(streamURL(track))
  }, [track])

  useEffect(() => {
    if (assetURL !== '' && audioRef !== null && audioRef.current !== null) {
      setCurrentSec(0)
      audioRef.current.currentTime = 0
      audioRef.current.play()
      setPlayed(true)
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
    if (audioRef?.current?.paused) {
      audioRef?.current?.play()
      setPlayed(true)
    } else {
      audioRef?.current?.pause()
      setPlayed(false)
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

  const classes = joinClasses(
    style.player,
    gridExpanded ? style.hide : undefined
  )

  return (
    <div className={classes}>
      <Buttons
        audioRef={audioRef}
        isPlayed={isPlayed}
        currentSec={currentSec}
        handleRestart={handleRestart}
        handlePlayOrPause={handlePlayOrPause}
        handleSkip={handleSkip}
      />
      <div className={style.playerSlider}>
        {playerReady ? <h3>{trackDetails?.title}</h3> : null}
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
            <span className={style['time-start']}>
              {formatDuration(currentSec)}
            </span>
            <span className={style['time-stop']}>
              {formatDuration(museDuration)}
            </span>
          </>
        ) : null}
      </div>
    </div>
  )
}
