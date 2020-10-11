import { API } from '../types'

export type Filter = Record<string, string[]>

export type FilterPayload = {
  property: keyof API.Track
  value: string[] | null
}

export function trackFilter(tracks: API.Track[], filters: Filter) {
  if (Object.keys(filters).length === 0) {
    return tracks
  }
  const filterNames = Object.keys(filters)
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
