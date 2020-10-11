import React from 'react'
import { ChangeFilterPayload } from '../../App.reducer'
import { Modifier } from '../../types'
import FilteringItem from './FilteringItem'

import style from './Header.module.css'

interface HeaderProps {
  rowRef: React.Ref<HTMLTableRowElement>
  modifiers: Modifier[]
  changeFilter: (payload: ChangeFilterPayload) => void
}

export default function Header(props: HeaderProps): JSX.Element {
  const { modifiers } = props

  return (
    <thead className={style.header}>
      <tr ref={props.rowRef}>
        <th>Title</th>
        {modifiers.map(modifier => (
          <FilteringItem
            changeFilter={props.changeFilter}
            key={modifier.name}
            property={modifier.property}
            name={modifier.name}
            values={modifier.values}
          />
        ))}
        <th>Genre</th>
      </tr>
    </thead>
  )
}
