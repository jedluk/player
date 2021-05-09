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

export function pickBy(obj: object, predicate: Function): object {
  return Object.fromEntries(
    Object.entries(obj).filter(([k, v]) => predicate(v))
  )
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const displaySec = Math.ceil(seconds - minutes * 60)
  return [minutes, `${displaySec}`.padStart(2, '0')].join(':')
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

export function loopedNextItem<T>(arr: T[], current: T): T {
  const currentIdx = arr.indexOf(current)
  return arr[(currentIdx + 1) % arr.length]
}
