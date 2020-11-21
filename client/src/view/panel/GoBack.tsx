import React from 'react'
import GoBackItem from './GoBackItem'
import { joinClasses } from '../../utils/lib'

import style from './Directories.module.css'

interface GoBackProps {
  onClick: () => void
}

export default function GoBack(props: GoBackProps): JSX.Element {
  return (
    <div
      className={joinClasses(style['dirs-folder'], style.goBack)}
      onClick={props.onClick}
    >
      <GoBackItem />
    </div>
  )
}
