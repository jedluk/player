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

  it('calls server with fallback query params if they are not spcified', async () => {
    await getAssets()
    expect(fetchMock).toHaveBeenCalledWith(
      'http://test.com/dirs?path=home&fileTypes=mp3'
    )
  })

  it('calls server with query parameter "path" if it is specifed', async () => {
    const path = 'myDir'
    await getAssets(path)
    expect(fetchMock).toHaveBeenCalledWith(
      `http://test.com/dirs?path=${path}&fileTypes=mp3`
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
