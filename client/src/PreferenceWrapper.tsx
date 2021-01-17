import React, { useCallback, useEffect, useState } from 'react'
import { API, Maybe } from './types'
import {
  getPreferences,
  patchPreferences as patchPreferencesCall,
  postPreferences,
} from './utils/http'

interface PreferenceWrapperProps {
  children: React.ReactNode
}

const DEFAULT_PREFERENCES: API.Preferences = {
  directory: 'home',
  theme: 'theme1',
  language: 'en',
}

function fallbackToDefault(
  preferences: Maybe<API.Preferences>
): API.Preferences {
  return preferences === null ? DEFAULT_PREFERENCES : preferences
}

export function PreferenceWrapper(
  props: PreferenceWrapperProps
): Maybe<React.ReactNode> {
  const [preferences, setPreferences] = useState<API.Preferences>(
    {} as API.Preferences
  )

  useEffect(() => {
    getPreferences()
      .then(preferences => setPreferences(fallbackToDefault(preferences)))
      .catch(() => setPreferences(DEFAULT_PREFERENCES))
  }, [])

  useEffect(() => {
    if (preferences === DEFAULT_PREFERENCES) {
      postPreferences(preferences)
    }
  }, [preferences])

  const patchPreferences = useCallback((payload: Partial<API.Preferences>) => {
    patchPreferencesCall(payload)
      .catch(console.error)
      .finally(() => setPreferences(prev => ({ ...prev, ...payload })))
  }, [])

  if (Object.keys(preferences).length === 0) {
    return null
  }

  return React.Children.map(props.children, child =>
    React.isValidElement(child)
      ? React.cloneElement(child, { preferences, patchPreferences })
      : child
  )
}
