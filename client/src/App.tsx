import React, {
  useCallback,
  useReducer,
  useMemo,
  useEffect,
  useState,
} from 'react'
import { API } from './types'
import {
  findNextTrack,
  generateModifiers,
  serializeTracks,
  filterTracks,
} from './utils/tracks'
import { getAssets } from './utils/http'
import { Player } from './view/player/Player'
import MainView from './view/scheme/MainView'
import LoadingPlaceholder from './view/scheme/LoadingPlaceholder'
import { rootReducer, State, ChangeFilterPayload } from './App.reducer'

import style from './App.module.css'
import { ThemeLoader } from './common/ThemeLoader'

const initialState: State = {
  dirs: [],
  tracks: [],
  filters: {},
}

function App(): JSX.Element {
  const [state, dispatch] = useReducer(rootReducer, initialState)

  const { tracks, dirs, filters } = state

  const [track, setTrack] = useState<string>('')
  const [initialized, setInitialized] = useState<boolean>(false)
  const serializedTracks = serializeTracks(tracks)

  const fetchAssets = useCallback(
    (path?: string): Promise<void> => {
      return new Promise(resolve => {
        resolve()
        // getAssets(path)
        //   .then((assets: API.Assets) =>
        //     dispatch({ type: 'SETTLE_FILES', payload: assets })
        //   )
        //   .catch((err: API.Error) => console.error(err.message))
        //   .finally(resolve)
      })
    },
    [dispatch]
  )

  const changeFilter = useCallback(
    (payload: ChangeFilterPayload): void =>
      dispatch({
        type: 'CHANGE_FILTER',
        payload,
      }),
    [dispatch]
  )

  useEffect(() => {
    fetchAssets().then(() => setInitialized(true))
  }, [fetchAssets])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const modifiers = useMemo(() => generateModifiers(tracks), [serializedTracks])

  const filteredTracks = filterTracks(tracks, filters)

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
      <ThemeLoader />
      {content}
      <Player
        track={track}
        nextTrack={findNextTrack(track, tracks)}
        setTrack={setTrack}
      />
    </div>
  )
}

export default App
