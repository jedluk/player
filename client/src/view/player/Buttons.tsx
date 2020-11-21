import React, { RefObject } from 'react'
import FontAwesome from 'react-fontawesome'
import VolumeSetter from './VolumeSetter'

import style from './Buttons.module.css'

interface ButtonsProps {
  audioRef: RefObject<HTMLAudioElement>
  isPlayed: boolean
  currentSec: number
  handleRestart(): void
  handlePlayOrPause(): void
  handleSkip: (interval: number, currentSec: number) => void
}

export function Buttons(props: ButtonsProps): JSX.Element {
  const { handleSkip, currentSec } = props
  return (
    <div className={style.playerButtons}>
      <button onClick={props.handleRestart}>
        <FontAwesome name="refresh" />
      </button>
      <button onClick={() => handleSkip(-10, currentSec)}>
        <FontAwesome name="step-backward" />
      </button>
      <button onClick={props.handlePlayOrPause}>
        <FontAwesome name={props.isPlayed ? 'pause' : 'play'} />
      </button>
      <button onClick={() => handleSkip(10, currentSec)}>
        <FontAwesome name="step-forward" />
      </button>
      <VolumeSetter audio={props.audioRef} />
    </div>
  )
}
