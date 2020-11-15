const fs = require('fs')
const { isUndefined, isString } = require('../lib/utils')

const fsPromises = fs.promises

const SUPPORTED_TYPES = ['mp3']

module.exports = async function checkQuery(req, res, next) {
  const { path, fileTypes } = req.query

  if (isUndefined(path)) {
    return res.status(400).send({ msg: '"path" query param must be defined' })
  }

  if (path.toLowerCase() === 'home') {
    return next()
  }

  if (
    isString(fileTypes) &&
    !fileTypes.split(',').every(type => SUPPORTED_TYPES.includes(type))
  ) {
    return res.status(400).send({
      msg: `fileTypes query param must match one of types: ${String(
        SUPPORTED_TYPES
      )}`,
    })
  }

  try {
    const lstat = await fsPromises.lstat(path)
    if (!lstat.isDirectory()) {
      throw new Error('Not a directory')
    }
  } catch {
    return res.status(400).send({ msg: `"${path}" is not a valid directory` })
  }

  next()
}
