const preferences = require('../lib/preferences')
const ERROR_CODES = require('../errorCodes')

async function patchPreferences(req, res, next) {
  const { body: payload } = req
  try {
    const current = await preferences.read()
    const newPreferences = {
      ...current,
      ...payload,
    }
    await preferences.write(newPreferences)
    return res.status(200).json(newPreferences)
  } catch (err) {
    next(err)
  }
}

module.exports = patchPreferences
