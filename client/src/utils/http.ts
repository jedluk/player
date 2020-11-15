import { API } from '../types'
import { fetch } from './globals'
import { ERROR_CODES, API_URL } from './config'

export function getAssets(
  path: string = 'home',
  withFiles: boolean = false
): Promise<API.Assets> {
  const queryParams = new URLSearchParams()
  queryParams.append('path', path)
  if (withFiles) queryParams.append('fileTypes', 'mp3')

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
