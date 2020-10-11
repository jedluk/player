import React, { Fragment, useCallback, useState } from 'react'
import { API } from '../../types'
import EmptyView from './EmptyView'
import SideMenu from '../panel/SideMenu'
import Hamburger from '../panel/Hamburger'
import Tracks from '../tracks/Tracks'
import { matchTitle } from '../../utils/tracks'

import style from './MainView.module.css'

interface MainViewProps {
  track: string
  tracks: API.Track[]
  dirs: API.Directory[]
  fetchAssets: (path?: string) => Promise<void>
  setTrack: (track: string) => void
}

export default function MainView(props: MainViewProps) {
  const { fetchAssets } = props
  const [filteringPhrase, setFilteringPhrase] = useState<string>('')
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), [])

  const fetchAndCloseSidebar = useCallback(() => {
    fetchAssets().then(() => setSidebarOpen(false))
  }, [setSidebarOpen, fetchAssets])

  return (
    <Fragment>
      <Hamburger toggle={toggleSidebar} isOpen={sidebarOpen} />
      <div className={style.container}>
        {props.tracks.length === 0 && props.dirs.length === 0 ? (
          <EmptyView action={fetchAndCloseSidebar} />
        ) : (
          <Tracks
            fetchAssets={props.fetchAssets}
            currentTrack={props.track}
            tracks={props.tracks.filter(matchTitle(filteringPhrase))}
            setTrack={props.setTrack}
            setFilteringPhrase={setFilteringPhrase}
          />
        )}
        <SideMenu
          isOpen={sidebarOpen}
          dirs={props.dirs}
          tracks={props.tracks}
          fetchAssets={props.fetchAssets}
        />
      </div>
    </Fragment>
  )
}
