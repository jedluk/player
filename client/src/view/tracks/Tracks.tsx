import React, { useCallback, useEffect, useRef, useState } from 'react'
import Search from './Search'
import Header from './Header'
import { serializeTracks } from '../../utils/tracks'
import Row from './Row'
import NoMatch from './NoMatch'
import { API, Maybe, Modifier } from '../../types'
import { ChangeFilterPayload } from '../../App.reducer'
import { TranslatedText } from '../../common/TranslatedText'

import style from './Tracks.module.css'
import { RenderWhen } from '../../common/RenderWhen'

type MyTracksProps = {
  isModified: boolean
  currentTrack: Maybe<API.TrackDetails>
  tracks: API.Track
  modifiers: Modifier[]
  setTrack: (track: API.TrackDetails) => void
  setFilteringPhrase: (text: string) => void
  fetchAssets: (path?: string) => Promise<void>
  changeFilter: (payload: ChangeFilterPayload) => void
}

function MyTracks(props: MyTracksProps) {
  const { tracks, currentTrack, setFilteringPhrase, setTrack } = props
  const size = Object.keys(tracks).length

  const theadRowRef = useRef<HTMLTableRowElement>(null)
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    setLoaded(false)
    const timeout = setTimeout(
      () => setLoaded(true),
      (0.5 + ((size * 0.5) % 6)) * 1000
    )
    return () => clearTimeout(timeout)
  }, [size])

  useEffect(() => {
    if (theadRowRef.current !== null) {
      const scrollContainer = theadRowRef.current.closest(
        `.${style['grid-container']}`
      )
      if (scrollContainer !== null) scrollContainer.scrollTop = 0
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serializeTracks(props.tracks)])

  const handleScroll = useCallback(e => {
    if (theadRowRef.current !== null) {
      const target = e.target as HTMLDivElement
      const isActive = Array.from(theadRowRef.current.childNodes).some(
        (node: any) => [...node.classList].includes(style.active)
      )

      if (target.scrollTop > 0 && !isActive) {
        theadRowRef.current.childNodes.forEach((node: any) =>
          node.classList.toggle(style.active)
        )
      } else if (target.scrollTop <= 0) {
        theadRowRef.current.childNodes.forEach((node: any) =>
          node.classList.toggle(style.active)
        )
      }
    }
  }, [])

  const setFiltered = useCallback(() => {
    if (size > 0) {
      setTrack(Object.values(tracks)[0])
    }
  }, [tracks, setTrack, size])

  const hasNoTrucks = size === 0

  return (
    <div className={style['tracks-container']}>
      <div className={style['header']}>
        <h1>
          <TranslatedText translationKey="mainView.searchbox.header" />{' '}
          <Search
            visible={!hasNoTrucks}
            setFiltered={setFiltered}
            setFilteringPhrase={setFilteringPhrase}
          />
        </h1>
      </div>
      <div className={style['grid-container']} onScroll={handleScroll}>
        <table className={style['tracks-grid']}>
          <Header
            changeFilter={props.changeFilter}
            rowRef={theadRowRef}
            modifiers={props.modifiers}
          />
          <RenderWhen condition={!hasNoTrucks || props.isModified}>
            <tbody>
              {Object.values(props.tracks).map((track, idx) => (
                <Row
                  key={track.title}
                  style={style}
                  isCurrentTrack={currentTrack?.fullPath === track.fullPath}
                  animationDelay={0.2 + ((idx * 0.5) % 6)}
                  track={track}
                  setTrack={props.setTrack}
                  loaded={loaded}
                />
              ))}
            </tbody>
          </RenderWhen>
        </table>
      </div>
      <NoMatch isModified={props.isModified} hasNoTracks={hasNoTrucks} />
    </div>
  )
}

export default MyTracks
