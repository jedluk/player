import React from 'react'

import style from './LoadingPlaceholder.module.css'

export default function LoadingPlaceholder(): JSX.Element {
  return (
    <div className={style.container}>
      <h1>Loading tracks...</h1>
    </div>
  )
}
