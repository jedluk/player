export const ERROR_CODES = Object.freeze({
  INVALID_FILE_FORMAT: 1,
  FILE_TOO_LARGE: 2,
  TOO_MANY_FILES: 3,
  REQUEST_FAILED: 4,
})

export const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8083/api'
    : 'http://localhost:6008/api'
