import React, { useCallback, useState } from 'react'
import Directories from './Directories'
import { API } from '../../types'
import { Links } from '../../App.reducer'
import Hamburger from './Hamburger'
import { joinClasses } from '../../utils/lib'

import style from './SideMenu.module.css'

type SideMenuProps = {
  dirs: API.Directory
  links: Links
  fetchAssets: (path?: string) => Promise<void>
}

export default function SideMenu(props: SideMenuProps): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  const toggle = useCallback(() => setSidebarOpen(prev => !prev), [])

  const classes = joinClasses(style.sideMenu, sidebarOpen ? style.open : '')

  return (
    <aside className={classes}>
      <Hamburger toggle={toggle} isOpen={sidebarOpen} />
      <div className={style.scrollingArea}>
        <Directories
          visible={sidebarOpen}
          fetchAssets={props.fetchAssets}
          links={props.links}
          dirs={props.dirs}
        />
      </div>
    </aside>
  )
}
