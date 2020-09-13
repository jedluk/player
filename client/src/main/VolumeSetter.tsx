import React, { RefObject, useCallback, useState } from 'react'
import FontAwesome from 'react-fontawesome'
import { joinClasses } from '../utils/lib'

import style from './VolumeSetter.module.css'

interface VolumeSetterProps {
  audio: RefObject<HTMLAudioElement>
}

export default function VolumeSetter({ audio: audioRef }: VolumeSetterProps) {
  const [volume, setVolume] = useState<number>(0.7)

  const audio = audioRef !== null ? audioRef.current : null

  const changeVolume = useCallback(
    step => {
      if (audio !== null) {
        const nextValue = +(volume + step).toFixed(2)
        if (nextValue >= 0 && nextValue <= 1) {
          audio.volume = nextValue
          setVolume(nextValue)
        }
      }
    },
    [setVolume, volume, audio]
  )

  return (
    <button
      className={style.root}
      style={{
        color: 'black',
        background: `linear-gradient(to top, #545454 ${
          volume * 100
        }%, #d3d3d3 0%)`,
      }}
    >
      <FontAwesome name="volume-off" />
      <div
        className={joinClasses(style.setter, style['setter-up'])}
        onClick={() => changeVolume(0.02)}
      >
        <FontAwesome name="volume-up" style={{ fontSize: 10 }} />
      </div>
      <div
        className={joinClasses(style.setter, style['setter-down'])}
        onClick={() => changeVolume(-0.02)}
      >
        <FontAwesome name="volume-down" style={{ fontSize: 10 }} />
      </div>
    </button>
  )
}
