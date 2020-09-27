import React, { Fragment, useCallback, useState } from 'react'
import { API } from '../../types'
import { FilterPayload } from '../../utils/trackFilter'
import EmptyView from './EmptyView'
import SideMenu from '../panel/SideMenu'
import Hamburger from '../panel/Hamburger'
import SomeAvailable from './SomeAvailable'
import Tracks from '../tracks/Tracks'

import style from './MainView.module.css'

interface MainViewProps {
  track: string
  tracks: API.Track[]
  dirs: API.Directory[]
  fetchAssets: (path?: string) => Promise<void>
  setTrack: (track: string) => void
  changeFilter: (payload: FilterPayload) => void
}

function matchTitle(phrase: string) {
  return (track: API.Track) =>
    phrase === '' || track.title.toLowerCase().includes(phrase.toLowerCase())
}

export default function MainView(props: MainViewProps) {
  const { fetchAssets, tracks, dirs } = props
  const [filteringPhrase, setFilteringPhrase] = useState<string>('')
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), [])

  const fetchAndCloseSidebar = useCallback(() => {
    fetchAssets().then(() => setSidebarOpen(false))
  }, [setSidebarOpen, fetchAssets])

  const isEmpty = tracks.length === 0 && dirs.length === 0
  const someFolders = tracks.length === 0 && dirs.length > 0
  const someTracks = tracks.length > 0

  return (
    <Fragment>
      <Hamburger toggle={toggleSidebar} isOpen={sidebarOpen} />
      <div className={style.container}>
        {someFolders ? <SomeAvailable /> : null}
        {isEmpty ? <EmptyView action={fetchAndCloseSidebar} /> : null}
        {someTracks ? (
          <Tracks
            fetchAssets={props.fetchAssets}
            changeFilter={props.changeFilter}
            currentTrack={props.track}
            tracks={props.tracks.filter(matchTitle(filteringPhrase))}
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
