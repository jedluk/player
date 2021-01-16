const preferences = require('../lib/preferences')
const ERROR_CODES = require('../errorCodes')

async function patchPreferences(req, res) {
  const { body: payload } = req
  const current = await preferences.read()
  const newPreferences = {
    ...current,
    ...payload,
  }
  try {
    await preferences.write(newPreferences)
    return res.status(200).json(newPreferences)
  } catch (err) {
    return res
      .status(400)
      .json({ msg: err.message, code: ERROR_CODES.preferences.couldNotUpdate })
  }
}

module.exports = patchPreferences
