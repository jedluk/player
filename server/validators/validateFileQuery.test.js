const validateQuery = require('./validateFileQuery')
const { promises } = require('fs')
const { ClientError } = require('../lib/error')
const ERROR_CODES = require('../errorCodes')

const [
  validatePathQuery,
  validateFileType,
  validateFileAvailability,
] = validateQuery

jest.mock('fs/promises')

describe('directory endpoint validation test suite', () => {
  let req, res
  const next = jest.fn()

  beforeEach(() => {
    next.mockReset()
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
        validatePathQuery(req, res, next)
      } catch (err) {
        expect(err instanceof ClientError).toEqual(true)
        expect(err.code).toEqual(ERROR_CODES.directories.pathNotDefined)
      }
    })

    it('invokes next middleware in opposite case', () => {
      req.query.path = 'some path'

      validatePathQuery(req, res, next)
      expect(next).toHaveBeenCalledTimes(1)
    })
  })

  describe('validateFileType', () => {
    it('throws ClientError with proper error code if "path" query string is undefined', async () => {
      req.query.path = 'path/to/file.mp4'

      expect.assertions(2)
      try {
        validateFileType(req, res, next)
      } catch (err) {
        expect(err instanceof ClientError).toEqual(true)
        expect(err.code).toEqual(ERROR_CODES.files.notSupportedType)
      }
    })

    it('invokes next middleware in opposite case', () => {
      req.query.path = '/path/to/file.mp3'

      validateFileType(req, res, next)
      expect(next).toHaveBeenCalledTimes(1)
    })
  })

  describe('validateFileAvailability', () => {
    it('throws ClientError if file does not exist', async () => {
      req.query.path = 'fake file'
      promises.access = jest.fn().mockRejectedValueOnce('not a file')

      expect.assertions(2)
      await validateFileAvailability(req, res, next).catch(err => {
        expect(err instanceof ClientError).toEqual(true)
        expect(err.code).toEqual(ERROR_CODES.files.notExists)
      })
    })

    it('invokes next middleware in opposite case', async () => {
      req.query.path = 'real file'
      promises.access = jest.fn().mockResolvedValueOnce('OK')

      await validateFileAvailability(req, res, next)
      expect(next).toHaveBeenCalledTimes(1)
    })
  })
})
