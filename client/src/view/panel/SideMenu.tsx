import React from 'react'
import Directories from './Directories'
import { API } from '../../types'

type SideMenuProps = {
  isOpen: boolean
  dirs: API.Directory[]
  tracks: API.Track[]
  fetchAssets: (path?: string) => Promise<void>
}

export default function SideMenu(props: SideMenuProps): JSX.Element {
  return (
    <Directories
      visible={props.isOpen}
      fetchAssets={props.fetchAssets}
      tracks={props.tracks}
      dirs={props.dirs}
    />
  )
}
