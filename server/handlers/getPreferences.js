const preferences = require('../lib/preferences')

async function getPreferences(req, res) {
  const current = await preferences.read()
  if (current === null) {
    return res.status(400).json({ msg: 'Valid preferences do not exist!' })
  }
  return res.status(200).json(current)
}

module.exports = getPreferences
