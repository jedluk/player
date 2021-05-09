import { streamURL, stripPath, handleHTTPResponse } from './http'

jest.mock('./config', () => ({
  API_URL: 'http://test.com',
  ERROR_CODES: {
    REQUEST_FAILED: 'request-failed',
  },
}))

describe('http test suite', () => {
  describe('handleHTTPResponse', () => {
    let resp: Response

    beforeEach(() => {
      resp = {
        ok: true,
        json: () => Promise.resolve({ items: [] }),
      } as Response
    })

    it('throws error if response is not ok', async () => {
      resp = { ...resp, ok: false }

      expect.assertions(1)
      await handleHTTPResponse(resp).catch(err => expect(err).toBeDefined())
    })

    it('returns response body otherwise', async () => {
      const res = await handleHTTPResponse(resp)
      expect(res).toEqual({ items: [] })
    })
  })
  describe('streamURL', () => {
    it('returns correctly encoded URL for streaming file', () => {
      const path = 'some/path/to/file/1'
      expect(streamURL(path)).toEqual(
        'http://test.com/stream/file?path=some%2Fpath%2Fto%2Ffile%2F1'
      )
    })
  })

  describe('stripPath', () => {
    it('returns value of path query string from full URL', () => {
      expect(stripPath('http://someserver.com?path=myPath/toFile')).toEqual(
        'myPath/toFile'
      )
    })
  })
})
