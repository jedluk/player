import React, { useCallback, useEffect, useState } from 'react'
import { Theme, themeMap, ThemeMap } from './common/themeMap'
import { TranslationKey } from './translations/types'
import { API, Maybe } from './types'

interface AppContextProps {
  preferences: API.Preferences
  patchPreferences: (payload: Partial<API.Preferences>) => void
  children?: React.ReactNode
}

export type SupportedLocale = 'pl' | 'en'

type AppContext = {
  theme: Theme
  translations: Maybe<Record<TranslationKey, string>>
  gridExpanded: boolean
  defaultDir: string
  changeTheme: () => void
  changeLocale: () => void
  toggleGridExpanded: () => void
}

function nextTheme(previousTheme: keyof ThemeMap): keyof ThemeMap {
  const allThemes = Object.keys(themeMap) as Array<keyof ThemeMap>
  const currentIdx = allThemes.indexOf(previousTheme)
  return allThemes[(currentIdx + 1) % allThemes.length]
}

function nextLang(previousLang: SupportedLocale): SupportedLocale {
  return previousLang === 'en' ? 'pl' : 'en'
}

export const Context = React.createContext<AppContext>({
  theme: themeMap.theme1,
  translations: null,
  gridExpanded: false,
  defaultDir: '',
  changeTheme: () => null,
  toggleGridExpanded: () => null,
  changeLocale: () => null,
})

export function AppContext(props: AppContextProps) {
  const { preferences, patchPreferences } = props

  const [theme, setTheme] = useState<keyof ThemeMap>(preferences.theme)
  const [locale, setLocale] = useState<SupportedLocale>(preferences.language)

  const [translations, setTranslations] = useState(null)
  const [gridExpanded, setGridExpanded] = useState<boolean>(false)

  const changeTheme = useCallback(() => setTheme(nextTheme), [])
  const changeLocale = useCallback(() => setLocale(nextLang), [])
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
    Object.entries(themeMap[theme]).forEach(([kind, value]) =>
      document.documentElement.style.setProperty(kind, value)
    )
    patchPreferences({ theme })
  }, [theme, patchPreferences])

  useEffect(() => {
    importTranslations(locale)
      .then(res => res.default)
      .then(setTranslations)
    patchPreferences({ language: locale })
  }, [locale, importTranslations, patchPreferences])

  const context = {
    changeLocale,
    changeTheme,
    defaultDir: preferences.directory,
    gridExpanded,
    toggleGridExpanded,
    theme: themeMap[theme],
    translations,
  }

  return <Context.Provider value={context}>{props.children}</Context.Provider>
}
