import React, { useContext } from 'react'
import FontAwesome from 'react-fontawesome'
import { Context } from '../AppContext'

export function ThemeLoader() {
  const { changeTheme } = useContext(Context)

  return (
    <button onClick={changeTheme}>
      <FontAwesome name="cubes" />
    </button>
  )
}
