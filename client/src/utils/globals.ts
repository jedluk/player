export function fetch(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  return window.fetch(input, init)
}

export function encodeURIComponent(item: string | number | boolean): string {
  return window.encodeURIComponent(item)
}

export const ENTER_KEY_CODE = 13
