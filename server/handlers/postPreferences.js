const preferences = require('../lib/preferences')

async function postPreferences(req, res) {
  const { body: payload } = req
  await preferences.write(payload).catch(err => {
    return res.status(400).json(err)
  })
  return res.status(200).json(payload)
}

module.exports = postPreferences
