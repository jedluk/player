import React, { useContext, useState } from 'react'
import { API, Modifier } from '../../types'
import { ChangeFilterPayload, Links } from '../../App.reducer'
import { Context } from '../../AppContext'
import EmptyView from './EmptyView'
import SomeAvailable from './SomeAvailable'
import Tracks from '../tracks/Tracks'
import { matchTitle } from '../../utils/tracks'
import { joinClasses, pickBy } from '../../utils/lib'

import style from './MainView.module.css'

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
  const { gridExpanded } = useContext(Context)
  const { tracks, dirs, isFiltered } = props
  const [filteringPhrase, setFilteringPhrase] = useState<string>('')

  const tracksEmpty = Object.keys(tracks).length === 0
  const dirsEmpty = Object.keys(dirs).length === 0

  const isEmpty = !isFiltered && tracksEmpty && dirsEmpty
  const someFolders = !isFiltered && tracksEmpty && !dirsEmpty
  const displayTracks = !tracksEmpty || isFiltered

  const classes = joinClasses(
    style.container,
    gridExpanded ? style.expanded : ''
  )

  return (
    <div className={classes}>
      {someFolders ? <SomeAvailable /> : null}
      {isEmpty ? <EmptyView /> : null}
      {displayTracks ? (
        <Tracks
          isModified={isFiltered || filteringPhrase !== ''}
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
    </div>
  )
}
