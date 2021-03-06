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
  const { path } = req.query

  if (!path.toLowerCase().endsWith('mp3')) {
    throw new ClientError(
      'Only mp3 files are supported',
      ERROR_CODES.files.notSupportedType
    )
  }
  next()
}

async function validateFileAvailability(req, res, next) {
  const { path } = req.query

  try {
    await fs.access(path)
  } catch {
    throw new ClientError(
      '"path" is not pointing to valid file',
      ERROR_CODES.files.notExists
    )
  }
  next()
}

module.exports = [validatePathQuery, validateFileType, validateFileAvailability]
