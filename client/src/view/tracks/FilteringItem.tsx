import React, { useCallback, useEffect, useState } from 'react'
import { ChangeFilterPayload } from '../../App.reducer'
import FontAwesome from 'react-fontawesome'
import Select from './Select'

import style from './FilteringItem.module.css'

interface FileringItemProps {
  name: string
  values: string[]
  property: 'album' | 'artist' | 'year'
  changeFilter: (payload: ChangeFilterPayload) => void
}

type Option = {
  value: string
  label: string
}

function FilteringItem(props: FileringItemProps) {
  const { property, changeFilter, values } = props
  const [isSelectable, setSelectable] = useState<boolean>(false)
  const [selected, setSelected] = useState<Option[]>([])
  const serializedValues = values.join(',')

  useEffect(() => setSelected([]), [serializedValues])

  const showFilter = useCallback(() => setSelectable(true), [setSelectable])
  const hideFilter = useCallback(() => setSelectable(false), [setSelectable])

  const handleChange = useCallback(
    (selectedOptions: Option[]) => {
      if (selectedOptions.length > 0) hideFilter()
      setSelected(selectedOptions)
      changeFilter({
        property: property,
        value: selectedOptions.map(option => option.value),
      })
    },
    [property, setSelected, changeFilter, hideFilter]
  )

  const options = values.map(value => ({ value, label: value }))

  const content =
    isSelectable && options.length > 1 ? (
      <Select
        value={selected}
        placeholder={`Select ${props.name}`}
        className={style.select}
        onChange={handleChange}
        items={options}
      />
    ) : (
      <React.Fragment>
        <div className={style.content}>{props.name}</div>
        {selected.length > 0 ? (
          <span className={style.indicator}>
            <FontAwesome name="filter" />
          </span>
        ) : null}
      </React.Fragment>
    )

  return (
    <th
      className={style.root}
      onMouseEnter={showFilter}
      onMouseLeave={hideFilter}
    >
      {content}
    </th>
  )
}

export default FilteringItem
