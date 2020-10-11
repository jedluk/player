import React, { Fragment, useCallback, useState } from 'react'
import { API, Modifier } from '../../types'
import { ChangeFilterPayload } from '../../App.reducer'
import EmptyView from './EmptyView'
import SideMenu from '../panel/SideMenu'
import Hamburger from '../panel/Hamburger'
import SomeAvailable from './SomeAvailable'
import Tracks from '../tracks/Tracks'
import { matchTitle } from '../../utils/tracks'

import style from './MainView.module.css'

interface MainViewProps {
  track: string
  isFiltered: boolean
  tracks: API.Track[]
  dirs: API.Directory[]
  modifiers: Modifier[]
  fetchAssets: (path?: string) => Promise<void>
  setTrack: (track: string) => void
  changeFilter: (payload: ChangeFilterPayload) => void
}

export default function MainView(props: MainViewProps) {
  const { fetchAssets, tracks, dirs, isFiltered } = props
  const [filteringPhrase, setFilteringPhrase] = useState<string>('')
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), [])

  const fetchAndCloseSidebar = useCallback(() => {
    fetchAssets().then(() => setSidebarOpen(false))
  }, [setSidebarOpen, fetchAssets])

  const isEmpty = tracks.length === 0 && dirs.length === 0 && !isFiltered
  const someFolders = tracks.length === 0 && dirs.length > 0 && !isFiltered
  const displayTracks = tracks.length > 0 || isFiltered

  return (
    <Fragment>
      <Hamburger toggle={toggleSidebar} isOpen={sidebarOpen} />
      <div className={style.container}>
        {someFolders ? <SomeAvailable /> : null}
        {isEmpty ? <EmptyView action={fetchAndCloseSidebar} /> : null}
        {displayTracks ? (
          <Tracks
            isFiltered={isFiltered}
            fetchAssets={props.fetchAssets}
            changeFilter={props.changeFilter}
            currentTrack={props.track}
            modifiers={props.modifiers}
            tracks={tracks.filter(matchTitle(filteringPhrase))}
            setTrack={props.setTrack}
            setFilteringPhrase={setFilteringPhrase}
          />
        ) : null}
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
