import { API, Filter, Maybe, Modifier } from '../types'
import { unique } from './lib'

export function serializeTracks(tracks: API.Track): string {
  return Object.keys(tracks).join(',')
}
export function matchTitle(phrase: string) {
  return (track: API.TrackDetails) =>
    phrase === '' || track.title.toLowerCase().includes(phrase.toLowerCase())
}

export function findNextTrack(track: string, tracks: API.Track): Maybe<string> {
  if (track === '') return null
  const details = Object.values(tracks)
  const nextIndex = details.findIndex(detail => detail.fullPath === track) + 1
  return details[nextIndex] !== undefined ? details[nextIndex].fullPath : null
}

export function matchByURL(trackURL: string, tracks: API.Track) {
  return Object.values(tracks).find(
    trackDetails => trackDetails.fullPath === trackURL
  )
}

export function generateModifiers(tracks: API.Track): Modifier[] {
  const trackDetails = Object.values(tracks)
  return [
    {
      name: 'Artist',
      property: 'artist',
      values: unique(trackDetails.map(track => track.artist)),
    },
    {
      name: 'Album',
      property: 'album',
      values: unique(trackDetails.map(track => track.album)),
    },
    {
      name: 'Year',
      property: 'year',
      values: unique(trackDetails.map(track => track.year)),
    },
  ]
}

export function filterTracks(tracks: API.Track, filters: Filter) {
  const filterNames = Object.keys(filters)
  if (filterNames.length === 0) {
    return tracks
  }

  return Object.values(tracks).reduce(
    (result: API.Track, trackDetails: API.TrackDetails) => {
      if (
        filterNames
          .map(name =>
            filters[name].includes(trackDetails[name as keyof API.TrackDetails])
          )
          .every(Boolean)
      ) {
        result[trackDetails.title] = trackDetails
      }
      return result
    },
    {}
  )
}
