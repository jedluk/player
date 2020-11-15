const {
  combineFilePathWitTags,
  nameToDetails,
  nameToPath,
} = require('./getDirs.utils')

describe('getDirs utils test suite', () => {
  describe('combineFilePathWitTags function', () => {
    it('combine full file path with tags', () => {
      const files = ['path/to/file1', 'path/to/file2']
      const tags = [
        {
          album: 'album1',
          artist: 'artist1',
          genre: 'rock',
          title: 'song1',
          year: '2018',
        },
        {
          album: 'album2',
          artist: 'artist2',
          genre: 'jazz',
          title: 'song2',
          year: '2020',
        },
      ]
      expect(combineFilePathWitTags(files, tags)).toEqual([
        {
          ...tags[0],
          fullPath: files[0],
        },
        {
          ...tags[1],
          fullPath: files[1],
        },
      ])
    })
    it('fullfills expected tags with empty strings if not available', () => {
      const files = ['/path/to/file1']
      expect(combineFilePathWitTags(files, [{}])).toEqual([
        {
          album: '',
          artist: '',
          genre: '',
          title: '',
          year: '',
          fullPath: files[0],
        },
      ])
    })
  })

  describe('nameToDetails function', () => {
    let data
    beforeEach(() => {
      data = {
        title: 'some title',
        year: '2008',
        genre: 'rock',
      }
    })
    it('it adds new property to object in `name: fullPath` manner', () => {
      expect(nameToDetails({}, data)).toEqual({
        'some title': data,
      })
    })
    it('do not modify existing inpus', () => {
      const input = { title2: { ...data } }
      expect(nameToDetails(input, data)).toEqual(
        expect.objectContaining({
          title2: data,
        })
      )
    })
  })

  describe('nameToPath function', () => {
    let path
    beforeEach(() => (path = 'path/to/file2'))
    it('it adds new property to object in `name: fullPath` manner', () => {
      expect(nameToPath({}, path)).toEqual({
        file2: path,
      })
    })

    it('do not modify existing inputs', () => {
      const input = {
        key1: 'path/to/key1',
      }
      expect(nameToPath(input, path)).toEqual(
        expect.objectContaining({
          key1: 'path/to/key1',
        })
      )
    })
  })
})
