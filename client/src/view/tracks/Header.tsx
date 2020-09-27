import React, { useMemo } from 'react'
import { FilterPayload } from '../../utils/trackFilter'
import { API } from '../../types'
import FilteringItem from './FilteringItem'

import style from './Header.module.css'

interface HeaderProps {
  rowRef: React.Ref<HTMLTableRowElement>
  tracks: API.Track[]
  changeFilter: (payload: FilterPayload) => void
}

const findUnique = (sth: string[]) => Array.from(new Set(sth))

const serializeTracks = (tracks: API.Track[]) =>
  tracks.map(track => track.title).join(',')

type Modifier = {
  name: string
  property: keyof API.Track
  values: string[]
}

export default function Header(props: HeaderProps): JSX.Element {
  const { tracks } = props

  const modyfingHeaders = useMemo(() => {
    const modifiers: Modifier[] = [
      {
        name: 'Artist',
        property: 'artist',
        values: findUnique(tracks.map(track => track.artist)),
      },
      {
        name: 'Album',
        property: 'album',
        values: findUnique(tracks.map(track => track.album)),
      },
      {
        name: 'Year',
        property: 'year',
        values: findUnique(tracks.map(track => track.year)),
      },
    ]
    return modifiers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serializeTracks(tracks)])

  return (
    <thead className={style.header}>
      <tr ref={props.rowRef}>
        <th>Title</th>
        {modyfingHeaders.map(header => (
          <FilteringItem
            changeFilter={props.changeFilter}
            key={header.name}
            property={header.property}
            name={header.name}
            values={header.values}
          />
        ))}
        <th>Genre</th>
      </tr>
    </thead>
  )
}
