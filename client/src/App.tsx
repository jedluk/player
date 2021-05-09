import React, {
  useCallback,
  useReducer,
  useMemo,
  useEffect,
  useState,
  useContext,
} from 'react'
import { Context } from './AppContext'
import { API } from './types'
import {
  findNextTrack,
  generateModifiers,
  serializeTracks,
  filterTracks,
  matchByURL,
} from './utils/tracks'
import { stripPath } from './network/http'
import { ASSETS } from './network/assets'
import { PREFERENCES } from './network/preferences'
import { Player } from './view/player/Player'
import MainView from './view/scheme/MainView'
import SideMenu from './view/panel/SideMenu'
import LoadingPlaceholder from './view/scheme/LoadingPlaceholder'
import { rootReducer, ChangeFilterPayload, initialState } from './App.reducer'
import { SettingsPanel } from './common/SettingsPanel'

import style from './App.module.css'

function App(): JSX.Element {
  const { defaultDir } = useContext(Context)
  const [state, dispatch] = useReducer(rootReducer, initialState)

  const { tracks, dirs, filters, links } = state

  const [track, setTrack] = useState<string>('')
  const [initialized, setInitialized] = useState<boolean>(false)
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
      PREFERENCES.PATCH({
        directory: stripPath(links.self.href),
      })
    }
  }, [links])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const modifiers = useMemo(() => generateModifiers(tracks), [serializedTracks])

  const filteredTracks = filterTracks(tracks, filters)
  const isFiltered = !Object.is(tracks, filteredTracks)

  const mainContent = initialized ? (
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
  )

  return (
    <div className={style.App}>
      <div className={style.view}>
        <SettingsPanel />
        {mainContent}
        <SideMenu dirs={dirs} links={links} fetchAssets={fetchAssets} />
      </div>
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
