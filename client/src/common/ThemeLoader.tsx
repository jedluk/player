import React, { useCallback } from 'react'
import FontAwesome from 'react-fontawesome'
import { themeMap, ThemeMap } from './themeMap'

import styles from './ThemeLoader.module.css'

export function ThemeLoader() {
  const drawTheme = useCallback(() => {
    const themeNumber = Math.floor(Math.random() * 3)
    const theme = Object.keys(themeMap)[themeNumber] as keyof ThemeMap
    Object.entries(themeMap[theme]).forEach(
      ([kind, value]: [string, string]) => {
        console.log({ kind, value })
        document.documentElement.style.setProperty(kind, value)
      }
    )
  }, [])

  return (
    <div className={styles.icon} onClick={drawTheme}>
      <FontAwesome name="globe" />
      <div className={styles.themePicker}>
        {Object.values(themeMap).map(theme => (
          <div
            className={styles.theme}
            style={{
              backgroundImage:
                'linear-gradient(' +
                [
                  'to-right',
                  theme['--light-grey'],
                  theme['--dark-grey'],
                  theme['--ultra-light-grey'],
                ].join(',') +
                ')',
            }}
          />
        ))}
      </div>
    </div>
  )
}
