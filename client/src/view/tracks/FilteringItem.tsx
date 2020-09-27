import React, { useCallback, useState } from 'react'
import { FilterPayload } from '../../utils/trackFilter'
import FontAwesome from 'react-fontawesome'
import Select from './Select'
import { API } from '../../types'

import style from './FilteringItem.module.css'

interface FileringItemProps {
  name: string
  values: string[]
  property: keyof API.Track
  changeFilter: (payload: FilterPayload) => void
}

type Option = {
  value: string
  label: string
}

function FilteringItem(props: FileringItemProps) {
  const { property, changeFilter } = props
  const [isSelectable, setSelectable] = useState<boolean>(false)
  const [selected, setSelected] = useState<Option[]>([])

  const toggle = useCallback(() => setSelectable(prevState => !prevState), [
    setSelectable,
  ])

  const handleChange = useCallback(
    (selectedOptions: Option[]) => {
      if (selectedOptions.length > 0) toggle()
      setSelected(selectedOptions)
      changeFilter({
        property: property,
        value: selectedOptions.map(option => option.value),
      })
    },
    [property, setSelected, changeFilter, toggle]
  )

  const options = props.values.map(value => ({ value, label: value }))

  const content = isSelectable ? (
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
    <th className={style.root} onMouseEnter={toggle} onMouseLeave={toggle}>
      {content}
    </th>
  )
}

export default FilteringItem
