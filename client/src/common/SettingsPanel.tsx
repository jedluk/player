import React, { useMemo, useState } from 'react'
import { TranslationProvider } from './TranslationProvider'
import { ThemeLoader } from './ThemeLoader'

import { ThemeMap, themeMap } from './themeMap'
import styles from './SettingsPanel.module.css'

export function SettingsPanel(): JSX.Element {
  const [themeQueue, setThemeQueue] = useState(
    Object.keys(themeMap) as Array<keyof ThemeMap>
  )

  const currentTheme = themeMap[themeQueue[0]]

  return (
    <div className={styles.panel}>
      <ThemeLoader theme={currentTheme} setThemeQueue={setThemeQueue} />
      <TranslationProvider theme={currentTheme} />
    </div>
  )
}
