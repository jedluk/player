import React, { useState } from 'react'
import FontAwesome from 'react-fontawesome'

export function ExpandButton() {
  const [name, setName] = useState('expand')
  return (
    <button
      onClick={() =>
        setName(prev => (prev === 'expand' ? 'compress' : 'expand'))
      }
    >
      <FontAwesome name={name} />
    </button>
  )
}
