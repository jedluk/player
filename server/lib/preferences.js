const path = require('path')
const fs = require('fs')
const { homedir } = require('os')
const { APIError, ClientError } = require('../lib/error')
const ERROR_CODES = require('../errorCodes')

class Preferences {
  constructor() {
    this.checkDir()
    this.dataModel = {
      directory: {
        type: 'string',
        validate: val =>
          new Promise(resolve =>
            val === 'home'
              ? resolve(true)
              : fs.promises
                  .lstat(val)
                  .then(stats => resolve(stats.isDirectory()))
                  .catch(() => resolve(false))
          ),
      },
      theme: {
        type: ['theme1', 'theme2', 'theme3', 'theme4', 'theme5', 'theme6'],
        validate: val =>
          Array(6)
            .fill(1)
            .map((_, i) => `theme${i + 1}`)
            .includes(val),
      },
      language: {
        type: ['pl', 'en', 'fr'],
        validate: val => ['pl', 'en', 'fr'].includes(val),
      },
    }
  }

  checkDir() {
    const preferencesPath = path.join(homedir(), '.prodigy')
    if (!fs.existsSync(preferencesPath)) {
      fs.mkdirSync(preferencesPath)
    }
  }

  getPreferencesPath() {
    return process.env.LOCAL_PREFERENCES === 'true'
      ? path.join(__dirname, '..', 'preferences.json')
      : path.join(homedir(), '.prodigy', 'preferences.json')
  }

  toMessage() {
    const correctTypes = Object.keys(this.dataModel).map(
      key => `'${key}' is type of ${this.dataModel[key].type.toString()}`
    )
    return `Correct preferences are: ${correctTypes.join(', ')}`
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
      fs.promises
        .readFile(this.getPreferencesPath())
        .then(JSON.parse)
        .then(file => Promise.all([Promise.resolve(file), this.isValid(file)]))
        .then(([file, isValid]) =>
          isValid
            ? resolve(file)
            : reject(
                new APIError(
                  this.toMessage(),
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
    return fs.promises.writeFile(
      this.getPreferencesPath(),
      JSON.stringify(preferences)
    )
  }

  write(preferences) {
    return new Promise((resolve, reject) => {
      this.isValid(preferences)
        .then(isValid =>
          isValid
            ? Promise.resolve()
            : reject(
                new ClientError(
                  this.toMessage(),
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
