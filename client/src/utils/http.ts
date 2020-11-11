import { API } from '../types'
import { fetch, encodeURIComponent } from './globals'
import { ERROR_CODES, API_URL } from './config'

export function getAssets(
  path: string = '/home/jedrzej-dev/Desktop/player/assets'
): Promise<API.Assets> {
  const query = `?path=${encodeURIComponent(path)}`
  return new Promise((resolve, reject) =>
    fetch(`${API_URL}/assets${query}`)
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
