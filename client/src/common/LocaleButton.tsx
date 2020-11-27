import React, { useContext } from 'react'
import FontAwesome from 'react-fontawesome'
import { Context } from '../AppContext'

export function LocaleButton() {
  const { changeLocale } = useContext(Context)
  return (
    <button onClick={changeLocale}>
      <FontAwesome name="language" />
    </button>
  )
}
