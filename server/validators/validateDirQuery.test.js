const validateQuery = require('./validateDirQuery')
const { ClientError } = require('../lib/error')
const ERROR_CODES = require('../errorCodes')
const { promises } = require('fs')

const [validatePathQuery, validateFileType, validateDirectory] = validateQuery

jest.mock('fs/promises')

describe('directory endpoint validation test suite', () => {
  let req, res
  beforeEach(() => {
    req = {
      query: {},
    }
    res = {
      status() {
        return this
      },
      send: jest.fn(),
    }
  })

  describe('validatePathQuery', () => {
    it('throws ClientError with proper error code if "path" query string is undefined', async () => {
      req.query.path = undefined

      expect.assertions(2)
      try {
        validatePathQuery(req, res)
      } catch (err) {
        expect(err instanceof ClientError).toEqual(true)
        expect(err.code).toEqual(ERROR_CODES.directories.pathNotDefined)
      }
    })

    it('invokes next middleware in opposite case', () => {
      req.query.path = 'some path'
      const next = jest.fn()

      validatePathQuery(req, res, next)
      expect(next).toHaveBeenCalledTimes(1)
    })
  })

  describe('validateFileType', () => {
    it('throws ClientError with proper error code if "path" query string is undefined', async () => {
      req.query.fileTypes = 'mp4'

      expect.assertions(2)
      try {
        validateFileType(req, res)
      } catch (err) {
        expect(err instanceof ClientError).toEqual(true)
        expect(err.code).toEqual(ERROR_CODES.directories.notSupportedType)
      }
    })

    it('invokes next middleware in opposite case', () => {
      req.query.fileTypes = 'mp3'
      const next = jest.fn()

      validateFileType(req, res, next)
      expect(next).toHaveBeenCalledTimes(1)
    })
  })

  describe('validateDirectory', () => {
    it('invokes next middleware if path is equal to "home"', async () => {
      req.query.path = 'home'
      const nextMock = jest.fn()

      await validateDirectory(req, res, nextMock)
      expect(nextMock).toHaveBeenCalledTimes(1)
    })
  })

  it('throws ClientError if directory does not exist', async () => {
    req.query.path = 'fake dir'
    promises.lstat = jest
      .fn()
      .mockResolvedValueOnce({ isDirectory: () => false })

    expect.assertions(2)
    const next = jest.fn()

    await validateDirectory(req, res, next).catch(err => {
      expect(err instanceof ClientError).toEqual(true)
      expect(err.code).toEqual(ERROR_CODES.directories.notExist)
    })
  })

  it('calls next middleware if directory exist', async () => {
    req.query.path = 'real dir'
    promises.lstat = jest
      .fn()
      .mockResolvedValueOnce({ isDirectory: () => true })

    const next = jest.fn()
    await validateDirectory(req, res, next)
    expect(next).toHaveBeenCalledTimes(1)
  })
})
