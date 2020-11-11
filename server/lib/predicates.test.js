const { byMP3, byMPEG } = require('./predicates')

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
})
