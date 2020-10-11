import {
  serializeTracks,
  matchTitle,
  findNextTrack,
  hasParent,
  previousDir,
  generateModifiers,
} from './tracks'

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

  describe('findNextTrack function', () => {
    it('return null if current track is empty', () => {
      expect(findNextTrack('', [])).toEqual(null)
    })

    it('returns null if track is last on the list', () => {
      const url = 'someDir/someTrack'
      expect(findNextTrack(url, [{ url }] as any)).toEqual(null)
    })

    it('returns next track url otherwise', () => {
      const url = 'someDir/someTrack'
      const nextUrl = 'someDir/nextTrack'
      expect(findNextTrack(url, [{ url }, { url: nextUrl }] as any)).toEqual(
        nextUrl
      )
    })
  })

  describe('generateModifiers', () => {
    const tracks = [
      {
        artist: 'artist1',
        album: 'album1',
        year: '2001',
      },
      {
        artist: 'artist1',
        album: 'album2',
        year: '2010',
      },
      {
        artist: 'artist2',
        album: 'album3',
        year: '2010',
      },
      {
        artist: 'artist3',
        album: 'album3',
        year: '2020',
      },
    ] as any

    it('returns modifiers array with object containing unique artists', () => {
      expect(generateModifiers(tracks)).toContainEqual(
        expect.objectContaining({
          property: 'artist',
          values: ['artist1', 'artist2', 'artist3'],
        })
      )
    })

    it('returns modifiers array with object containing unique albums', () => {
      expect(generateModifiers(tracks)).toContainEqual(
        expect.objectContaining({
          property: 'album',
          values: ['album1', 'album2', 'album3'],
        })
      )
    })
    it('returns modifiers array with object containing unique years', () => {
      expect(generateModifiers(tracks)).toContainEqual(
        expect.objectContaining({
          property: 'year',
          values: ['2001', '2010', '2020'],
        })
      )
    })
  })
})
