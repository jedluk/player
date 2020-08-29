import React, { useCallback, useEffect, useRef, useState } from 'react'
import FontAwesome from 'react-fontawesome'
import { formatTime } from '../utils/lib'
import Search from './Search'
import { API } from '../types'

import style from './Tracks.module.css'

type MyTracksProps = {
  onAdd: () => void
  setTrack: (track: string) => void
  setFilteringPhrase: (text: string) => void
  fetchAssets: (path?: string) => Promise<void>
  currentTrack: string
  tracks: API.Track[]
  dirs: API.Directory[]
}

const downloadStyle = {
  fontSize: '1.2rem',
  marginRight: 10,
  cursor: 'pointer',
}

function MyTracks(props: MyTracksProps) {
  const theadRowRef = useRef<HTMLTableRowElement>(null)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [gridTouched, setGridTouched] = useState<boolean>(false)

  useEffect(() => {
    setLoaded(false)
    setTimeout(
      () => setLoaded(true),
      (0.5 + ((props.tracks.length * 0.5) % 6)) * 1000
    )
  }, [props.tracks.length])

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

  return (
    <div className={style['tracks-container']}>
      <div className={style['header']}>
        <h1>
          My tracks <Search setFilteringPhrase={props.setFilteringPhrase} />
        </h1>
      </div>
      {props.dirs.length > 0 ? (
        <div className={style['dirs-container']}>
          {props.dirs.map(dir => (
            <div
              key={dir.name}
              className={style['dirs-folder']}
              onClick={() => props.fetchAssets(encodeURIComponent(dir.url))}
            >
              <FontAwesome name="folder-open-o" style={{ marginRight: 5 }} />{' '}
              {dir.name}
            </div>
          ))}
        </div>
      ) : null}
      <div className={style['grid-container']} onScroll={handleScroll}>
        <table className={style['tracks-grid']}>
          {props.tracks.length > 0 ? (
            <React.Fragment>
              <thead>
                <tr ref={theadRowRef}>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>Album</th>
                  <th>Year</th>
                  <th>Genre</th>
                  <th>
                    <FontAwesome
                      name="calendar"
                      style={{ fontSize: '0.8rem' }}
                    />
                  </th>
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
                    <td>{formatTime(track.uploaded)}</td>
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
