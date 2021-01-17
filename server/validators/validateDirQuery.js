const fs = require('fs')
const { isUndefined, isString } = require('../lib/utils')
const { ClientError } = require('../lib/error')
const ERROR_CODES = require('../errorCodes')

const fsPromises = fs.promises

function validatePathQuery(req, res, next) {
  const { path } = req.query

  if (isUndefined(path)) {
    throw new ClientError(
      '"path" query param must be defined',
      ERROR_CODES.directories.pathNotDefined
    )
  }
  next()
}

function validateFileType(req, res, next) {
  const { fileTypes } = req.query
  const SUPPORTED_TYPES = ['mp3']

  const isValid =
    isString(fileTypes) &&
    fileTypes.split(',').every(type => SUPPORTED_TYPES.includes(type))

  if (!isValid) {
    const message = `fileTypes query param must match one of types: ${String(
      SUPPORTED_TYPES
    )}`
    throw new ClientError(message, ERROR_CODES.directories.notSupportedFileType)
  }
  next()
}

async function validateDirectory(req, rest, next) {
  const { path } = req.query

  if (path.toLowerCase() === 'home') {
    next()
    return
  }
  try {
    const lstat = await fsPromises.lstat(path)
    if (!lstat.isDirectory()) throw Error()
    next()
  } catch {
    throw new ClientError(
      `"${path}" is not a valid directory`,
      ERROR_CODES.directories.notExist
    )
  }
}

module.exports = [validatePathQuery, validateFileType, validateDirectory]
