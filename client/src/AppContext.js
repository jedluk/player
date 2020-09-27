import React, { useCallback, useState } from 'react'

export function WithAppContext(Component, appProps) {
  function WithAppContextComponent(props) {
    const [tracks, addTracks] = useState([])
    const [dirs, addDirs] = useState([])
    const [track, setTrack] = useState('')
    const [filters, setFilters] = useState({})

    const settleFiles = useCallback(
      assets => {
        addTracks(assets.tracks)
        addDirs(assets.dirs)
      },
      [addTracks, addDirs]
    )

    const changeFilter = useCallback(
      payload => {
        const { value, property } = payload
        const newFilters = { ...filters }
        if (value === null || value.length === 0) {
          delete newFilters[property]
        } else {
          newFilters[property] = value
        }
        setFilters(newFilters)
      },
      [filters, setFilters]
    )

    const state = {
      appState: {
        track,
        tracks,
        dirs,
        filters,
      },
      settleFiles,
      changeFilter,
      setTrack,
    }
    return <Component {...props} {...state} />
  }

  return React.memo(WithAppContextComponent)
}
