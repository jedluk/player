const { promises } = require('fs')
const path = require('path')

class Preferences {
  constructor() {
    this.preferencesPath = path.join(__dirname, '..', 'preferences.json')
    this.dataModel = {
      directory: 'string',
      theme: Array(6)
        .fill(1)
        .map((_, i) => `theme${i + 1}`),
      language: ['pl', 'en'],
    }
  }

  isValid(newPref) {
    return (
      typeof newPref === 'object' &&
      Object.keys(newPref).length === Object.keys(this.dataModel).length &&
      Object.entries(newPref).every(([key, value]) =>
        key in this.dataModel && Array.isArray(this.dataModel[key])
          ? this.dataModel[key].includes(value)
          : typeof value === this.dataModel[key]
      )
    )
  }

  read() {
    return new Promise(resolve => {
      promises
        .readFile(this.preferencesPath)
        .then(JSON.parse)
        .then(file => resolve(this.isValid(file) ? file : null))
        .catch(() => resolve(null))
    })
  }

  write(preferences) {
    return new Promise((resolve, reject) => {
      if (!this.isValid(preferences)) reject({ msg: 'Not a valid preferences' })
      promises
        .writeFile(this.preferencesPath, JSON.stringify(preferences))
        .then(() => resolve({ msg: 'Saved' }))
        .catch(() => reject({ msg: 'Could not save a file' }))
    })
  }
}

module.exports = new Preferences()
