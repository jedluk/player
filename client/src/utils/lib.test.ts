import {
  formatDuration,
  joinClasses,
  isNil,
  isNull,
  formatTime,
  unique,
  defaultsTo,
} from './lib'

describe('lib test suite', () => {
  describe('isNull function', () => {
    it('returns true if item is null', () => {
      expect(isNull(null)).toEqual(true)
    })

    it('returns false otherwise', () => {
      expect(isNull('sth')).toEqual(false)
    })
  })

  describe('inNil function', () => {
    it('returns true for undefined', () => {
      expect(isNil(undefined)).toEqual(true)
    })

    it('returns true for null', () => {
      expect(isNil(null)).toEqual(true)
    })

    it('returns false otherwise', () => {
      expect(isNil('sth')).toEqual(false)
    })
  })

  describe('formatDuration function', () => {
    it('return seconds in mm:ss format', () => {
      expect(formatDuration(84)).toEqual('1:24')
    })

    it('adds 0 to single digit numbers', () => {
      expect(formatDuration(8)).toEqual('0:08')
    })
  })

  describe('joinClasses function', () => {
    it('returns classes in format "class1 class2 (...)"', () => {
      expect(joinClasses('button', 'button-red')).toEqual('button button-red')
    })

    it('combines only string values', () => {
      expect(joinClasses('button', null, undefined, 'button-red')).toEqual(
        'button button-red'
      )
    })
  })

  describe('formatTime function', () => {
    it('returns time in MM.DD.YYYY format', () => {
      const date = '2020-10-11'
      expect(formatTime(date as any)).toEqual('10.11.2020')
    })

    it('adds 0 to single digit', () => {
      const date = '2020-8-7'
      expect(formatTime(date as any)).toEqual('08.07.2020')
    })
  })

  describe('unique function', () => {
    it('returns unique values from collection', () => {
      expect(unique([1, 2, 2, 3, 3, 3, 1, 2, 3])).toEqual([1, 2, 3])
    })
  })

  describe('defaultsTo function', () => {
    it("forwards value if it's neither null or undefined", () => {
      expect(defaultsTo('some', 'fallback')).toEqual('some')
    })

    it('uses fallback value if first argument is null', () => {
      expect(defaultsTo(null, 'fallback')).toEqual('fallback')
    })

    it('uses fallback value if first argument is undefined', () => {
      expect(defaultsTo(undefined, 'fallback')).toEqual('fallback')
    })
  })
})
