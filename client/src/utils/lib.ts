export function isNull(sth: any): boolean {
  return sth === null
}

export function isNil(sth: any): boolean {
  return sth == null
}

export function defaultsTo<R>(sth: R | null | undefined, fallback: R): R {
  // eslint-disable-next-line
  return sth != undefined ? sth : fallback
}

export function formatDuration(seconds: number): string {
  const minutes: number = Math.floor(seconds / 60)
  const secondsLeft: number = seconds - minutes * 60
  const displaySeconds = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft
  return `${minutes}:${displaySeconds}`
}

export function formatTime(fromDate: Date): string {
  const date = new Date(fromDate)
  return [
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
    String(date.getFullYear()),
  ].join('.')
}

export function joinClasses(...classes: any[]) {
  return classes.filter(className => typeof className === 'string').join(' ')
}

export function unique<R>(collection: R[]): R[] {
  return Array.from(new Set(collection))
}
