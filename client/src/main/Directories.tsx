import React from 'react'
import FontAwesome from 'react-fontawesome'
import { API } from '../types'

import style from './Directories.module.css'

interface DirectoriesProps {
  fetchAssets: (path?: string) => Promise<void>
  tracks: API.Track[]
  dirs: API.Directory[]
}

const nestedLevel = (path: string): number => {
  return path.split('/').length - 1
}

const previousDir = (path: string): string => {
  return path.split('/').slice(0, -2).join('/')
}

type GoBackProps = {
  text?: string
}

function GoBack({ text = '. . /' }: GoBackProps): JSX.Element {
  return (
    <div style={{ marginLeft: -10 }}>
      <FontAwesome name="folder-open-o" style={{ marginRight: 5 }} />
      <span>{text}</span>
    </div>
  )
}

export default function Directories(
  props: DirectoriesProps
): JSX.Element | null {
  const { dirs, tracks, fetchAssets } = props
  if (dirs.length === 0 && tracks.length === 0) {
    return null
  }

  if (dirs.length === 0 && nestedLevel(tracks[0].url) > 1) {
    return (
      <div className={style['dirs-container']}>
        <div
          className={style['dirs-folder']}
          onClick={() =>
            fetchAssets(encodeURIComponent(previousDir(tracks[0].url)))
          }
        >
          <GoBack />
        </div>
      </div>
    )
  }

  return (
    <div className={style['dirs-container']}>
      {dirs.length > 0 && nestedLevel(dirs[0].url) > 1 ? (
        <div
          className={style['dirs-folder']}
          onClick={() =>
            props.fetchAssets(encodeURIComponent(previousDir(dirs[0].url)))
          }
        >
          <GoBack />
        </div>
      ) : null}
      {dirs.map(dir => (
        <div
          key={dir.name}
          className={style['dirs-folder']}
          onClick={() => fetchAssets(encodeURIComponent(dir.url))}
        >
          <GoBack text={dir.name} />
        </div>
      ))}
    </div>
  )
}
