import React, { useCallback, useEffect, useState } from 'react'
import { WithAppContext } from './AppContext'
import { getAssets } from './utils/http'
import { Player } from './main/Player'
import EmptyView from './main/EmptyView'
import MainView from './main/MainView'
import { API } from './types'

import style from './App.module.css'

type AppProps = {
  settleFiles: (assets: API.Assets) => void
  addNewFile: (file: API.Track) => void
  setTrack: (track: string) => void
  appState: {
    track: string
    tracks: API.Track[]
    dirs: API.Directory[]
  }
}

function findNextTrack(trackURL: string, tracks: API.Track[]): string | null {
  if (trackURL === '') return null
  const idx = tracks.findIndex(track => trackURL === track.url)
  return idx + 1 < tracks.length ? tracks[idx + 1].url : null
}

function App(props: AppProps): JSX.Element {
  const { appState, settleFiles, setTrack } = props
  const { track, tracks, dirs } = appState
  const [initialized, setInitialized] = useState<boolean>(false)

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

  return (
    <div className={style.App}>
      {initialized ? (
        <React.Fragment>
          {tracks.length === 0 && dirs.length === 0 ? (
            <EmptyView fetchAssets={fetchAssets} />
          ) : (
            <MainView
              track={track}
              tracks={tracks}
              dirs={dirs}
              fetchAssets={fetchAssets}
              setTrack={setTrack}
            />
          )}
        </React.Fragment>
      ) : (
        <h1>Loading tracks...</h1>
      )}
      <Player
        track={track}
        nextTrack={findNextTrack(track, tracks)}
        setTrack={setTrack}
      />
    </div>
  )
}

export default WithAppContext(App)
