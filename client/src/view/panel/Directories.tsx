import React, { useCallback } from 'react'
import FontAwesome from 'react-fontawesome'
import { FILE_SEPARATOR } from '../../utils/constans'
import { API } from '../../types'

import style from './Directories.module.css'

interface DirectoriesProps {
  visible: boolean
  tracks: API.Track[]
  dirs: API.Directory[]
  cleanFilters: () => void
  fetchAssets: (path?: string) => Promise<void>
}

const nestedLevel = (path: string): number => {
  return path.split(FILE_SEPARATOR).length - 1
}

const previousDir = (path: string): string => {
  return path.split(FILE_SEPARATOR).slice(0, -2).join(FILE_SEPARATOR)
}

type GoBackProps = {
  text?: string
}

function GoBack({ text = '. . /' }: GoBackProps): JSX.Element {
  return (
    <div>
      <FontAwesome name="folder-open-o" style={{ marginRight: 5 }} />
      <span>{text}</span>
    </div>
  )
}

export default function Directories(
  props: DirectoriesProps
): JSX.Element | null {
  const { dirs, tracks, fetchAssets, cleanFilters, visible } = props

  const handleClickItem = useCallback(
    (item: string) => {
      cleanFilters()
      fetchAssets(encodeURIComponent(item))
    },
    [fetchAssets, cleanFilters]
  )

  if (!visible) {
    // TODO: reversed animation based on visible property
    return null
  }

  if (dirs.length === 0 && tracks.length === 0) {
    return <div className={style['dirs-container']} />
  }

  if (dirs.length === 0 && nestedLevel(tracks[0].url) > 1) {
    console.group(tracks)
    return (
      <div className={style['dirs-container']}>
        <div
          className={style['dirs-folder']}
          onClick={() => handleClickItem(previousDir(tracks[0].url))}
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
          onClick={() => handleClickItem(previousDir(dirs[0].url))}
        >
          <GoBack />
        </div>
      ) : null}
      {dirs.map(dir => (
        <div
          key={dir.name}
          className={style['dirs-folder']}
          onClick={() => handleClickItem(dir.url)}
        >
          <GoBack text={dir.name} />
        </div>
      ))}
    </div>
  )
}
