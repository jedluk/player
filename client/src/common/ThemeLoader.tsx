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
    const theme = themeQueue[0]
    Object.entries(themeMap[theme]).forEach(
      ([kind, value]: [string, string]) => {
        console.log({ kind, value })
        document.documentElement.style.setProperty(kind, value)
      }
    )
  }, [themeQueue])

  const handleThemeChange = useCallback(() => {
    setThemeQueue(prev => {
      const copy = [...prev]
      return copy.slice(1).concat(defaultsTo(copy.shift(), 'light'))
    })
  }, [setThemeQueue])

  return (
    <button className={styles.icon} onClick={handleThemeChange}>
      <FontAwesome name="cubes" />
    </button>
  )
}
