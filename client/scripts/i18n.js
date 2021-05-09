const fs = require('fs').promises
const path = require('path')

const translationsPath = [__dirname, '..', 'src', 'translations']

const toTypes = () =>
  fs
    .readFile(path.join(...translationsPath, 'en.json'))
    .then(buffer => buffer.toString())
    .then(json => JSON.parse(json))
    .then(file => {
      console.log('Generating types...')
      fs.writeFile(
        path.join(...translationsPath, 'types.ts'),
        Buffer.from(
          [
            'export type TranslationKey = ',
            ...Object.keys(file).map(key => `  | '${key}'`),
          ].join('\n')
        )
      )
    })

const populate = () =>
  fs
    .readFile(path.join(...translationsPath, 'en.json'))
    .then(buffer => JSON.parse(buffer.toString()))
    .then(template => {
      const content = Object.fromEntries(
        Object.entries(template).map(([k, v]) => [k, `lang::[${v}]`])
      )
      fs.writeFile(
        path.join(...translationsPath, 'lang.json'),
        JSON.stringify(content, undefined, 4)
      )
    })

const func = process.argv[2] === 'populate' ? populate : toTypes
func.call()
