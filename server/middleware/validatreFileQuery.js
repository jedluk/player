const fs = require('fs').promises

module.exports = async function checkQuery(req, res, next) {
  const { path } = req.query

  if (isUndefined(path)) {
    return res.status(400).send({ msg: '"path" query param must be defined' })
  }

  await fs.exists(path, (err, callback) => {
    if (err === null) {
      return res.status(400).send({ msg: '"path" query param must be defined' })
    }
    next()
  })
}
