const fs = require('fs')
const { isUndefined, isString } = require('../lib/utils')
const ERROR_CODES = require('../errorCodes')

const fsPromises = fs.promises
const SUPPORTED_TYPES = ['mp3']

module.exports = async function checkQuery(req, res, next) {
  const { path, fileTypes } = req.query

  if (isUndefined(path)) {
    return res.status(400).send({
      msg: '"path" query param must be defined',
      code: ERROR_CODES.directories.pathNotDefined,
    })
  }

  if (
    isString(fileTypes) &&
    !fileTypes.split(',').every(type => SUPPORTED_TYPES.includes(type))
  ) {
    return res.status(400).send({
      msg: `fileTypes query param must match one of types: ${String(
        SUPPORTED_TYPES
      )}`,
      code: ERROR_CODES.directories.notSupportedFileType,
    })
  }

  if (path.toLowerCase() === 'home') {
    return next()
  }

  try {
    const lstat = await fsPromises.lstat(path)
    if (!lstat.isDirectory()) throw new Error('Not a directory')
    return next()
  } catch {
    return res.status(400).send({
      msg: `"${path}" is not a valid directory`,
      code: ERROR_CODES.directories.notExist,
    })
  }
}
