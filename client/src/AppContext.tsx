import React, { useCallback, useEffect, useState } from 'react'
import { Theme, themeMap, ThemeMap } from './common/themeMap'

interface AppContextProps {
  children: React.ReactNode
}

type AppContext = {
  theme: Theme
  changeTheme: () => void
  gridExpanded: boolean
  toggleGridExpanded: () => void
}

function nextTheme(previousTheme: Theme): Theme {
  let themeIndex = Object.entries(themeMap).findIndex(
    ([, theme]) => theme === previousTheme
  )
  const allThemes = Object.keys(themeMap) as Array<keyof ThemeMap>
  const nextKey =
    allThemes[++themeIndex > allThemes.length - 1 ? 0 : themeIndex]
  return themeMap[nextKey]
}

export const Context = React.createContext<AppContext>({
  theme: themeMap.theme1,
  changeTheme: () => null,
  gridExpanded: false,
  toggleGridExpanded: () => null,
})

export function AppContext(props: AppContextProps) {
  const [theme, setTheme] = useState<Theme>(themeMap.theme1)
  const [gridExpanded, setGridExpanded] = useState<boolean>(false)

  const changeTheme = useCallback(() => setTheme(prev => nextTheme(prev)), [])

  const toggleGridExpanded = useCallback(
    () => setGridExpanded(prev => !prev),
    []
  )

  useEffect(() => {
    Object.entries(theme).forEach(([kind, value]) =>
      document.documentElement.style.setProperty(kind, value)
    )
  }, [theme])

  const context = {
    theme,
    changeTheme,
    gridExpanded,
    toggleGridExpanded,
  }
  return <Context.Provider value={context}>{props.children}</Context.Provider>
}