import React, { useCallback, useEffect, useState } from 'react'
import { WithAppContext } from './AppContext'
import { getAssets } from './utils/http'
import { ModalWrapper } from './modal/ModalWrapper'
import { Player } from './main/Player'
import Tracks from './main/Tracks'
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

function matchTitle(phrase: string) {
  return (track: API.Track) =>
    phrase === '' || track.title.toLowerCase().includes(phrase.toLowerCase())
}

function findNextTrack(trackURL: string, tracks: API.Track[]): string | null {
  if (trackURL === '') return null
  const idx = tracks.findIndex(track => trackURL === track.url)
  return idx + 1 < tracks.length ? tracks[idx + 1].url : null
}

function App(props: AppProps): JSX.Element {
  const { appState, settleFiles, setTrack } = props
  const { track, tracks, dirs } = appState
  const [filteringPhrase, setFilteringPhrase] = useState<string>('')
  const [initialized, setInitialized] = useState<boolean>(false)
  const [isOpen, setOpen] = useState<boolean>(false)

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
      <ModalWrapper
        isOpen={isOpen}
        setOpen={setOpen}
        fetchTracks={fetchAssets}
      />
      <div className={style['App-content']}>
        {initialized ? (
          <React.Fragment>
            {tracks.length === 0 && dirs.length === 0 ? (
              <>
                <h1>It looks like there is nothing to play</h1>
                <h2>Please put some files in assets directory </h2>
              </>
            ) : (
              <Tracks
                onAdd={() => setOpen(true)}
                fetchAssets={fetchAssets}
                currentTrack={track}
                tracks={tracks.filter(matchTitle(filteringPhrase))}
                dirs={dirs}
                setTrack={setTrack}
                setFilteringPhrase={setFilteringPhrase}
              />
            )}
          </React.Fragment>
        ) : (
          <h1>Loading tracks...</h1>
        )}
      </div>
      <div className={style['App-player']}>
        <Player
          track={track}
          nextTrack={findNextTrack(track, tracks)}
          setTrack={setTrack}
        />
      </div>
    </div>
  )
}

export default WithAppContext(App)
