import React, { useCallback, useState } from 'react'
import FontAwesome from 'react-fontawesome'

import style from './Search.module.css'

type SeatchProps = {
  visible: boolean
  setFilteringPhrase: (text: string) => void
}

export default function Search({
  visible,
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

  if (!visible) {
    return null
  }

  return (
    <div className={style.container}>
      <input
        autoFocus
        className={style.search}
        type="text"
        value={value}
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
