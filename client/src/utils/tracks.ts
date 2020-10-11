import { API, Filter, Maybe, Modifier } from '../types'
import { FILE_SEPARATOR } from './config'
import { unique } from './lib'

type Item = API.Track | API.Directory

export function serializeTracks(tracks: API.Track[]): string {
  return tracks.map(track => track.title).join(',')
}

export function matchTitle(phrase: string) {
  return (track: API.Track) =>
    phrase === '' || track.title.toLowerCase().includes(phrase.toLowerCase())
}

export function hasParent(item: Item): boolean {
  return item.url.split(FILE_SEPARATOR).length > 2
}

export function previousDir(item: Item): string | undefined {
  if (hasParent(item)) {
    return item.url.split(FILE_SEPARATOR).slice(0, -2).join(FILE_SEPARATOR)
  }
  return undefined
}

export function findNextTrack(
  trackURL: string,
  tracks: API.Track[]
): Maybe<string> {
  if (trackURL === '') return null
  const idx = tracks.findIndex(track => trackURL === track.url)
  return idx + 1 < tracks.length ? tracks[idx + 1].url : null
}

export function generateModifiers(tracks: API.Track[]): Modifier[] {
  return [
    {
      name: 'Artist',
      property: 'artist',
      values: unique(tracks.map(track => track.artist)),
    },
    {
      name: 'Album',
      property: 'album',
      values: unique(tracks.map(track => track.album)),
    },
    {
      name: 'Year',
      property: 'year',
      values: unique(tracks.map(track => track.year)),
    },
  ]
}

export function filterTracks(tracks: API.Track[], filters: Filter) {
  const filterNames = Object.keys(filters)
  if (filterNames.length === 0) {
    return tracks
  }
  return tracks.reduce((result: API.Track[], track: API.Track) => {
    if (
      filterNames
        // @ts-ignore
        .map(name => filters[name].includes(track[name]))
        .every(Boolean)
    ) {
      result.push(track)
    }
    return result
  }, [])
}
