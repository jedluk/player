import React from 'react'
import { ThemeLoader } from './ThemeButton'

import style from './SettingsPanel.module.css'
import { ExpandButton } from './ExpandButton'
import FontAwesome from 'react-fontawesome'

export function SettingsPanel(): JSX.Element {
  return (
    <div className={style.panel}>
      <ThemeLoader />
      <ExpandButton />
      <button>
        <FontAwesome name="language" />
      </button>
    </div>
  )
}
