const getPreferences = require('./getPreferences')
const preferences = require('../lib/preferences')
const { APIError } = require('../lib/error')

jest.mock('../lib/preferences')

describe('getPreferences', () => {
  let req, res, nextMock

  beforeEach(() => {
    nextMock = jest.fn()
    req = {
      query: {},
    }
    res = {
      status: function () {
        return this
      },
    }
  })

  it('should invoke res.json if file is read correctly', async () => {
    const preferences = { some: 'preferences' }
    preferences.read = jest.fn().mockResolvedValueOnce(preferences)

    const jsonMock = jest.fn()
    res.json = jsonMock

    await getPreferences(req, res, nextMock)
    expect(jsonMock).toHaveBeenCalledWith(1)
  })

  it('should forward API error via next if cannot read preferences', async () => {
    const error = new APIError()
    preferences.read = jest.fn().mockRejectedValueOnce(error)

    await getPreferences(req, res, nextMock)
    expect(nextMock).toHaveBeenCalledWith(error)
  })
})
