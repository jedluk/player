import React, { useCallback, useEffect, useRef, useState } from 'react'
import Search from './Search'
import Header from './Header'
import { API } from '../../types'
import { joinClasses } from '../../utils/lib'

import style from './Tracks.module.css'

type MyTracksProps = {
  currentTrack: string
  tracks: API.Track[]
  setTrack: (track: string) => void
  setFilteringPhrase: (text: string) => void
  fetchAssets: (path?: string) => Promise<void>
}

function serializeTracks(tracks: API.Track[]): string {
  return tracks.map(track => track.title).join(',')
}

function MyTracks(props: MyTracksProps) {
  const { tracks, setFilteringPhrase, setTrack } = props

  const theadRowRef = useRef<HTMLTableRowElement>(null)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [gridTouched, setGridTouched] = useState<boolean>(false)
  const serializedTracks = serializeTracks(props.tracks)

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
  }, [serializedTracks])

  const handleScroll = useCallback(
    e => {
      if ((e.target as HTMLDivElement).scrollTop > 0 && !gridTouched) {
        setGridTouched(true)
        if (theadRowRef.current !== null) {
          theadRowRef.current.childNodes.forEach((node: any) =>
            node.classList.toggle(style.active)
          )
        }
      } else if ((e.target as HTMLDivElement).scrollTop === 0) {
        setGridTouched(false)
        if (theadRowRef.current !== null) {
          theadRowRef.current.childNodes.forEach((node: any) =>
            node.classList.toggle(style.active)
          )
        }
      }
    },
    [setGridTouched, gridTouched]
  )

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
          {!noTracks ? (
            <React.Fragment>
              <Header ref={theadRowRef} />
              <tbody>
                {props.tracks.map((track, idx) => (
                  <tr
                    key={track.title}
                    className={joinClasses(
                      !loaded ? style.animate : '',
                      props.currentTrack === track.url ? style.active : ''
                    )}
                    style={{
                      animationDuration: `${0.2 + ((idx * 0.5) % 6)}s`,
                    }}
                  >
                    <td
                      className={style['action-play']}
                      onClick={() => props.setTrack(track.url)}
                    >
                      {track.title}
                    </td>
                    <td>{track.artist}</td>
                    <td>{track.album?.slice(0, 10)}</td>
                    <td>{track.year}</td>
                    <td>{track.genre}</td>
                  </tr>
                ))}
              </tbody>
            </React.Fragment>
          ) : null}
        </table>
      </div>
    </div>
  )
}

export default MyTracks
