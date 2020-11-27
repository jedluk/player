import React from 'react'
import { TranslatedText } from '../../common/TranslatedText'

import style from './EmptyView.module.css'

export default function SomeAvailable(): JSX.Element {
  return (
    <div className={style.container}>
      <h1>
        <TranslatedText translationKey="someAvailable.header" />
      </h1>
      <h3>
        <TranslatedText translationKey="someAvailable.subHeader" />
      </h3>
    </div>
  )
}
