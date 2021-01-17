const ERROR_CODES = require('../errorCodes')
const { APIError } = require('../lib/error')

module.exports = function (err, req, res, next) {
  return res.status(err.status || 500).json(
    err instanceof APIError
      ? err.serialize()
      : {
          message: 'Internal server error',
          code: ERROR_CODES.internalError,
        }
  )
}
