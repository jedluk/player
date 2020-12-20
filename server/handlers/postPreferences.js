const preferences = require('../lib/preferences')

async function postPreferences(req, res) {
  const { body: payload } = req
  try {
    await preferences.write(payload)
    return res.status(200).json(payload)
  } catch (err) {
    return res.status(400).json(err)
  }
}

module.exports = postPreferences
