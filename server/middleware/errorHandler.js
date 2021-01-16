const { defaultsTo } = require('../lib/utils')
const ERROR_CODES = require('../errorCodes')

module.exports = function (err = {}, req, res) {
  const { status = 500, message = 'Internal server error' } = err
  res.status(status).send({
    msg: message,
    code: ERROR_CODES.internalError,
  })
}
