const validateQuery = require('./validateDirQuery')

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

  it('sends 400 with error msg if "path" query string is undefined', () => {
    const sendMock = jest.fn()
    res.send = sendMock
    validateQuery(req, res)
    expect(sendMock.mock.calls.length).toEqual(1)
  })
})
