const preferences = require('../lib/preferences')

async function patchPreferences(req, res) {
  const { body: payload } = req
  const newPreferences = {
    ...(await preferences.read()),
    ...payload,
  }
  await preferences.write(newPreferences).catch(err => {
    return res.status(400).json(err)
  })
  return res.status(200).json(newPreferences)
}

module.exports = patchPreferences
