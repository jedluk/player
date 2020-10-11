import React, { useCallback, useMemo, useEffect, useState } from 'react'
import { API, Filter, FilterPayload } from './types'
import { WithAppContext } from './AppContext'
import {
  findNextTrack,
  generateModifiers,
  serializeTracks,
  trackFilter,
} from './utils/tracks'
import { getAssets } from './utils/http'
import { Player } from './view/player/Player'
import MainView from './view/scheme/MainView'
import LoadingPlaceholder from './view/scheme/LoadingPlaceholder'

import style from './App.module.css'

type AppProps = {
  settleFiles: (assets: API.Assets) => void
  addNewFile: (file: API.Track) => void
  setTrack: (track: string) => void
  changeFilter: (payload: FilterPayload) => void
  appState: {
    track: string
    tracks: API.Track[]
    dirs: API.Directory[]
    filters: Filter
  }
}

function App(props: AppProps): JSX.Element {
  const { appState, settleFiles, setTrack, changeFilter } = props
  const { track, tracks, dirs, filters } = appState
  const [initialized, setInitialized] = useState<boolean>(false)
  const serializedTracks = serializeTracks(tracks)

  const fetchAssets = useCallback(
    (path?: string): Promise<void> => {
      return new Promise(resolve => {
        getAssets(path)
          .then((assets: API.Assets) => settleFiles(assets))
          .catch((err: API.Error) => console.error(err.message))
          .finally(resolve)
      })
    },
    [settleFiles]
  )

  useEffect(() => {
    fetchAssets().then(() => setInitialized(true))
  }, [fetchAssets])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const modifiers = useMemo(() => generateModifiers(tracks), [serializedTracks])

  const filteredTracks = trackFilter(tracks, filters)

  const content = initialized ? (
    <MainView
      track={track}
      isFiltered={filteredTracks.length !== tracks.length}
      tracks={filteredTracks}
      modifiers={modifiers}
      changeFilter={changeFilter}
      dirs={dirs}
      fetchAssets={fetchAssets}
      setTrack={setTrack}
    />
  ) : (
    <LoadingPlaceholder />
  )

  return (
    <div className={style.App}>
      {content}
      <Player
        track={track}
        nextTrack={findNextTrack(track, tracks)}
        setTrack={setTrack}
      />
    </div>
  )
}

export default WithAppContext(App)
