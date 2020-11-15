import React from 'react'
import Directories from './Directories'
import { API } from '../../types'
import { Links } from '../../App.reducer'

type SideMenuProps = {
  isOpen: boolean
  dirs: API.Directory
  links: Links
  fetchAssets: (path?: string) => Promise<void>
}

export default function SideMenu(props: SideMenuProps): JSX.Element {
  return (
    <Directories
      visible={props.isOpen}
      fetchAssets={props.fetchAssets}
      links={props.links}
      dirs={props.dirs}
    />
  )
}
