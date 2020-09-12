import React, { useCallback, useEffect, useRef, useState } from 'react'
import FontAwesome from 'react-fontawesome'
import Search from './Search'
import { API } from '../types'

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
  const theadRowRef = useRef<HTMLTableRowElement>(null)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [gridTouched, setGridTouched] = useState<boolean>(false)
  const serializedTracks = serializeTracks(props.tracks)

  useEffect(() => {
    setLoaded(false)
    const timeout = setTimeout(
      () => setLoaded(true),
      (0.5 + ((props.tracks.length * 0.5) % 6)) * 1000
    )
    return () => clearTimeout(timeout)
  }, [props.tracks.length])

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

  const noTracks = props.tracks.length === 0

  return (
    <div className={style['tracks-container']}>
      <div className={style['header']}>
        <h1>
          My tracks{' '}
          <Search
            visible={!noTracks}
            setFilteringPhrase={props.setFilteringPhrase}
          />
        </h1>
      </div>
      <div className={style['grid-container']} onScroll={handleScroll}>
        <table className={style['tracks-grid']}>
          {!noTracks ? (
            <React.Fragment>
              <thead>
                <tr ref={theadRowRef}>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>Album</th>
                  <th>Year</th>
                  <th>Genre</th>
                </tr>
              </thead>
              <tbody>
                {props.tracks.map((track, idx) => (
                  <tr
                    key={track.title}
                    className={!loaded ? style.animate : undefined}
                    style={{
                      animationDuration: `${0.2 + ((idx * 0.5) % 6)}s`,
                    }}
                  >
                    <td
                      className={style['action-play']}
                      style={{
                        fontWeight:
                          props.currentTrack === track.url ? 'bold' : 'normal',
                      }}
                      onClick={() => props.setTrack(track.url)}
                    >
                      {track.title.length > 70
                        ? track.title.slice(0, 70) + ' (...) '
                        : track.title}
                      <FontAwesome name="volume-up" />
                    </td>
                    <td>{track.artist}</td>
                    <td>{track.album.slice(0, 10)}</td>
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
