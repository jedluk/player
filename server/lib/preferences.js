const { promises } = require('fs')
const path = require('path')

class Preferences {
  constructor() {
    this.preferencesPath = path.join(__dirname, '..', 'preferences.json')
    this.dataModel = {
      directory: {
        type: 'string',
        validate: val =>
          new Promise(resolve =>
            promises
              .lstat(val)
              .then(stats => resolve(stats.isDirectory()))
              .catch(() => resolve(false))
          ),
      },
      theme: {
        type: 'string',
        validate: val =>
          Array(6)
            .fill(1)
            .map((_, i) => `theme${i + 1}`)
            .includes(val),
      },
      language: {
        type: 'string',
        validate: val => ['pl', 'en'].includes(val),
      },
    }
  }

  isValid(newPref) {
    return new Promise(resolve => {
      if (
        Object(newPref) !== newPref ||
        !Object.keys(this.dataModel).every(key => key in newPref)
      ) {
        resolve(false)
      }
      Promise.all(
        Object.entries(newPref).map(([key, value]) =>
          this.dataModel[key].validate(value)
        )
      ).then(result => resolve(result.every(Boolean)))
    })
  }

  read() {
    return new Promise(resolve => {
      promises
        .readFile(this.preferencesPath)
        .then(JSON.parse)
        .then(file => Promise.all([Promise.resolve(file), this.isValid(file)]))
        .then(([file, isValid]) => resolve(isValid ? file : null))
        .catch(() => resolve(null))
    })
  }

  write(preferences) {
    return new Promise((resolve, reject) => {
      this.isValid(preferences)
        .then(isValid =>
          isValid
            ? Promise.resolve()
            : reject({ msg: 'Not a valid preferences' })
        )
        .then(() =>
          promises.writeFile(this.preferencesPath, JSON.stringify(preferences))
        )
        .then(() => resolve({ msg: 'Saved' }))
        .catch(() => reject({ msg: 'Could not save a file' }))
    })
  }
}

module.exports = new Preferences()
