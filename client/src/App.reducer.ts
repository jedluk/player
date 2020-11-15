import { API, Filter, Maybe } from './types'

export type ChangeFilterPayload = {
  property: 'artist' | 'album' | 'year'
  value: Maybe<string[]>
}

export type Links = {
  children: Maybe<API.Link[]>
  parent: Maybe<API.Link>
  self: Maybe<API.Link>
}

export interface State {
  dirs: API.Directory
  links: Links
  tracks: API.Track
  filters: Filter
}

export type Action =
  | { type: 'SETTLE_FILES'; payload: API.Assets }
  | { type: 'CHANGE_FILTER'; payload: ChangeFilterPayload }

export function rootReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SETTLE_FILES':
      const {
        content: { dirs, files: tracks = {} },
        _links: { children, parent = null, self },
      } = action.payload
      return {
        dirs,
        tracks,
        links: {
          children,
          parent,
          self,
        },
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
