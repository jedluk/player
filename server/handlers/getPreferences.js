const preferences = require('../lib/preferences')

async function getPreferences(req, res) {
  const current = await preferences.read()
  return res.status(200).json(current)
}

module.exports = getPreferences
