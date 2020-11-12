import React from 'react'
import FontAwesome from 'react-fontawesome'
import { Theme } from './themeMap'

interface TranslationProviderProps {
  theme: Theme
}

export function TranslationProvider(
  props: TranslationProviderProps
): JSX.Element {
  const { theme } = props
  return (
    <button
      style={{
        border: `1px solid ${theme['--dark-primary-color']}`,
        color: theme['--dark-primary-color'],
      }}
    >
      <FontAwesome name="language" />
    </button>
  )
}
