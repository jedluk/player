const validateQuery = require('./validateDirQuery')
const ERROR_CODES = require('../errorCodes')

describe('validateQuery middleware test suite', () => {
  let req, res
  beforeEach(() => {
    req = {
      query: {
        path: undefined,
      },
    }
    res = {
      status() {
        return this
      },
      send: jest.fn(),
    }
  })

  it('sends 400 with proper error msg if "path" query string is undefined', async () => {
    const sendMock = jest.fn()
    res.send = sendMock
    await validateQuery(req, res)
    expect(sendMock).toBeCalledWith(
      expect.objectContaining({
        code: ERROR_CODES.directories.pathNotDefined,
      })
    )
  })

  it('sends 400 with proper error msg if "fileTypes" query string is not matching allowed types', async () => {
    const sendMock = jest.fn()
    req.query.path = 'some/path'
    req.query.fileTypes = 'txt'
    res.send = sendMock
    await validateQuery(req, res)
    expect(sendMock.mock.calls[0][0]).toEqual({
      msg: 'fileTypes query param must match one of types: mp3',
    })
  })

  it('allows to use "home" as query string', async () => {
    req.query.path = 'home'
    const nextMock = jest.fn()
    await validateQuery(req, res, nextMock)
    expect(nextMock.mock.calls.length).toEqual(1)
  })

  it('allows to use "HOME" as query string', async () => {
    req.query.path = 'home'
    const nextMock = jest.fn()
    await validateQuery(req, res, nextMock)
    expect(nextMock.mock.calls.length).toEqual(1)
  })
})
