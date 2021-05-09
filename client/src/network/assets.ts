import { API } from '../types'
import { fetch } from '../utils/globals'
import { API_URL, ERROR_CODES } from './config'
import { handleHTTPResponse } from './http'

function GET(path: string = 'home'): Promise<API.Assets> {
  const queryParams = new URLSearchParams()
  queryParams.append('path', path)
  queryParams.append('fileTypes', 'mp3')

  return new Promise((resolve, reject) =>
    fetch(`${API_URL}/dirs?${queryParams.toString()}`)
      .then(handleHTTPResponse)
      .then(resolve)
      .catch(() =>
        reject({
          code: ERROR_CODES.REQUEST_FAILED,
          message: 'Could not get available tracks!',
        })
      )
  )
}

export const ASSETS = {
  GET,
}
