import { API } from '../types'
import { fetch } from './globals'
import { ERROR_CODES, API_URL } from './config'
import { defaultsTo } from './lib'

export function getAssets(path: string = 'home'): Promise<API.Assets> {
  const queryParams = new URLSearchParams()
  queryParams.append('path', path)
  queryParams.append('fileTypes', 'mp3')

  return new Promise((resolve, reject) =>
    fetch(`${API_URL}/dirs?${queryParams.toString()}`)
      .then(res => res.json())
      .then(resolve)
      .catch(() =>
        reject({
          code: ERROR_CODES.REQUEST_FAILED,
          message: 'Could not get available trakcs!',
        })
      )
  )
}

export function streamURL(path: string) {
  return `${API_URL}/stream/file?path=${encodeURIComponent(path)}`
}

export function stripPath(url: string): string {
  const searchParams = new URL(url).searchParams
  return defaultsTo(searchParams.get('path'), 'home')
}
