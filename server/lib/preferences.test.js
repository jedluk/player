const preferences = require('./preferences')
const { promises } = require('fs')

jest.mock('fs/promises')

describe('Preferences', () => {
  describe('isValid method', () => {
    it('returns false if arg is primitive', async () => {
      expect(await preferences.isValid('something')).toEqual(false)
      expect(await preferences.isValid(2)).toEqual(false)
      expect(await preferences.isValid(true)).toEqual(false)
    })

    it('returns false if object does not contain all required properties', async () => {
      const pref = {
        language: 'pl',
      }
      expect(await preferences.isValid(pref)).toEqual(false)
    })

    it('returns true if given object match model', async () => {
      const pref = {
        language: 'pl',
        theme: 'theme1',
        directory: __dirname,
      }
      expect(await preferences.isValid(pref)).toEqual(true)
    })
  })

  describe('read method', () => {
    let preferencesObject

    beforeEach(() => {
      preferencesObject = {
        language: 'pl',
        theme: 'theme1',
        directory: '/Users/jedrzej/Desktop/muse',
      }
      promises.lstat = jest
        .fn()
        .mockResolvedValueOnce({ isDirectory: () => true })
    })

    it('resolves a promise with null when file does not exist', async () => {
      promises.readFile = jest.fn().mockRejectedValueOnce('Not exists!')

      const res = await preferences.read()
      expect(res).toEqual(null)
    })

    it('resolves a promise with null when file is not valid preferences object', async () => {
      delete preferencesObject.theme
      promises.readFile = jest
        .fn()
        .mockResolvedValueOnce(JSON.stringify(preferencesObject))

      const res = await preferences.read()
      expect(res).toEqual(null)
    })

    it('resolves promise with preferences object if valid preference object exists', async () => {
      promises.readFile = jest
        .fn()
        .mockResolvedValueOnce(JSON.stringify(preferencesObject))

      const res = await preferences.read()
      expect(res).toEqual(preferencesObject)
    })
  })

  describe('write method', () => {
    let preferencesObject

    beforeEach(() => {
      preferencesObject = {
        language: 'pl',
        theme: 'theme1',
        directory: '/Users/jedrzej/Desktop/muse',
      }
      promises.lstat = jest
        .fn()
        .mockResolvedValueOnce({ isDirectory: () => true })
    })

    it('rejects a promise when preferences are not a valid object', async () => {
      delete preferencesObject.theme
      promises.writeFile = jest.fn()
      expect.assertions(1)
      await preferences
        .write(preferencesObject)
        .catch(err => expect(err.msg).toBeDefined())
    })

    it('rejects a promise when writeFile throws', async () => {
      promises.writeFile = jest.fn().mockRejectedValueOnce('error')

      expect.assertions(1)
      await preferences
        .write(preferencesObject)
        .catch(err => expect(err.msg).toBeDefined())
    })

    it('resolves promise when file is saved', async () => {
      promises.writeFile = jest.fn().mockResolvedValueOnce('ok')

      const res = await preferences.write(preferencesObject)
      expect(res.msg).toBeDefined()
    })
  })
})
