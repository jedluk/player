const preferences = require('../lib/preferences')

async function getPreferences(req, res, next) {
  try {
    const existingPreferences = await preferences.read()
    return res.status(200).json(existingPreferences)
  } catch (err) {
    next(err)
  }
}

module.exports = getPreferences
