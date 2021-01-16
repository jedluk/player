const preferences = require('../lib/preferences')
const ERROR_CODES = require('../errorCodes')

async function getPreferences(req, res) {
  const current = await preferences.read()
  if (current === null) {
    return res.status(404).json({
      msg: 'Valid preferences do not exist!',
      code: ERROR_CODES.preferences.notExist,
    })
  }
  return res.status(200).json(current)
}

module.exports = getPreferences
