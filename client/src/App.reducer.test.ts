import { rootReducer, Action } from './App.reducer'

describe('rootReducer test suite', () => {
  describe('SETTLE_FILES action', () => {
    let reducer: any, payload: any

    beforeEach(() => {
      reducer = {
        dirs: {
          dir1: 'full/path/dir1',
          dir2: 'full/path/dir2',
        },
        tracks: {
          song1: {
            title: 'song1',
          },
          song2: {
            title: 'song2',
          },
        },
        links: {
          parent: null,
          children: null,
          self: null,
        },
        filters: { one: ['one', 'two'] },
      }
      payload = {
        content: {
          dirs: {
            newDir: 'path/to/newDir',
          },
          files: {
            newTrack: {
              title: 'newTrack',
            },
          },
        },
        _links: {
          self: 'link',
          children: [],
          parent: 'link',
        },
      }
    })

    it('resets current filtering state', () => {
      const action: Action = {
        type: 'SETTLE_FILES',
        payload,
      }
      expect(rootReducer(reducer, action)).toEqual(
        expect.objectContaining({ filters: {} })
      )
    })

    it('settle files from API', () => {
      const action: Action = {
        type: 'SETTLE_FILES',
        payload,
      }
      const newState = rootReducer(reducer, action)
      expect(newState.dirs).toEqual(payload.content.dirs)
      expect(newState.tracks).toEqual(payload.content.files)
      expect(newState.links).toEqual(payload._links)
    })

    it('uses fallback null value for undefined parent link', () => {
      delete payload._links.parent
      const action: Action = {
        type: 'SETTLE_FILES',
        payload,
      }
      const newState = rootReducer(reducer, action)
      expect(newState.links.parent).toEqual(null)
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
