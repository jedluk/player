import React, { useContext, useState } from 'react'
import FontAwesome from 'react-fontawesome'
import { Context } from '../AppContext'

export function ExpandButton() {
  const { gridExpanded, toggleGridExpanded } = useContext(Context)
  return (
    <button onClick={toggleGridExpanded}>
      <FontAwesome name={gridExpanded ? 'compress' : 'expand'} />
    </button>
  )
}
