const {
  getServerURL,
  getParentLink,
  getSelfLink,
  getChildrenLinks,
} = require('./getDirs.links')

jest.mock('path', () => ({
  sep: '/',
}))

describe('getDirs.links test suite', () => {
  let req
  beforeEach(() => {
    req = {
      protocol: 'http',
      host: 'localhost:3000',
      get: function (property) {
        return this[property]
      },
    }
  })

  describe('getServerURL function', () => {
    it('returns server URI', () => {
      expect(getServerURL(req)).toEqual('http://localhost:3000')
    })
  })

  describe('getParenLinks', () => {
    it('returns link to parent dir', () => {
      const path = 'some/path/to/some/file'
      expect(getParentLink(req, path)).toEqual({
        parent: {
          method: 'GET',
          href: 'http://localhost:3000/api/dirs?path=some/path/to/some',
        },
      })
    })

    it('returns empty object if location is root', () => {
      const path = '/'
      expect(getParentLink(req, path)).toEqual({})
    })
  })

  describe('getSelfLink', () => {
    it('returns link to itself', () => {
      const originalUrl = '/api/dirs?path=some/path'
      req.originalUrl = originalUrl
      expect(getSelfLink(req)).toEqual({
        self: {
          method: 'GET',
          href: 'http://localhost:3000/api/dirs?path=some/path',
        },
      })
    })
  })

  describe('getChildrenLinks', () => {
    it('returns links for all childrens', () => {
      const children = ['some/path/children1', 'some/path/children2']
      expect(getChildrenLinks(req, children)).toEqual({
        children: [
          {
            method: 'GET',
            href: 'http://localhost:3000/api/dirs?path=some/path/children1',
          },
          {
            method: 'GET',
            href: 'http://localhost:3000/api/dirs?path=some/path/children2',
          },
        ],
      })
    })
  })
})
