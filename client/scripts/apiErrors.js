const fs = require('fs').promises
const path = require('path')

const allKeys = obj =>
  Object.keys(obj).reduce(
    (keys, el) =>
      typeof obj[el] === 'object' && obj[el] !== null
        ? [...keys, ...allKeys(obj[el])]
        : [...keys, el],
    []
  )

let errorCodes
try {
  errorCodes = require(path.join(
    __dirname,
    '..',
    '..',
    'server',
    'errorCodes.js'
  ))
} catch {
  console.error('Could not import error codes')
  return
}

const uniqueCodes = Array.from(new Set(allKeys(errorCodes)))

fs.writeFile(
  path.join('..', 'src', 'types.codes.ts'),
  Buffer.from(
    [
      'export type ErrorCodes = ',
      ...uniqueCodes.map(key => `  | '${key}'`),
    ].join('\n')
  )
)
