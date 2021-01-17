const preferences = require('../lib/preferences')

async function postPreferences(req, res, next) {
  const { body: payload } = req
  try {
    await preferences.write(payload)
    return res.status(200).json(payload)
  } catch (err) {
    next(ett)
  }
}

module.exports = postPreferences
