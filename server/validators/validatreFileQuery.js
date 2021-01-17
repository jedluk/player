const fs = require('fs').promises
const { isUndefined } = require('../lib/utils')
const { ClientError } = require('../lib/error')
const ERROR_CODES = require('../errorCodes')

function validatePathQuery(req, res, next) {
  const { path } = req.query

  if (isUndefined(path)) {
    throw new ClientError(
      '"path" query param must be defined',
      ERROR_CODES.files.pathNotDefined
    )
  }
  next()
}

function validateFileType(req, res, next) {
  const types = ['mp3']
  if (!types.some(type => path.endsWith(type))) {
    throw new ClientError(
      `Only ${String(SUPPORTED_FILES)} are supported`,
      ERROR_CODES.files.notSupportedFileType
    )
  }
  next()
}

async function validateFileAvailability() {
  try {
    await fs.access(path)
  } catch {
    throw ClientError(
      '"path" is not pointing to valid file',
      ERROR_CODES.files.notExists
    )
  }
  next()
}

module.exports = [validatePathQuery, validateFileType, validateFileAvailability]
