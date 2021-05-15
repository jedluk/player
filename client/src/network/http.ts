import { defaultsTo } from '../utils/lib'
import { API_URL } from './config'

export async function handleHTTPResponse(response: Response) {
  if (!response.ok) {
    throw Error(await response.json())
  }
  return await response.json()
}

export function streamURL(path: string) {
  return `${API_URL}/stream/file?path=${encodeURIComponent(path)}`
}

export function stripPath(url: string): string {
  const searchParams = new URL(url).searchParams
  return defaultsTo(searchParams.get('path'), 'home')
}
