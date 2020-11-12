import React, { useCallback, useEffect } from 'react'
import FontAwesome from 'react-fontawesome'
import { Theme, ThemeMap } from './themeMap'
import { defaultsTo } from '../utils/lib'

interface ThemeLoaderProps {
  theme: Theme
  setThemeQueue: (prev: any) => void
}

export function ThemeLoader(props: ThemeLoaderProps) {
  const { theme, setThemeQueue } = props

  useEffect(() => {
    Object.entries(theme).forEach(([kind, value]) =>
      document.documentElement.style.setProperty(kind, value)
    )
  }, [theme])

  const handleThemeChange = useCallback(() => {
    // @ts-expect-error
    setThemeQueue(prev =>
      [...prev].slice(1).concat(defaultsTo([...prev].shift(), 'theme1'))
    )
  }, [setThemeQueue])

  return (
    <button
      onClick={handleThemeChange}
      style={{
        border: `1px solid ${theme['--dark-primary-color']}`,
        color: theme['--dark-primary-color'],
      }}
    >
      <FontAwesome name="cubes" />
    </button>
  )
}
