import { API } from '../../types'

export function deduceContentState(
  tracks: API.Track,
  dirs: API.Directory,
  isFiltered: boolean
) {
  const hasNoTracks = Object.keys(tracks).length === 0
  const isDirEmpty = Object.keys(dirs).length === 0

  const isEmpty = !isFiltered && hasNoTracks && isDirEmpty
  const hasFolders = !isFiltered && hasNoTracks && !isDirEmpty
  const hasTracks = !hasNoTracks || isFiltered

  return {
    isEmpty,
    hasFolders,
    hasTracks,
  }
}
