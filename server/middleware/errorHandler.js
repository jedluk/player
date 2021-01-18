const ERROR_CODES = require('../errorCodes')
const { APIError } = require('../lib/error')

module.exports = function (err, req, res, next) {
  if (err instanceof APIError) {
    err.log()
    return res.status(err.status).json(err.serialize())
  }
  return res.status(500).json({
    message: 'Internal server error',
    code: ERROR_CODES.internalError,
  })
}
