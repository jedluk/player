import { SupportedLocale } from './translations'

export type Maybe<T> = T | null

export type Modifier = {
  name: string
  property: 'artist' | 'album' | 'year'
  values: string[]
}

export type Filter = Record<Modifier[property], string[]>

export namespace API {
  type Assets = {
    content: {
      dirs: Directory
      files?: Track
    }
    _links: {
      self: Link
      parent?: Link
      children: Link[]
    }
  }

  type Preferences = {
    language: SupportedLocale
    theme: 'theme1' | 'theme2' | 'theme3' | 'theme4' | 'theme5' | 'theme6'
    directory: string
  }

  type Track = Record<string, TrackDetails>

  type TrackDetails = {
    fullPath: string
    title: string
    artist: string
    genre: string
    year: string
    album: string
  }

  type Directory = Record<string, string>

  type Link = {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH'
    href: string
  }

  type Error = {
    message: string
    code: number
  }
}
