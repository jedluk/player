const preferences = require('../lib/preferences')
const ERROR_CODES = require('../errorCodes')

async function postPreferences(req, res) {
  const { body: payload } = req
  try {
    await preferences.write(payload)
    return res.status(200).json(payload)
  } catch (err) {
    return res
      .status(400)
      .json({ msg: err.message, code: ERROR_CODES.preferences.couldNotSave })
  }
}

module.exports = postPreferences
