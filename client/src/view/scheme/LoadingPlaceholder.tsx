import React from 'react'
import { TranslatedText } from '../../common/TranslatedText'

import style from './LoadingPlaceholder.module.css'

export default function LoadingPlaceholder(): JSX.Element {
  return (
    <div className={style.container}>
      <h1>
        <TranslatedText translationKey="mainView.loader-message" />
      </h1>
    </div>
  )
}
