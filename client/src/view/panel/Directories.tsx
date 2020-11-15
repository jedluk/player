import React from 'react'
import GoBack from './GoBack'
import { API, Maybe } from '../../types'

import style from './Directories.module.css'
import GoBackItem from './GoBackItem'
import { Links } from '../../App.reducer'
import { stripPath } from '../../utils/http'

interface DirectoriesProps {
  visible: boolean
  tracks: API.Track
  dirs: API.Directory
  links: Links
  fetchAssets: (path?: string) => Promise<void>
}

export default function Directories(
  props: DirectoriesProps
): Maybe<JSX.Element> {
  const { dirs, tracks, links, fetchAssets, visible } = props

  const emptyDirs = Object.keys(dirs).length === 0
  const emptyTracks = Object.keys(tracks).length === 0

  if (!visible) {
    // TODO: reversed animation based on visible property
    return null
  }

  if (emptyDirs && emptyTracks) {
    return <div className={style['dirs-container']} />
  }

  const { parent } = links
  if (emptyDirs && parent !== null) {
    return (
      <div className={style['dirs-container']}>
        <GoBack onClick={() => fetchAssets(stripPath(parent.href))} />
      </div>
    )
  }

  return (
    <div className={style['dirs-container']}>
      {!emptyDirs && parent !== null ? (
        <GoBack onClick={() => fetchAssets(stripPath(parent.href))} />
      ) : null}
      {Object.entries(dirs).map(([name, location]) => (
        <div
          key={name}
          className={style['dirs-folder']}
          onClick={() => fetchAssets(location)}
        >
          <GoBackItem text={name} />
        </div>
      ))}
    </div>
  )
}
