import { PREFERENCES } from './preferences'
import { fetch } from '../utils/globals'

jest.mock('../utils/globals')
jest.mock('./config', () => ({
  API_URL: 'http://test-api.com',
}))

describe('PREFERENCES test suite', () => {
  let fetchMock = fetch as jest.Mock

  beforeEach(() => {
    fetchMock.mockReset()
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    })
  })

  describe('GET', () => {
    const { GET } = PREFERENCES

    it('calls server with GET method', async () => {
      await GET()
      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(fetchMock).toHaveBeenCalledWith('http://test-api.com/preferences')
    })

    it('resolve promise with request response', async () => {
      const mockResponse = { theme: 'theme2' }

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
      const res = await GET()
      expect(res).toEqual(mockResponse)
    })

    it('rejects a promise if sth goes wrong', async () => {
      fetchMock.mockRejectedValueOnce(new Error('network error'))

      expect.assertions(1)
      await GET().catch(err => expect(err).toBeDefined())
    })
  })

  describe('PATCH', () => {
    const { PATCH } = PREFERENCES
    let payload: any

    beforeEach(() => {
      payload = { theme: 'theme1' }
    })

    it('calls server with PATCH method', async () => {
      await PATCH(payload)

      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(fetchMock.mock.calls[0][1].method).toEqual('PATCH')
    })

    it('sends correct request payload ', async () => {
      await PATCH(payload)

      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(payload))
    })

    it('resolves promise with request response', async () => {
      const mockResponse = { theme: 'theme2' }

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
      const res = await PATCH(payload)
      expect(res).toEqual(mockResponse)
    })

    it('resolves promise with empty object in case of error', async () => {
      fetchMock.mockRejectedValueOnce(new Error('error'))

      const res = await PATCH(payload)
      expect(res).toEqual({})
    })
  })

  describe('POST', () => {
    const { POST } = PREFERENCES
    let payload: any

    beforeEach(() => {
      payload = { theme: 'theme1' }
    })

    it('calls server with POST method', async () => {
      await POST(payload)

      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(fetchMock.mock.calls[0][1].method).toEqual('POST')
    })

    it('sends correct request payload ', async () => {
      await POST(payload)

      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(payload))
    })

    it('resolves promise with request response', async () => {
      const mockResponse = { theme: 'theme2' }

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
      const res = await POST(payload)
      expect(res).toEqual(mockResponse)
    })

    it('resolves promise with empty object in case of error', async () => {
      fetchMock.mockRejectedValueOnce(new Error('error'))

      const res = await POST(payload)
      expect(res).toEqual({})
    })
  })
})
