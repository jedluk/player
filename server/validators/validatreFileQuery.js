const { isUndefined } = require('../lib/utils')
const ERROR_CODES = require('../errorCodes')
const fs = require('fs').promises

const SUPPORTED_FILES = ['mp3']

module.exports = async function checkQuery(req, res, next) {
  const { path } = req.query

  if (isUndefined(path)) {
    return res.status(400).send({
      msg: '"path" query param must be defined',
      code: ERROR_CODES.files.pathNotDefined,
    })
  }

  if (!SUPPORTED_FILES.some(type => path.endsWith(type))) {
    return res.status(400).send({
      msg: `Only ${String(SUPPORTED_FILES)} are supported`,
      code: ERROR_CODES.files.notSupportedFileType,
    })
  }

  try {
    await fs.access(path)
    return next()
  } catch (err) {
    return res
      .status(400)
      .send({
        msg: '"path" is not pointing to valid file',
        code: ERROR_CODES.files.notExists,
      })
  }
}
