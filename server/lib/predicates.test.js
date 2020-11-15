const { byMP3, byMPEG, byDirectory, byGivenTypes } = require('./predicates')

describe('predicates test suite', () => {
  describe('byMP3', () => {
    it('used with filter returns files with mp3 extension', () => {
      const mp3File = 'some file.mp3'
      const textFile = 'some text.txt'
      expect([mp3File, textFile].filter(byMP3)).toEqual([mp3File])
    })
  })

  describe('byMPEG', () => {
    it('used with filter returns file with mpeg or mpg extension', () => {
      const mpgFiles = ['some file.mpg', 'some file.mpeg']
      const textFile = 'some file.txt'
      expect([...mpgFiles, textFile].filter(byMPEG)).toEqual(mpgFiles)
    })
  })

  describe('byDirectory', () => {
    it('returns directories only', () => {
      const files = [
        { isDirectory: () => true },
        { isDirectory: () => false },
        { isDirectory: () => false },
      ]
      expect(files.filter(byDirectory)).toEqual(files.slice(0, 1))
    })
  })

  describe('byGivenTypes', () => {
    it('returns files which match given types', () => {
      const types = ['mp3']
      const files = [
        'file.txt',
        'file2.yml',
        'file3.ogg',
        'file4.cpp',
        'track.mp3',
      ]

      expect(files.filter(byGivenTypes(types))).toEqual(['track.mp3'])
    })
  })
})
