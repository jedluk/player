import React, { useCallback, useEffect, useState } from 'react'
import { Theme, themeMap, ThemeMap } from './common/themeMap'
import { TranslationKey, SupportedLocale } from './translations'
import { API, Maybe } from './types'
import { PREFERENCES } from './network/preferences'
import { fetch } from './utils/globals'
import { isNull, loopedNextItem } from './utils/lib'

const locales: SupportedLocale[] = ['en', 'fr', 'de', 'pl']
const themes = Object.keys(themeMap) as (keyof ThemeMap)[]

type Translation = Record<TranslationKey, string>

type AppContext = {
  theme: Theme
  translations: Translation
  gridExpanded: boolean
  defaultDir: string
  changeTheme: () => void
  changeLocale: () => void
  setDefaultDir: (dir: string) => void
  toggleGridExpanded: () => void
}

export const Context = React.createContext<AppContext>({} as AppContext)

interface AppContextProps {
  children: React.ReactNode
}

export function AppContext(props: AppContextProps) {
  const [theme, setTheme] = useState<Maybe<keyof ThemeMap>>(null)
  const [locale, setLocale] = useState<Maybe<SupportedLocale>>(null)
  const [defaultDir, setDefaultDir] = useState<Maybe<string>>(null)

  const [translations, setTranslations] = useState<Translation>(
    {} as Translation
  )
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
    let preferences: Maybe<API.Preferences> = null
    PREFERENCES.GET()
      .then(response => (preferences = response))
      .catch(() => {
        preferences = PREFERENCES.DEFAULT
        PREFERENCES.POST(PREFERENCES.DEFAULT)
      })
      .finally(() => {
        if (!isNull(preferences)) {
          setTheme(preferences.theme)
          setDefaultDir(preferences.directory)
          setLocale(preferences.language)
        }
      })
  }, [])

  useEffect(() => {
    if (!isNull(theme)) {
      Object.entries(themeMap[theme]).forEach(([kind, value]) =>
        document.documentElement.style.setProperty(kind, value)
      )
      PREFERENCES.PATCH({ theme })
    }
  }, [theme])

  useEffect(() => {
    if (!isNull(locale)) {
      fetch(`/translations/${locale}.json`)
        .then(res => res.json())
        .then(setTranslations)
      PREFERENCES.PATCH({ language: locale })
    }
  }, [locale])

  useEffect(() => {
    if (!isNull(defaultDir)) {
      PREFERENCES.PATCH({ directory: defaultDir })
    }
  }, [defaultDir])

  if (isNull(theme) || isNull(defaultDir) || isNull(locale)) {
    return null
  }

  return (
    <Context.Provider
      value={{
        changeLocale,
        changeTheme,
        defaultDir,
        gridExpanded,
        toggleGridExpanded,
        theme: themeMap[theme],
        setDefaultDir,
        translations,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
