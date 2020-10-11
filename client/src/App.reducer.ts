import { API, Filter, Maybe } from './types'

export type ChangeFilterPayload = {
  property: 'artist' | 'album' | 'year'
  value: Maybe<string[]>
}

export interface State {
  dirs: API.Directory[]
  tracks: API.Track[]
  filters: Filter
}

export type Action =
  | { type: 'SETTLE_FILES'; payload: API.Assets }
  | { type: 'CHANGE_FILTER'; payload: ChangeFilterPayload }

export function rootReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SETTLE_FILES':
      const { dirs, tracks } = action.payload
      return {
        dirs,
        tracks,
        filters: {},
      }
    case 'CHANGE_FILTER':
      const { value, property } = action.payload
      const newFilters = { ...state.filters }
      if (value === null || value.length === 0) {
        delete newFilters[property]
      } else {
        newFilters[property] = value
      }
      return { ...state, filters: newFilters }
    default:
      return state
  }
}
