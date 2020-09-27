import React, { useCallback } from 'react'
import Directories from './Directories'
import { API, Modifier } from '../../types'
import { FilterPayload } from '../../utils/trackFilter'

type SideMenuProps = {
  isOpen: boolean
  dirs: API.Directory[]
  tracks: API.Track[]
  modifiers: Modifier[]
  fetchAssets: (path?: string) => Promise<void>
  changeFilter: (payload: FilterPayload) => void
}

export default function SideMenu(props: SideMenuProps): JSX.Element {
  const { modifiers, changeFilter } = props

  const cleanFilters = useCallback(
    () =>
      modifiers.forEach(modifier =>
        changeFilter({
          property: modifier.property,
          value: null,
        })
      ),
    [modifiers]
  )

  return (
    <Directories
      visible={props.isOpen}
      fetchAssets={props.fetchAssets}
      cleanFilters={cleanFilters}
      tracks={props.tracks}
      dirs={props.dirs}
    />
  )
}
