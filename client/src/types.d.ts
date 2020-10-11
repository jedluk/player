export type Maybe<T> = T | null

export type Modifier = {
  name: string
  property: keyof API.Track
  values: string[]
}

export namespace API {
  export type Assets = {
    dirs: Directory[]
    tracks: Track[]
  }

  export type Track = {
    url: string
    uploaded: Date
    title: string
    artist: string
    genre: string
    year: string
    album: string
  }

  export type Directory = {
    name: string
    url: string
  }

  export type Error = {
    message: string
    code: number
  }
}
