import React, {
  useCallback,
  useReducer,
  useMemo,
  useEffect,
  useState,
  useContext,
} from 'react'
import { Context } from './AppContext'
import { API, Maybe } from './types'
import {
  findNextTrack,
  generateModifiers,
  serializeTracks,
  filterTracks,
} from './utils/tracks'
import { stripPath } from './network/http'
import { ASSETS } from './network/assets'
import { Player } from './view/player/Player'
import MainView from './view/scheme/MainView'
import SideMenu from './view/panel/SideMenu'
import LoadingPlaceholder from './view/scheme/LoadingPlaceholder'
import { rootReducer, ChangeFilterPayload, initialState } from './App.reducer'
import { SettingsPanel } from './common/SettingsPanel'

import style from './App.module.css'

function App(): JSX.Element {
  const [state, dispatch] = useReducer(rootReducer, initialState)

  const { tracks, dirs, filters, links } = state
  const { defaultDir, setDefaultDir } = useContext(Context)

  const [track, setTrack] = useState<Maybe<API.TrackDetails>>(null)
  const [initialized, setInitialized] = useState(false)
  const serializedTracks = serializeTracks(tracks)

  const fetchAssets = useCallback(
    (path?: string) =>
      ASSETS.GET(path)
        .then((assets: API.Assets) =>
          dispatch({ type: 'SETTLE_FILES', payload: assets })
        )
        .catch((err: API.Error) => console.error(err.message))
        .finally(() => setInitialized(true)),
    []
  )

  const changeFilter = useCallback(
    (payload: ChangeFilterPayload): void =>
      dispatch({
        type: 'CHANGE_FILTER',
        payload,
      }),
    []
  )

  useEffect(() => {
    fetchAssets(defaultDir)
  }, [fetchAssets, defaultDir])

  useEffect(() => {
    if (links.self !== null) {
      setDefaultDir(stripPath(links.self.href))
    }
  }, [links, setDefaultDir])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const modifiers = useMemo(() => generateModifiers(tracks), [serializedTracks])

  const filteredTracks = filterTracks(tracks, filters)
  const isFiltered = !Object.is(tracks, filteredTracks)

  return (
    <div className={style.App}>
      <div className={style.view}>
        <SettingsPanel />
        {initialized ? (
          <MainView
            isFiltered={isFiltered}
            track={track}
            modifiers={modifiers}
            dirs={dirs}
            links={links}
            tracks={filteredTracks}
            changeFilter={changeFilter}
            fetchAssets={fetchAssets}
            setTrack={setTrack}
          />
        ) : (
          <LoadingPlaceholder />
        )}
        <SideMenu dirs={dirs} links={links} fetchAssets={fetchAssets} />
      </div>
      <Player
        track={track}
        nextTrack={findNextTrack(track, filteredTracks)}
        setTrack={setTrack}
      />
    </div>
  )
}

export default App
