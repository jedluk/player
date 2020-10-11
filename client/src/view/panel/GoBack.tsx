import React from 'react'
import GoBackItem from './GoBackItem'

import style from './Directories.module.css'

interface GoBackProps {
  onClick: () => void
}

export default function GoBack(props: GoBackProps): JSX.Element {
  return (
    <div className={style['dirs-folder']} onClick={props.onClick}>
      <GoBackItem />
    </div>
  )
}
