const preferences = require('../lib/preferences')

async function postPreferences(req, res) {
  const { body: payload } = req
  await preferences.write(payload)
  return res.status(200).json(payload)
}

module.exports = postPreferences
