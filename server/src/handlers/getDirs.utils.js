const fs = require('fs').promises
const { nameOnly } = require('../lib/utils')
const { pick } = require('../lib/utils')

module.exports = {
  nameToPath(accumulator, path) {
    accumulator[nameOnly(path)] = path
    return accumulator
  },
  nameToDetails(accumulator, data) {
    const name = data.title || nameOnly(data.fullPath)
    accumulator[name] = data
    return accumulator
  },
  combineFilePathWitTags(files, tags) {
    return files.map((file, idx) => ({
      fullPath: file,
      ...pick(tags[idx], ['title', 'artist', 'album', 'year', 'genre'], ''),
    }))
  },
  withStats: async function (files) {
    const stats = await Promise.all(files.map(fs.stat))
    return files.map((path, idx) => ({ path, stat: stats[idx] }))
  },
}
