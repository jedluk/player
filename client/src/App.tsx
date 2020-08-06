import React, { useCallback, useEffect, useState } from 'react'
import { WithAppContext } from './AppContext'
import { getTracks } from './utils/http'
import { ModalWrapper } from './modal/ModalWrapper'
import { Player } from './main/Player'
import AddTrack from './common/AddTrack'
import Tracks from './main/Tracks'
import { API } from './types'

import style from './App.module.css'

type AppProps = {
  settleFiles: (files: API.Track[]) => void
  addNewFile: (file: API.Track) => void
  setTrack: (track: string) => void
  appState: {
    track: string
    files: API.Track[]
  }
}

function matchTitle(phrase: string) {
  return (track: API.Track) =>
    phrase === '' || track.title.toLowerCase().includes(phrase.toLowerCase())
}

function App(props: AppProps): JSX.Element {
  const { appState, settleFiles, setTrack } = props
  const { files: tracks, track } = appState

  const [filteringPhrase, setFilteringPhrase] = useState<string>('')
  const [initialized, setInitialized] = useState<boolean>(false)
  const [isOpen, setOpen] = useState<boolean>(false)

  const fetchTracks = useCallback(() => {
    getTracks()
      .then((tracks: API.Track[]) => settleFiles(tracks))
      .catch((err: API.Error) => console.error(err.message))
  }, [settleFiles])

  useEffect(() => {
    fetchTracks()
    setInitialized(true)
  }, [fetchTracks])

  return (
    <div className={style.App}>
      <ModalWrapper
        isOpen={isOpen}
        setOpen={setOpen}
        fetchTracks={fetchTracks}
      />
      <div className={style['App-content']}>
        {initialized ? (
          <React.Fragment>
            {tracks.length === 0 ? (
              <AddTrack onAdd={() => setOpen(true)} />
            ) : (
              <Tracks
                onAdd={() => setOpen(true)}
                currentTrack={track}
                tracks={tracks.filter(matchTitle(filteringPhrase))}
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
        <Player track={appState.track} />
      </div>
    </div>
  )
}

export default WithAppContext(App)
