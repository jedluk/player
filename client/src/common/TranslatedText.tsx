import React, { useContext } from 'react'
import { Context } from '../AppContext'

interface TranslatedTextProps {
  translationKey: string
}

export function TranslatedText(props: TranslatedTextProps): JSX.Element {
  const { translations } = useContext(Context)
  const { translationKey } = props
  return (
    <React.Fragment>
      {translationKey in translations
        ? translations[translationKey]
        : translationKey}
    </React.Fragment>
  )
}
