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
  matchByURL,
} from './utils/tracks'
import { getAssets } from './utils/http'
import { Player } from './view/player/Player'
import MainView from './view/scheme/MainView'
import LoadingPlaceholder from './view/scheme/LoadingPlaceholder'
import { rootReducer, State, ChangeFilterPayload } from './App.reducer'
import { SettingsPanel } from './common/SettingsPanel'

import style from './App.module.css'

const initialState: State = {
  dirs: {},
  links: {
    children: null,
    parent: null,
    self: null,
  },
  tracks: {},
  filters: {},
}

function App(): JSX.Element {
  const [state, dispatch] = useReducer(rootReducer, initialState)

  const { tracks, dirs, filters, links } = state

  const [track, setTrack] = useState<string>('')
  const [initialized, setInitialized] = useState<boolean>(false)
  const serializedTracks = serializeTracks(tracks)

  const fetchAssets = useCallback(
    (path?: string): Promise<void> => {
      return new Promise(resolve => {
        getAssets(path)
          .then((assets: API.Assets) =>
            dispatch({ type: 'SETTLE_FILES', payload: assets })
          )
          .catch((err: API.Error) => console.error(err.message))
          .finally(resolve)
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
      isFiltered={!Object.is(tracks, filteredTracks)}
      tracks={filteredTracks}
      modifiers={modifiers}
      changeFilter={changeFilter}
      dirs={dirs}
      links={links}
      fetchAssets={fetchAssets}
      setTrack={setTrack}
    />
  ) : (
    <LoadingPlaceholder />
  )

  return (
    <div className={style.App}>
      <SettingsPanel />
      {content}
      {/* <SideMenu /> */}
      <Player
        track={track}
        trackDetails={matchByURL(track, tracks)}
        nextTrack={findNextTrack(track, tracks)}
        setTrack={setTrack}
      />
    </div>
  )
}

export default App
