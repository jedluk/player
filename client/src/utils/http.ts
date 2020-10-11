import { API } from '../types'
import { fetch } from './globals'
import { ERROR_CODES, API_URL } from './config'

export function getAssets(path?: string): Promise<API.Assets> {
  const query = path !== undefined ? `?path=${path}` : ''
  return new Promise((resolve, reject) =>
    fetch(`${API_URL}/assets${query}`)
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(() =>
        reject({
          code: ERROR_CODES.REQUEST_FAILED,
          message: 'Could not get available trakcs!',
        })
      )
  )
}
