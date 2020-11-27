import React, { useCallback, useEffect, useState } from 'react'
import { Theme, themeMap, ThemeMap } from './common/themeMap'

interface AppContextProps {
  children: React.ReactNode
}

export type SupportedLocale = 'pl' | 'en'

type AppContext = {
  theme: Theme
  translations: Record<string, string>
  gridExpanded: boolean
  changeTheme: () => void
  changeLocale: () => void
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
  translations: {},
  gridExpanded: false,
  changeTheme: () => null,
  toggleGridExpanded: () => null,
  changeLocale: () => null,
})

export function AppContext(props: AppContextProps) {
  const [theme, setTheme] = useState<Theme>(themeMap.theme1)
  const [locale, setLocale] = useState<SupportedLocale>('en')
  const [translations, setTranslations] = useState({})
  const [gridExpanded, setGridExpanded] = useState<boolean>(false)

  const changeTheme = useCallback(() => setTheme(prev => nextTheme(prev)), [])

  const changeLocale = useCallback(
    () => setLocale(prev => (prev === 'en' ? 'pl' : 'en')),
    []
  )

  const toggleGridExpanded = useCallback(
    () => setGridExpanded(prev => !prev),
    []
  )

  const importTranslations = useCallback(
    async (selectedLanguage: SupportedLocale) =>
      await import(`./translations/${selectedLanguage}.json`),
    []
  )

  useEffect(() => {
    Object.entries(theme).forEach(([kind, value]) =>
      document.documentElement.style.setProperty(kind, value)
    )
  }, [theme])

  useEffect(() => {
    importTranslations(locale)
      .then(res => res.default)
      .then(setTranslations)
  }, [locale, importTranslations])

  const context = {
    theme,
    translations,
    changeTheme,
    gridExpanded,
    toggleGridExpanded,
    changeLocale,
  }
  return <Context.Provider value={context}>{props.children}</Context.Provider>
}
