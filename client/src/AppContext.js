import React, { useCallback, useState } from 'react'

export const WithAppContext = Component => {
  const WithAppContextComponent = props => {
    const [tracks, addTracks] = useState([])
    const [dirs, addDirs] = useState([])
    const [track, setTrack] = useState('')

    const settleFiles = useCallback(
      assets => {
        addTracks(assets.tracks)
        addDirs(assets.dirs)
      },
      [addTracks, addDirs]
    )

    const appState = {
      track,
      tracks,
      dirs,
    }

    return (
      <Component
        {...props}
        appState={appState}
        settleFiles={settleFiles}
        setTrack={setTrack}
      />
    )
  }

  return WithAppContextComponent
}
