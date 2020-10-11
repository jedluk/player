import { API } from '../types'

export function isNull(sth: any): boolean {
  return sth === null
}

export function isNil(sth: any): boolean {
  return sth == null
}

export function formatDuration(seconds: number): string {
  const minutes: number = Math.floor(seconds / 60)
  const secondsLeft: number = seconds - minutes * 60
  const displaySeconds = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft
  return `${minutes}:${displaySeconds}`
}

export function formatTime(fromDate: Date): string {
  const date = new Date(fromDate)
  return [
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
    String(date.getFullYear()),
  ].join('.')
}

export function joinClasses(...classes: any[]) {
  return classes.filter(className => typeof className === 'string').join(' ')
}

export function serializeTracks(tracks: API.Track[]): string {
  return tracks.map(track => track.title).join(',')
}
