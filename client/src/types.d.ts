export type Maybe<T> = T | null

export type Modifier = {
  name: string
  property: keyof API.Track
  values: string[]
}

type FilteringProps = 'artist' | 'album' | 'year'

export type Filter = Record<FilteringProps, string[]>

export type FilterPayload = {
  property: FilteringProps
  value: Maybe<string[]>
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
