const { promises } = require('fs')
const path = require('path')
const { APIError, ClientError } = require('../lib/error')
const ERROR_CODES = require('../errorCodes')

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
    return new Promise((resolve, reject) => {
      promises
        .readFile(this.preferencesPath)
        .then(JSON.parse)
        .then(file => Promise.all([Promise.resolve(file), this.isValid(file)]))
        .then(([file, isValid]) =>
          isValid
            ? resolve(file)
            : reject(
                new APIError(
                  'Invalid preferences found',
                  ERROR_CODES.preferences.notValidPreferences,
                  422
                )
              )
        )
        .catch(() =>
          reject(
            new APIError(
              'Preferences do not exist!',
              ERROR_CODES.preferences.notExist,
              404
            )
          )
        )
    })
  }

  writeFile(preferences) {
    return promises.writeFile(this.preferencesPath, JSON.stringify(preferences))
  }

  write(preferences) {
    return new Promise((resolve, reject) => {
      this.isValid(preferences)
        .then(isValid =>
          isValid
            ? Promise.resolve()
            : reject(
                new ClientError(
                  'Not a valid preferences',
                  ERROR_CODES.preferences.notValidPreferences
                )
              )
        )
        .then(() => this.writeFile(preferences))
        .then(() => resolve())
        .catch(() =>
          reject(
            new APIError(
              'Could not save preferences',
              ERROR_CODES.preferences.couldNotSave,
              500
            )
          )
        )
    })
  }
}

module.exports = new Preferences()
