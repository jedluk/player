import React from 'react'
import FontAwesome from 'react-fontawesome'
import { TranslatedText } from '../../common/TranslatedText'

import style from './NoMatch.module.css'

interface NoMatchProps {
  isModified: boolean
  noTracks: boolean
}

export default function NoMatch(props: NoMatchProps): JSX.Element | null {
  const { isModified, noTracks } = props
  if (noTracks && isModified) {
    return (
      <div className={style.container}>
        <FontAwesome name="exclamation" size="4x" />
        <h1>
          <TranslatedText translationKey="mainView.grid.no-match" />
        </h1>
      </div>
    )
  }
  return null
}
