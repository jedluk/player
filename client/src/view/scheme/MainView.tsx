import React, { useContext, useState } from 'react'
import { API, Maybe, Modifier } from '../../types'
import { ChangeFilterPayload, Links } from '../../App.reducer'
import { Context } from '../../AppContext'
import EmptyView from './EmptyView'
import SomeAvailable from './SomeAvailable'
import Tracks from '../tracks/Tracks'
import { matchTitle } from '../../utils/tracks'
import { joinClasses, pickBy } from '../../utils/lib'

import style from './MainView.module.css'
import { RenderWhen } from '../../common/RenderWhen'
import { deduceContentState } from './MainView.utils'

interface MainViewProps {
  track: Maybe<API.TrackDetails>
  isFiltered: boolean
  tracks: API.Track
  dirs: API.Directory
  links: Links
  modifiers: Modifier[]
  fetchAssets: (path?: string) => Promise<void>
  setTrack: (track: API.TrackDetails) => void
  changeFilter: (payload: ChangeFilterPayload) => void
}

export default function MainView(props: MainViewProps) {
  const { gridExpanded } = useContext(Context)
  const { tracks, dirs, isFiltered } = props
  const [filteringPhrase, setFilteringPhrase] = useState<string>('')

  const { isEmpty, hasFolders, hasTracks } = deduceContentState(
    tracks,
    dirs,
    isFiltered
  )

  const classes = joinClasses(
    style.container,
    gridExpanded ? style.expanded : ''
  )

  return (
    <div className={classes}>
      <RenderWhen condition={hasFolders}>
        <SomeAvailable />
      </RenderWhen>

      <RenderWhen condition={isEmpty}>
        <EmptyView />
      </RenderWhen>

      <RenderWhen condition={hasTracks}>
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
      </RenderWhen>
    </div>
  )
}
