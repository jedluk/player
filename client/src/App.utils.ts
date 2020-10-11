import { API, Modifier } from './types'

export function findNextTrack(
  trackURL: string,
  tracks: API.Track[]
): string | null {
  if (trackURL === '') return null
  const idx = tracks.findIndex(track => trackURL === track.url)
  return idx + 1 < tracks.length ? tracks[idx + 1].url : null
}

export function serializeTracks(tracks: API.Track[]): string {
  return tracks.map(track => track.title).join(',')
}

const findUnique = (sth: string[]) => Array.from(new Set(sth))

export function generateModifiers(tracks: API.Track[]): Modifier[] {
  return [
    {
      name: 'Artist',
      property: 'artist',
      values: findUnique(tracks.map(track => track.artist)),
    },
    {
      name: 'Album',
      property: 'album',
      values: findUnique(tracks.map(track => track.album)),
    },
    {
      name: 'Year',
      property: 'year',
      values: findUnique(tracks.map(track => track.year)),
    },
  ]
}
