const {
  pick,
  isNil,
  defaultsTo,
  isNull,
  isUndefined,
  getTrackTags,
} = require('./utils')
const ID3 = require('node-id3')

jest.mock('node-id3')

describe('utils test suite', () => {
  describe('pick function', () => {
    let obj
    beforeEach(() => {
      obj = {
        a: 2,
        b: 'some field',
        c: true,
      }
    })
    it('return new object with selected keys', () => {
      expect(pick(obj, ['a', 'c'])).toEqual({ a: obj.a, c: obj.c })
    })

    it('return original object if keys are undefined', () => {
      expect(pick(obj)).toEqual(obj)
    })

    it('return original object if keys are empty array', () => {
      expect(pick(obj, [])).toEqual(obj)
    })
  })

  describe('isNil function', () => {
    it('returns true if argument is undefined', () => {
      expect(isNil(undefined)).toEqual(true)
    })

    it('returns true if argument is null', () => {
      expect(isNil(null)).toEqual(true)
    })

    it('returns false otherwise', () => {
      expect(isNil('sth')).toEqual(false)
    })
  })

  describe('isNull function', () => {
    it('returns true if argument is null', () => {
      expect(isNull(null)).toEqual(true)
    })

    it('returns false otherwise', () => {
      expect(isNil('not null')).toEqual(false)
    })
  })

  describe('isUndefined function', () => {
    it('returns true if argument is null', () => {
      expect(isUndefined(undefined)).toEqual(true)
    })

    it('returns false otherwise', () => {
      expect(isUndefined('not undefined')).toEqual(false)
    })
  })

  describe('defaultsTo', () => {
    it('returns fallback value if first argument is undefined', () => {
      const fallback = 1
      expect(defaultsTo(undefined, fallback)).toEqual(fallback)
    })

    it('returns fallback value if first argument is null', () => {
      const fallback = 1
      expect(defaultsTo(null, fallback)).toEqual(fallback)
    })
    it('returns first agument otherwise', () => {
      const item = 'not nil!'
      const fallback = 1
      expect(defaultsTo(item, fallback)).toEqual(item)
    })
  })

  describe('getTrackTags', () => {
    it('returns tags if there is no error', async () => {
      const tags = { tag1: '1', tag2: '2' }
      ID3.read.mockImplementation((track, callback) =>
        Promise.resolve(callback(null, tags))
      )
      const result = await getTrackTags('some track')
      expect(result).toEqual(tags)
    })
    it('return empty object if ID3 read returns error', async () => {
      ID3.read.mockImplementation((track, callback) =>
        Promise.resolve(callback(new Error()))
      )
      const result = await getTrackTags('some track')
      expect(result).toEqual({})
    })
  })
})
