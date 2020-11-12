import React, { useCallback, useEffect, useState } from 'react'
import FontAwesome from 'react-fontawesome'
import { themeMap, ThemeMap } from './themeMap'
import { defaultsTo } from '../utils/lib'

import styles from './ThemeLoader.module.css'

export function ThemeLoader() {
  const [themeQueue, setThemeQueue] = useState(
    Object.keys(themeMap) as Array<keyof ThemeMap>
  )

  useEffect(() => {
    Object.entries(themeMap[themeQueue[0]]).forEach(([kind, value]) =>
      document.documentElement.style.setProperty(kind, value)
    )
  }, [themeQueue])

  const handleThemeChange = useCallback(() => {
    setThemeQueue(prev => {
      const copy = [...prev]
      return copy.slice(1).concat(defaultsTo(copy.shift(), 'theme1'))
    })
  }, [setThemeQueue])

  const currentTheme = themeMap[themeQueue[0]]

  return (
    <button
      className={styles.icon}
      onClick={handleThemeChange}
      style={{
        border: `2px solid ${currentTheme['--dark-primary-color']}`,
        color: currentTheme['--dark-primary-color'],
      }}
    >
      <FontAwesome name="cubes" />
    </button>
  )
}
