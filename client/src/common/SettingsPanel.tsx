import React from 'react'
import { ThemeLoader } from './ThemeButton'

import style from './SettingsPanel.module.css'
import { ExpandButton } from './ExpandButton'

export function SettingsPanel(): JSX.Element {
  return (
    <div className={style.panel}>
      <ThemeLoader />
      <ExpandButton />
    </div>
  )
}
