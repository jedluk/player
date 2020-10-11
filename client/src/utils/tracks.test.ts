import { serializeTracks, matchTitle, hasParent, previousDir } from './tracks'

jest.mock('./config', () => ({
  FILE_SEPARATOR: '/',
}))

describe('track utils test suite', () => {
  describe('serializeTracks', () => {
    it('return serialized version of tracks', () => {
      const tracks = [{ title: 'song1' }, { title: 'song2' }]
      expect(serializeTracks(tracks as any)).toEqual('song1,song2')
    })
  })

  describe('matchTitle', () => {
    const tracks = [
      { title: 'Easy Muffin' },
      { title: 'Nameless' },
      { title: 'Destinations' },
    ] as any

    it('returns predicate which passess everything when searchPhase in empty', () => {
      expect(tracks.filter(matchTitle(''))).toEqual(tracks)
    })

    it('returns predicate which passess matched songs otherwise', () => {
      expect(tracks.filter(matchTitle('easy'))).toEqual(tracks.slice(0, 1))
    })
  })

  describe('hasParent function', () => {
    it('returns false if there is no parent in URI path', () => {
      expect(hasParent({ url: '/someDir' } as any)).toEqual(false)
    })

    it('returns true if there is a parent in URI path', () => {
      expect(hasParent({ url: 'root/someDir' } as any)).toEqual(false)
    })
  })

  describe('previousDir function', () => {
    it('returns undefined if item has no parent', () => {
      expect(previousDir({ url: 'dir/item' } as any)).toEqual(undefined)
    })

    it('returns parent URI otherwise', () => {
      expect(previousDir({ url: 'root/dir/item' } as any)).toEqual('root')
    })
  })
})
