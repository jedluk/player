import React from 'react'
import { TranslatedText } from '../../common/TranslatedText'

import style from './EmptyView.module.css'

export default function EmptyView() {
  return (
    <div className={style.container}>
      <h1>
        <TranslatedText translationKey="emptyView.header" />
      </h1>
      <h3>
        <TranslatedText translationKey="emptyView.subHeader" />
      </h3>
    </div>
  )
}
