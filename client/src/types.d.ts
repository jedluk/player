export type Maybe<T> = T | null

export type Modifier = {
  name: string
  property: keyof API.Track
  values: string[]
}

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
