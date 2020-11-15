const { isUndefined } = require('../lib/utils')
const fs = require('fs').promises

const SUPPORTED_FILES = ['mp3']

module.exports = async function checkQuery(req, res, next) {
  const { path } = req.query

  if (isUndefined(path)) {
    return res.status(400).send({ msg: '"path" query param must be defined' })
  }

  if (!isUndefined(path) && SUPPORTED_FILES.some(type => path.endsWith(type))) {
    return res
      .status(400)
      .send({ msg: `Only ${String(SUPPORTED_FILES)} are suppoerted` })
  }

  try {
    await fs.access(path)
    return next()
  } catch (err) {
    return res.status(400).send({ msg: '"path" is not pointing to valid file' })
  }
}
