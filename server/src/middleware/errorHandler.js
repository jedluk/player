const { defaultsTo } = require('../lib/utils')

module.exports = function (err, req, res) {
  res
    .status(defaultsTo(err?.status, 500))
    .send({ msg: defaultsTo(err?.message, 'Internal server error') })
}
