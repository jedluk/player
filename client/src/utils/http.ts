import { API } from '../types'
import { fetch } from './globals'
import { ERROR_CODES, API_URL } from './config'
import { defaultsTo } from './lib'

function forwardSuccessful(response: Response) {
  if (response.ok) {
    return response.json()
  }
  return response.json().then(Promise.reject)
}

export function getAssets(path: string = 'home'): Promise<API.Assets> {
  const queryParams = new URLSearchParams()
  queryParams.append('path', path)
  queryParams.append('fileTypes', 'mp3')

  return new Promise((resolve, reject) =>
    fetch(`${API_URL}/dirs?${queryParams.toString()}`)
      .then(forwardSuccessful)
      .then(resolve)
      .catch(() =>
        reject({
          code: ERROR_CODES.REQUEST_FAILED,
          message: 'Could not get available tracks!',
        })
      )
  )
}

export function getPreferences(): Promise<API.Preferences | null> {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/preferences`)
      .then(forwardSuccessful)
      .then(resolve)
      .catch(err => reject(err.code))
  })
}

export function patchPreferences(
  payload: Partial<API.Preferences>
): Promise<API.Preferences> {
  return new Promise(resolve => {
    fetch(`${API_URL}/preferences`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(forwardSuccessful)
      .then(resolve)
      .catch(() => null)
  })
}

export function postPreferences(
  payload: API.Preferences
): Promise<API.Preferences> {
  return new Promise(resolve => {
    fetch(`${API_URL}/preferences`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(forwardSuccessful)
      .then(resolve)
      .catch(() => null)
  })
}

export function streamURL(path: string) {
  return `${API_URL}/stream/file?path=${encodeURIComponent(path)}`
}

export function stripPath(url: string): string {
  const searchParams = new URL(url).searchParams
  return defaultsTo(searchParams.get('path'), 'home')
}
