import React from 'react'
import FontAwesome from 'react-fontawesome'
import { RenderWhen } from '../../common/RenderWhen'
import { TranslatedText } from '../../common/TranslatedText'

import style from './NoMatch.module.css'

interface NoMatchProps {
  isModified: boolean
  hasNoTracks: boolean
}

export default function NoMatch(props: NoMatchProps): JSX.Element | null {
  const { isModified, hasNoTracks } = props

  return (
    <RenderWhen condition={hasNoTracks && isModified}>
      <div className={style.container}>
        <FontAwesome name="exclamation" size="4x" />
        <h1>
          <TranslatedText translationKey="mainView.grid.no-match" />
        </h1>
      </div>
    </RenderWhen>
  )
}
