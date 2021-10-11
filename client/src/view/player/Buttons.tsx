import React, { RefObject } from 'react'
import FontAwesome from 'react-fontawesome'
import VolumeSetter from './VolumeSetter'

import style from './Buttons.module.css'
import { RenderWhen } from '../../common/RenderWhen'

interface ButtonsProps {
  isPlaying: boolean
  currentSec: number
  volume: number
  onRestart(): void
  onPlay(): void
  onPause(): void
  onSkip: (interval: number, currentSec: number) => void
  onSetVolume: (step: number) => void
}

export function Buttons({
  volume,
  onSkip,
  onPlay,
  onPause,
  onRestart,
  currentSec,
  onSetVolume,
  isPlaying,
}: ButtonsProps): JSX.Element {
  return (
    <div className={style.playerButtons}>
      <button onClick={onRestart}>
        <FontAwesome name="refresh" />
      </button>
      <button onClick={() => onSkip(-10, currentSec)}>
        <FontAwesome name="step-backward" />
      </button>
      <RenderWhen condition={isPlaying}>
        <button onClick={onPause}>
          <FontAwesome name="pause" />
        </button>
      </RenderWhen>
      <RenderWhen condition={!isPlaying}>
        <button onClick={onPlay}>
          <FontAwesome name="play" />
        </button>
      </RenderWhen>
      <button onClick={() => onSkip(10, currentSec)}>
        <FontAwesome name="step-forward" />
      </button>
      <VolumeSetter volume={volume} onSetVolume={onSetVolume} />
    </div>
  )
}
