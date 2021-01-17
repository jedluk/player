const getPreferences = require('./getPreferences')
const preferences = require('../lib/preferences')
const { APIError } = require('../lib/error')

jest.mock('../lib/preferences')

describe('getPreferences', () => {
  let req, res

  beforeEach(() => {
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

    await getPreferences(req, res)
    expect(jsonMock).toHaveBeenCalledTimes(1)
  })

  it('should forward API error if cannot read preferences', async () => {
    preferences.read = jest.fn().mockRejectedValueOnce(new APIError())

    expect.assertions(1)
    await getPreferences(req, res).catch(err =>
      expect(err instanceof APIError).toEqual(true)
    )
  })
})
