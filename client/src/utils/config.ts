export const FILE_SEPARATOR: string = /win/i.test(window.navigator.appVersion)
  ? '\\'
  : '/'

export const ERROR_CODES = Object.freeze({
  INVALID_FILE_FORMAT: 1,
  FILE_TOO_LARGE: 2,
  TOO_MANY_FILES: 3,
  REQUEST_FAILED: 4,
})

export const API_URL =
  process.env.API !== undefined
    ? String(process.env.API)
    : process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8083/api'
    : '/api'

export const STATICS =
  process.env.NODE_ENV !== 'production' ? `http://localhost:8083/` : '/'
