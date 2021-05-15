import { API } from '../types'
import { fetch } from '../utils/globals'
import { API_URL } from './config'
import { handleHTTPResponse } from './http'

const DEFAULT: API.Preferences = {
  directory: 'home',
  theme: 'theme1',
  language: 'en',
}

function GET(): Promise<API.Preferences> {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/preferences`)
      .then(handleHTTPResponse)
      .then(resolve)
      .catch(err => reject(err))
  })
}

export function PATCH(
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
      .then(handleHTTPResponse)
      .then(resolve)
      .catch(() => resolve({} as API.Preferences))
  })
}

export function POST(payload: API.Preferences): Promise<API.Preferences> {
  return new Promise(resolve => {
    fetch(`${API_URL}/preferences`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(handleHTTPResponse)
      .then(resolve)
      .catch(() => resolve({} as API.Preferences))
  })
}

export const PREFERENCES = {
  GET,
  POST,
  PATCH,
  DEFAULT,
}
