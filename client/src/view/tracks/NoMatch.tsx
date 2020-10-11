import React from 'react'
import FontAwesome from 'react-fontawesome'

import style from './NoMatch.module.css'

interface NoMatchProps {
  isFiltered: boolean
  noTracks: boolean
}

export default function NoMatch(props: NoMatchProps): JSX.Element | null {
  const { isFiltered, noTracks } = props
  if (noTracks && isFiltered) {
    return (
      <div className={style.container}>
        <FontAwesome name="exclamation" size="4x" />
        <h1>No match found!</h1>
      </div>
    )
  }
  return null
}
