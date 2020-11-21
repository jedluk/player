import React from 'react'

import style from './EmptyView.module.css'

export default function EmptyView() {
  return (
    <div className={style.container}>
      <h1>It looks like there is nothing to play</h1>
      <h3>Please change current directory</h3>
    </div>
  )
}
