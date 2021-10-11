import React, { RefObject, useCallback, useState } from 'react'
import FontAwesome from 'react-fontawesome'
import { joinClasses } from '../../utils/lib'

import style from './VolumeSetter.module.css'

interface VolumeSetterProps {
  volume: number
  onSetVolume: (step: number) => void
}

export default function VolumeSetter(props: VolumeSetterProps) {
  const { volume, onSetVolume } = props

  return (
    <button
      className={style.root}
      style={{
        color: 'black',
        background:
          'linear-gradient(' +
          [
            'to top',
            `var(--dark-primary-color) ${volume * 100}%`,
            'var(--accent-color)',
          ].join(',') +
          ')',
      }}
    >
      <FontAwesome name="volume-off" />
      <div
        className={joinClasses(style.setter, style['setter-up'])}
        onClick={() => onSetVolume(0.05)}
      >
        <FontAwesome name="volume-up" style={{ fontSize: 10 }} />
      </div>
      <div
        className={joinClasses(style.setter, style['setter-down'])}
        onClick={() => onSetVolume(-0.05)}
      >
        <FontAwesome name="volume-down" style={{ fontSize: 10 }} />
      </div>
    </button>
  )
}
