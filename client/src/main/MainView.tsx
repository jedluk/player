import React, { Fragment, useCallback, useState } from 'react'
import { API } from '../types'
import SideMenu from './SideMenu'
import Hamburger from './Hamburger'
import Tracks from './Tracks'

import style from './MainView.module.css'

interface MainViewProps {
  track: string
  tracks: API.Track[]
  dirs: API.Directory[]
  fetchAssets: (path?: string) => Promise<void>
  setTrack: (track: string) => void
}

function matchTitle(phrase: string) {
  return (track: API.Track) =>
    phrase === '' || track.title.toLowerCase().includes(phrase.toLowerCase())
}

export default function MainView(props: MainViewProps) {
  const [filteringPhrase, setFilteringPhrase] = useState<string>('')
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  const toggle = useCallback(() => setSidebarOpen(prev => !prev), [])

  return (
    <Fragment>
      <Hamburger toggle={toggle} isOpen={sidebarOpen} />
      <div className={style.container}>
        <Tracks
          fetchAssets={props.fetchAssets}
          currentTrack={props.track}
          tracks={props.tracks.filter(matchTitle(filteringPhrase))}
          setTrack={props.setTrack}
          setFilteringPhrase={setFilteringPhrase}
        />

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
