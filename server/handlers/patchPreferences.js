const preferences = require('../lib/preferences')

async function patchPreferences(req, res) {
  const { body: payload } = req
  const newPreferences = {
    ...(await preferences.read()),
    ...payload,
  }
  try {
    await preferences.write(newPreferences)
    return res.status(200).json(newPreferences)
  } catch (err) {
    return res.status(400).json(err)
  }
}

module.exports = patchPreferences
