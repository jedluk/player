import React from 'react'
import GoBack from './GoBack'
import { API } from '../../types'
import { hasParent, previousDir } from '../../utils/tracks'

import style from './Directories.module.css'
import GoBackItem from './GoBackItem'

interface DirectoriesProps {
  visible: boolean
  tracks: API.Track[]
  dirs: API.Directory[]
  fetchAssets: (path?: string) => Promise<void>
}

export default function Directories(
  props: DirectoriesProps
): JSX.Element | null {
  const { dirs, tracks, fetchAssets, visible } = props

  if (!visible) {
    // TODO: reversed animation based on visible property
    return null
  }

  if (dirs.length === 0 && tracks.length === 0) {
    return <div className={style['dirs-container']} />
  }

  if (dirs.length === 0 && hasParent(tracks[0])) {
    return (
      <div className={style['dirs-container']}>
        <GoBack onClick={() => fetchAssets(previousDir(tracks[0]))} />
      </div>
    )
  }

  return (
    <div className={style['dirs-container']}>
      {dirs.length > 0 && hasParent(dirs[0]) ? (
        <GoBack onClick={() => fetchAssets(previousDir(dirs[0]))} />
      ) : null}
      {dirs.map(dir => (
        <div
          key={dir.name}
          className={style['dirs-folder']}
          onClick={() => fetchAssets(dir.url)}
        >
          <GoBackItem text={dir.name} />
        </div>
      ))}
    </div>
  )
}
