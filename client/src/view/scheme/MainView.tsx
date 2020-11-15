import React, { Fragment, useCallback, useState } from 'react'
import { API, Modifier } from '../../types'
import { ChangeFilterPayload, Links } from '../../App.reducer'
import EmptyView from './EmptyView'
import SideMenu from '../panel/SideMenu'
import Hamburger from '../panel/Hamburger'
import SomeAvailable from './SomeAvailable'
import Tracks from '../tracks/Tracks'
import { matchTitle } from '../../utils/tracks'

import style from './MainView.module.css'
import { pickBy } from '../../utils/lib'

interface MainViewProps {
  track: string
  isFiltered: boolean
  tracks: API.Track
  dirs: API.Directory
  links: Links
  modifiers: Modifier[]
  fetchAssets: (path?: string) => Promise<void>
  setTrack: (track: string) => void
  changeFilter: (payload: ChangeFilterPayload) => void
}

export default function MainView(props: MainViewProps) {
  const { tracks, dirs, isFiltered } = props
  const [filteringPhrase, setFilteringPhrase] = useState<string>('')
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), [])

  const tracksEmpty = Object.keys(tracks).length === 0
  const dirsEmpty = Object.keys(dirs).length === 0

  const isEmpty = !isFiltered && tracksEmpty && dirsEmpty
  const someFolders = !isFiltered && tracksEmpty && !dirsEmpty
  const displayTracks = !tracksEmpty || isFiltered

  return (
    <Fragment>
      <Hamburger toggle={toggleSidebar} isOpen={sidebarOpen} />
      <div className={style.container}>
        {someFolders ? <SomeAvailable /> : null}
        {isEmpty ? <EmptyView /> : null}
        {displayTracks ? (
          <Tracks
            isFiltered={isFiltered}
            fetchAssets={props.fetchAssets}
            changeFilter={props.changeFilter}
            currentTrack={props.track}
            modifiers={props.modifiers}
            tracks={
              pickBy(tracks, matchTitle(filteringPhrase)) as Record<
                string,
                API.TrackDetails
              >
            }
            setTrack={props.setTrack}
            setFilteringPhrase={setFilteringPhrase}
          />
        ) : null}
        <SideMenu
          isOpen={sidebarOpen}
          dirs={props.dirs}
          links={props.links}
          fetchAssets={props.fetchAssets}
        />
      </div>
    </Fragment>
  )
}
