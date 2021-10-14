import React from 'react'
import { ThemeButton } from './ThemeButton'
import { ExpandButton } from './ExpandButton'
import { LocaleButton } from './LocaleButton'

import style from './SettingsPanel.module.css'

export function SettingsPanel(): JSX.Element {
  return (
    <aside className={style.panel}>
      <ThemeButton />
      <ExpandButton />
      <LocaleButton />
    </aside>
  )
}
