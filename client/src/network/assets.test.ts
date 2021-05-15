import { ASSETS } from './assets'
import { fetch, encodeURIComponent } from '../utils/globals'

jest.mock('../utils/globals')
jest.mock('./config', () => ({
  API_URL: 'http://test-api.com',
  ERROR_CODES: {
    REQUEST_FAILED: 'request-failed',
  },
}))

describe('ASSETS test suite', () => {
  let fetchMock = fetch as jest.Mock
  let encodeURIComponentMock = encodeURIComponent as jest.Mock

  beforeAll(() => {
    encodeURIComponentMock.mockImplementation(text => text)
  })

  beforeEach(() => {
    fetchMock.mockClear()
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    })
  })

  describe('GET', () => {
    const { GET } = ASSETS

    it('calls server once', async () => {
      await GET()
      expect(fetchMock).toHaveBeenCalledTimes(1)
    })

    it('calls server with fallback query params if they are not spcified', async () => {
      await GET()
      expect(fetchMock).toHaveBeenCalledWith(
        'http://test-api.com/dirs?path=home&fileTypes=mp3'
      )
    })

    it('calls server with query parameter "path" if it is specifed', async () => {
      const path = 'myDir'
      await GET(path)
      expect(fetchMock).toHaveBeenCalledWith(
        `http://test-api.com/dirs?path=${path}&fileTypes=mp3`
      )
    })

    it('resolves promise with request response', async () => {
      const mockResponse = { dirs: [], tracks: [] }
      fetchMock.mockReset()
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
      expect.assertions(1)
      await expect(GET()).resolves.toEqual(mockResponse)
    })

    it('rejects with known error code once server throws', async () => {
      fetchMock.mockReset()
      fetchMock.mockRejectedValueOnce(new Error('Network error'))
      expect.assertions(1)
      await GET().catch(err => {
        expect(err.code).toEqual('request-failed')
      })
    })
  })
})
