import React from 'react'

import style from './EmptyView.module.css'

export default function SomeAvailable(): JSX.Element {
  return (
    <div className={style.container}>
      <h1>Current folder does not contain mp3 file(s)</h1>
      <h3>Please try to choose one of existing subfolder(s)</h3>
    </div>
  )
}
