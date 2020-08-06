import React, { useCallback, useRef, useState } from 'react'
import FontAwesome from 'react-fontawesome'
import { formatTime } from '../utils/lib'
import AddNewButton from '../common/Button'
import Search from './Search'
import { API } from '../types'

import style from './Tracks.module.css'

type MyTracksProps = {
  onAdd: () => void
  setTrack: (track: string) => void
  setFilteringPhrase: (text: string) => void
  currentTrack: string
  tracks: API.Track[]
}

const downloadStyle = {
  fontSize: '1.2rem',
  marginRight: 10,
  cursor: 'pointer',
}

const withoutExtenstion = (track: string) =>
  track.slice(0, track.lastIndexOf('.'))

function MyTracks(props: MyTracksProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [gridTouched, setGridTouched] = useState<boolean>(false)

  const handleScroll = useCallback(
    e => {
      if ((e.target as HTMLDivElement).scrollTop > 0 && !gridTouched) {
        setGridTouched(true)
        if (gridRef.current !== null) {
          gridRef.current.classList.toggle(style.active)
        }
      } else if ((e.target as HTMLDivElement).scrollTop === 0) {
        setGridTouched(false)
        if (gridRef.current !== null) {
          gridRef.current.classList.toggle(style.active)
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
        <AddNewButton action={props.onAdd} />
      </div>
      <div
        className={style['tracks-grid']}
        ref={gridRef}
        onScroll={handleScroll}
      >
        <div>Title</div>
        <div>Artist</div>
        <div>Album</div>
        <div>Year</div>
        <div>Genre</div>
        <div>
          <FontAwesome name="calendar" style={{ fontSize: '0.8rem' }} />
        </div>
        <div></div>
        {props.tracks.map(track => (
          <React.Fragment key={track.title}>
            <div
              className={style['action-play']}
              style={{
                fontWeight:
                  props.currentTrack === track.url ? 'bold' : 'normal',
              }}
              onClick={() => props.setTrack(track.url)}
            >
              {track.title.length > 70
                ? withoutExtenstion(track.title).slice(0, 70) + ' (...) '
                : track.title}
              <span>
                <FontAwesome name="volume-up" />
              </span>
            </div>
            <div>{track.artist}</div>
            <div>{track.album}</div>
            <div>{track.year}</div>
            <div>{track.genre}</div>
            <div>{formatTime(track.uploaded)}</div>
            <div>
              <a download={track.title} href={track.url}>
                <FontAwesome name="arrow-circle-o-down" style={downloadStyle} />
              </a>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default MyTracks
