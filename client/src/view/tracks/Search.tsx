import React, { useCallback, useState } from 'react'
import FontAwesome from 'react-fontawesome'
import { ENTER_KEY_CODE } from '../../utils/globals'

import style from './Search.module.css'

type SeatchProps = {
  visible: boolean
  setFiltered: () => void
  setFilteringPhrase: (text: string) => void
}

export default function Search({
  visible,
  setFiltered,
  setFilteringPhrase,
}: SeatchProps): JSX.Element | null {
  const [value, setValue] = useState<string>('')

  const handleChange = useCallback(
    event => {
      const { value } = event.target
      setValue(value)
      setFilteringPhrase(value)
    },
    [setValue, setFilteringPhrase]
  )

  const handleKeyDown = useCallback(
    event => {
      if (event.keyCode === ENTER_KEY_CODE) {
        setFiltered()
      }
    },
    [setFiltered]
  )

  if (!visible && value === '') {
    return null
  }

  return (
    <div className={style.container}>
      <input
        autoFocus
        className={style.search}
        type="text"
        value={value}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
      <FontAwesome
        name="search"
        style={{
          position: 'absolute',
          left: 10,
          top: 15,
          fontSize: '1rem',
        }}
      />
    </div>
  )
}
