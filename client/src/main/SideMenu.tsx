import React, { useCallback, useState } from 'react'
import FontAwesome from 'react-fontawesome'

import style from './SideMenu.module.css'
import { API } from '../types'
import Directories from './Directories'
import Hamburger from './Hamburger'

type SideMenuProps = {
  isOpen: boolean
  dirs: API.Directory[]
  tracks: API.Track[]
  toggle: () => void
  fetchAssets: (path?: string) => Promise<void>
}

export default function SideMenu(props: SideMenuProps): JSX.Element {
  return (
    <div className={style.container} style={{ zIndex: 100000 }}>
      <Hamburger toggle={props.toggle} isOpen={props.isOpen} />
      {props.isOpen ? (
        <Directories
          fetchAssets={props.fetchAssets}
          tracks={props.tracks}
          dirs={props.dirs}
        />
      ) : null}
    </div>
  )
}
