const { APIError, ClientError } = require('./error')

describe('error test suite', () => {
  describe('API Error', () => {
    it('keeps status as an object property', () => {
      const status = 404
      const error = new APIError('', '', status)
      expect(error.status).toEqual(status)
    })
    it('serializes error to known form', () => {
      const message = 'some message'
      const code = 'some code'

      const error = new APIError(message, code, 400)
      expect(error.serialize()).toEqual({
        code,
        message,
      })
    })
  })

  describe('ClientError', () => {
    it('uses status 400', () => {
      const error = new ClientError('some error', 'some code')
      expect(error.status).toEqual(400)
    })
  })
})
