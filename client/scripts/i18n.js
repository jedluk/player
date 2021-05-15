const fs = require('fs').promises
const path = require('path')

const translationsPath = [__dirname, '..', 'public', 'translations']

const toTypes = () =>
  Promise.all([
    fs.readFile(path.join(...translationsPath, 'en.json')),
    fs.readdir(path.join(...translationsPath)),
  ]).then(([buffer, files]) => {
    console.log('Generating types...')
    fs.writeFile(
      path.join(__dirname, '..', 'src', 'translations.ts'),
      Buffer.from(
        [
          'export type TranslationKey = ',
          ...Object.keys(JSON.parse(buffer.toString())).map(
            key => `  | '${key}'`
          ),
          'export type SupportedLocale = ' +
            files
              .filter(f => f.endsWith('.json'))
              .map(f => "'" + f.split('.json')[0] + "'")
              .join(' | '),
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
