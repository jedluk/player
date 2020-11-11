import React from 'react'
import Button from '../../common/Button'

import style from './EmptyView.module.css'
interface EmptyViewProps {
  action: (path?: string) => void
}

export default function EmptyView(props: EmptyViewProps) {
  const { action } = props
  return (
    <div className={style.container} data-portal-id="empty-view">
      <h1>It looks like there is nothing to play</h1>
      <h3>Please change current directory</h3>
    </div>
  )
}
