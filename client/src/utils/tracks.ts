import { API } from '../types'
import { FILE_SEPARATOR } from './config'

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

export const previousDir = (item: Item): string | undefined => {
  if (hasParent(item)) {
    return item.url.split(FILE_SEPARATOR).slice(0, -2).join(FILE_SEPARATOR)
  }
  return undefined
}
