import { getAssets } from './http'
import { fetch, encodeURIComponent } from './globals'

jest.mock('./globals')
jest.mock('./config', () => ({
  API_URL: 'http://test.com',
  ERROR_CODES: {
    REQUEST_FAILED: 'request-failed',
  },
}))

describe('http test suite', () => {
  let fetchMock = fetch as jest.Mock
  let encodeURIComponentMock = encodeURIComponent as jest.Mock

  beforeAll(() => {
    encodeURIComponentMock.mockImplementation(text => text)
  })

  beforeEach(() => {
    fetchMock.mockClear()
    fetchMock.mockResolvedValueOnce({
      json: () => Promise.resolve({}),
    })
  })

  it('calls server once', async () => {
    await getAssets()
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('calls server with no query if it is not specified', async () => {
    await getAssets()
    expect(fetchMock).toHaveBeenCalledWith('http://test.com/assets')
  })

  it('calls server with query parameter "path" if it is specifed', async () => {
    const path = 'myDir'
    await getAssets(path)
    expect(fetchMock).toHaveBeenCalledWith(
      `http://test.com/assets?path=${path}`
    )
  })

  it('resolve promise with server correct response', async () => {
    const mockResponse = { dirs: [], tracks: [] }
    fetchMock.mockReset()
    fetchMock.mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    })
    expect.assertions(1)
    await expect(getAssets()).resolves.toEqual(mockResponse)
  })

  it('rejects with known error code once server throws', async () => {
    fetchMock.mockReset()
    fetchMock.mockRejectedValueOnce(new Error('Network error'))
    expect.assertions(1)
    await getAssets().catch(err => {
      expect(err.code).toEqual('request-failed')
    })
  })
})
