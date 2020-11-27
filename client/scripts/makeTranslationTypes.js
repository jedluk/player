const fs = require('fs').promises
const path = require('path')

const enTranslationsPath = [__dirname, '..', 'src', 'translations', 'en.json']
const typesPath = [__dirname, '..', 'src', 'translations', 'types.ts']

fs.readFile(path.join(...enTranslationsPath))
  .then(buffer => buffer.toString())
  .then(json => JSON.parse(json))
  .then(file => {
    console.log('Generating types...')
    fs.writeFile(
      path.join(...typesPath),
      Buffer.from(
        [
          'export type TranslationKey = ',
          ...Object.keys(file).map(key => `  | '${key}'`),
        ].join('\n')
      )
    )
  })
