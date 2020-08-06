export type Maybe<T> = T | null

export namespace API {
  export type Track = {
    url: string
    uploaded: Date
    title: string
    artist: string
    genre: string
    year: string
    album: string
  }
  export type Error = {
    message: string
    code: number
  }
}
