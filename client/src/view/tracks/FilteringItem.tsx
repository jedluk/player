import React, { useCallback, useEffect, useState } from 'react'
import { ChangeFilterPayload } from '../../App.reducer'
import FontAwesome from 'react-fontawesome'
import Select from './Select'
import { TranslatedText } from '../../common/TranslatedText'
import { TranslationKey } from '../../translations'

import style from './FilteringItem.module.css'
import { RenderWhen } from '../../common/RenderWhen'

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
  const { property, changeFilter, values, name } = props
  const [isSelectable, setSelectable] = useState(false)
  const [selected, setSelected] = useState<Option[]>([])
  const serializedValues = values.join(',')

  useEffect(() => setSelected([]), [serializedValues])

  const showFilter = useCallback(() => setSelectable(true), [setSelectable])
  const hideFilter = useCallback(() => setSelectable(false), [setSelectable])

  const handleChange = useCallback(
    (options: Option[] | null) => {
      const selectedOptions = options || []
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
        placeholder={
          <TranslatedText
            translationKey={
              `mainView.grid.headers.${name.toLowerCase()}.search` as TranslationKey
            }
          />
        }
        className={style.select}
        onChange={handleChange}
        items={options}
      />
    ) : (
      <React.Fragment>
        <div className={style.content}>
          <TranslatedText
            translationKey={
              `mainView.grid.headers.${name.toLowerCase()}` as TranslationKey
            }
          />
        </div>
        <RenderWhen condition={selected.length > 0}>
          <span className={style.indicator}>
            <FontAwesome name="filter" />
          </span>
        </RenderWhen>
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
