import { rootReducer, Action } from './App.reducer'

describe('rootReducer test suite', () => {
  describe('SETTLE_FILES action', () => {
    const reducer = {
      dirs: ['one', 'two'],
      tracks: ['one', 'two'],
      filters: { one: ['one', 'two'] },
    } as any

    const payload = {
      dirs: ['newDir'],
      tracks: ['new songs'],
    } as any
    it('resets current filtering state', () => {
      const action: Action = {
        type: 'SETTLE_FILES',
        payload,
      }
      expect(rootReducer(reducer, action as any)).toEqual(
        expect.objectContaining({ filters: {} })
      )
    })
    it('settle files from API', () => {
      const action: Action = {
        type: 'SETTLE_FILES',
        payload,
      }
      const newState = rootReducer(reducer, action as any)
      expect(newState.dirs).toEqual(payload.dirs)
      expect(newState.tracks).toEqual(payload.tracks)
    })
  })
  describe('CHANGE_FILTER action', () => {
    let reducer: any

    beforeEach(() => {
      reducer = {
        dirs: ['dir1', 'dir2'],
        tracks: ['track1', 'track2'],
        filters: {},
      }
    })

    it('leaves dirs and tracks untouched', () => {
      const action: Action = {
        type: 'CHANGE_FILTER',
        payload: {
          property: 'album',
          value: [],
        },
      }
      const newState = rootReducer(reducer, action)
      expect(newState.dirs).toEqual(['dir1', 'dir2'])
      expect(newState.tracks).toEqual(['track1', 'track2'])
    })

    it('resets filter for given property when value is empty array', () => {
      const action: Action = {
        type: 'CHANGE_FILTER',
        payload: {
          property: 'album',
          value: [],
        },
      }
      const initialFilters = { album: ['one', 'two'], year: ['2001'] }
      reducer.filters = { ...initialFilters }
      const newState = rootReducer(reducer, action)
      expect(newState.filters).not.toContain({ album: initialFilters.album })
    })

    it('resets filter for given property when value is null', () => {
      const action: Action = {
        type: 'CHANGE_FILTER',
        payload: {
          property: 'album',
          value: null,
        },
      }
      const initialFilters = { album: ['one', 'two'], year: ['2001'] }
      reducer.filters = { ...initialFilters }
      const newState = rootReducer(reducer, action)
      expect(newState.filters).not.toContain({ album: initialFilters.album })
    })

    it('adds new filters to state', () => {
      const action: Action = {
        type: 'CHANGE_FILTER',
        payload: {
          property: 'album',
          value: ['album1', 'album2'],
        },
      }
      const newState = rootReducer(reducer, action)
      expect(newState.filters).toEqual({
        album: action.payload.value,
      })
    })

    it('leaves other filters untouched', () => {
      reducer.filters = {
        year: ['2001'],
      }
      const action: Action = {
        type: 'CHANGE_FILTER',
        payload: {
          property: 'album',
          value: ['album1', 'album2'],
        },
      }
      const newState = rootReducer(reducer, action)
      expect(newState.filters.year).toEqual(['2001'])
    })
  })
})
