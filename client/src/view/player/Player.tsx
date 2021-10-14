import React, { useCallback, useRef, useContext } from 'react'
import { Context } from '../../AppContext'
import { RenderWhen } from '../../common/RenderWhen'
import { streamURL } from '../../network/http'
import { API, Maybe } from '../../types'
import { formatDuration, joinClasses } from '../../utils/lib'
import { Buttons } from './Buttons'

import style from './Player.module.css'
import { useAudioController } from './useAudioController'

interface PlayerProps {
  track: Maybe<API.TrackDetails>
  nextTrack: Maybe<API.TrackDetails>
  setTrack: (track: API.TrackDetails) => void
}

export function Player(props: PlayerProps): JSX.Element {
  const { gridExpanded } = useContext(Context)

  const audioRef = useRef<HTMLAudioElement>(null)

  const { track, nextTrack, setTrack } = props

  const {
    isPlaying,
    volume,
    trackDuration,
    currentTimeSec,
    handleSetVolume,
    handleRestart,
    handlePlay,
    handlePause,
    handleSkip,
    forceSetTime,
  } = useAudioController(audioRef.current)

  const handleRangeChange = useCallback(
    event => forceSetTime(parseInt(event.target.value)),
    [forceSetTime]
  )

  const switchTrack = (): void => {
    if (nextTrack !== null) {
      setTrack(nextTrack)
    }
  }

  const classes = joinClasses(
    style.player,
    gridExpanded ? style.hide : undefined
  )

  const audioStreamURL = track !== null ? streamURL(track.fullPath) : undefined

  return (
    <div className={classes}>
      <Buttons
        isPlaying={isPlaying}
        currentSec={currentTimeSec}
        volume={volume}
        onRestart={handleRestart}
        onPlay={handlePlay}
        onPause={handlePause}
        onSkip={handleSkip}
        onSetVolume={handleSetVolume}
      />
      <div className={style.playerSlider}>
        <RenderWhen condition={track !== null}>
          <h3>{track?.title}</h3>
        </RenderWhen>
        <input
          type="range"
          name="playbackRate"
          min={0}
          max={trackDuration}
          onChange={handleRangeChange}
          value={currentTimeSec}
        />
        <audio ref={audioRef} onEnded={switchTrack} src={audioStreamURL} />
        <RenderWhen condition={trackDuration !== 0}>
          <span className={style['time-start']}>
            {formatDuration(currentTimeSec)}
          </span>
          <span className={style['time-stop']}>
            {formatDuration(trackDuration)}
          </span>
        </RenderWhen>
      </div>
    </div>
  )
}
