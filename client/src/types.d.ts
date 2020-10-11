export type Maybe<T> = T | null

export type Modifier = {
  name: string
  property: 'artist' | 'album' | 'year'
  values: string[]
}

export type Filter = Record<Modifier[property], string[]>

export namespace API {
  type Assets = {
    dirs: Directory[]
    tracks: Track[]
  }

  type Track = {
    url: string
    uploaded: Date
    title: string
    artist: string
    genre: string
    year: string
    album: string
  }

  type Directory = {
    name: string
    url: string
  }

  type Error = {
    message: string
    code: number
  }
}
