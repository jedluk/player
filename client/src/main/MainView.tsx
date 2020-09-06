import React, { useCallback, useState } from 'react'
import { API } from '../types'
import SideMenu from './SideMenu'
import Tracks from './Tracks'

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
    <>
      <SideMenu
        isOpen={sidebarOpen}
        toggle={toggle}
        dirs={props.dirs}
        tracks={props.tracks}
        fetchAssets={props.fetchAssets}
      />
      <Tracks
        fetchAssets={props.fetchAssets}
        currentTrack={props.track}
        tracks={props.tracks.filter(matchTitle(filteringPhrase))}
        setTrack={props.setTrack}
        setFilteringPhrase={setFilteringPhrase}
      />
    </>
  )
}
