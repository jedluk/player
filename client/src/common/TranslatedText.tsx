import React, { useContext } from 'react'
import { Context } from '../AppContext'
import { TranslationKey } from '../translations'

interface TranslatedTextProps {
  translationKey: TranslationKey
}

export function TranslatedText(props: TranslatedTextProps): JSX.Element {
  const { translations } = useContext(Context)
  const { translationKey } = props
  return (
    <React.Fragment>
      {translations !== null ? translations[translationKey] : null}
    </React.Fragment>
  )
}
