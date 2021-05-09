import React, { useCallback, useEffect, useState } from 'react'
import { Theme, themeMap, ThemeMap } from './common/themeMap'
import { TranslationKey, SupportedLocale } from './translations/types'
import { API, Maybe } from './types'
import { fetch } from './utils/globals'
import { loopedNextItem } from './utils/lib'

const locales: SupportedLocale[] = ['en', 'fr', 'pl']
const themes = Object.keys(themeMap) as Array<keyof ThemeMap>

interface AppContextProps {
  preferences: API.Preferences
  patchPreferences: (payload: Partial<API.Preferences>) => void
  children: React.ReactNode
}

type AppContext = {
  theme: Theme
  translations: Maybe<Record<TranslationKey, string>>
  gridExpanded: boolean
  defaultDir: string
  changeTheme: () => void
  changeLocale: () => void
  toggleGridExpanded: () => void
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

  const changeTheme = useCallback(
    () => setTheme(current => loopedNextItem(themes, current)),
    []
  )
  const changeLocale = useCallback(
    () => setLocale(current => loopedNextItem(locales, current)),
    []
  )
  const toggleGridExpanded = useCallback(
    () => setGridExpanded(prev => !prev),
    []
  )

  useEffect(() => {
    Object.entries(themeMap[theme]).forEach(([kind, value]) =>
      document.documentElement.style.setProperty(kind, value)
    )
    patchPreferences({ theme })
  }, [theme, patchPreferences])

  useEffect(() => {
    fetch(`/translations/${locale}.json`)
      .then(res => res.json())
      .then(setTranslations)
    patchPreferences({ language: locale })
  }, [locale, patchPreferences])

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
