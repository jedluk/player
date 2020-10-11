import React, { useCallback, useEffect, useRef, useState } from 'react'
import Search from './Search'
import Header from './Header'
import { serializeTracks } from '../../utils/tracks'
import Row from './Row'
import NoMatch from './NoMatch'
import { API, Modifier } from '../../types'
import { FilterPayload } from '../../utils/trackFilter'

import style from './Tracks.module.css'

type MyTracksProps = {
  isFiltered: boolean
  currentTrack: string
  tracks: API.Track[]
  modifiers: Modifier[]
  setTrack: (track: string) => void
  setFilteringPhrase: (text: string) => void
  fetchAssets: (path?: string) => Promise<void>
  changeFilter: (payload: FilterPayload) => void
}

function MyTracks(props: MyTracksProps) {
  const { tracks, setFilteringPhrase, setTrack } = props

  const theadRowRef = useRef<HTMLTableRowElement>(null)
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    setLoaded(false)
    const timeout = setTimeout(
      () => setLoaded(true),
      (0.5 + ((tracks.length * 0.5) % 6)) * 1000
    )
    return () => clearTimeout(timeout)
  }, [tracks.length])

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
      const isActive = Array.from(
        theadRowRef.current.childNodes
      ).some((node: any) => [...node.classList].includes(style.active))

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
    if (tracks.length > 0) setTrack(tracks[0].url)
  }, [tracks, setTrack])

  const noTracks = tracks.length === 0

  return (
    <div className={style['tracks-container']}>
      <div className={style['header']}>
        <h1>
          My tracks{' '}
          <Search
            visible={!noTracks}
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
          {!noTracks || props.isFiltered ? (
            <tbody>
              {props.tracks.map((track, idx) => (
                <Row
                  key={track.title}
                  style={style}
                  isCurrentTrack={props.currentTrack === track.url}
                  animationDelay={0.2 + ((idx * 0.5) % 6)}
                  track={track}
                  setTrack={props.setTrack}
                  loaded={loaded}
                />
              ))}
            </tbody>
          ) : null}
        </table>
      </div>
      <NoMatch isFiltered={props.isFiltered} noTracks={noTracks} />
    </div>
  )
}

export default MyTracks
