export function fetch(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  return window.fetch(input, init)
}
