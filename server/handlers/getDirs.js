const fs = require('fs').promises
const nodePath = require('path')
// const { pick, byMP3, getTags } = require('./utils')
const { getSelfLink, getParentLink, getChildrenLinks } = require('../lib/links')
const { byDirectory } = require('../lib/predicates')
const { nameOnly, isUndefined, isNull, noExt } = require('../lib/utils')

function byName(accumulator, path) {
  accumulator[nameOnly(path)] = path
  return accumulator
}

function byGivenTypes(types) {
  return function (accumulator, file) {
    if (types.some(type => file.toLowerCase().endsWith(type))) {
      accumulator[noExt(nameOnly(file))] = file
    }
    return accumulator
  }
}

async function withStats(files) {
  const stats = await Promise.all(files.map(fs.stat))
  return files.map((path, idx) => ({ path, stat: stats[idx] }))
}

async function getDirectories(req, res) {
  const { path, fileTypes } = req.query

  const dir = await fs.readdir(path)
  const files = dir.map(file => nodePath.join(path, file))

  const filesWithStats = await withStats(files)
  const dirsOnly = filesWithStats
    .filter(file => byDirectory(file.stat))
    .map(dir => dir.path)

  const types = !isUndefined(fileTypes) ? fileTypes.split(',') : null
  res.status(200).send({
    content: {
      dirs: dirsOnly.reduce(byName, {}),
      files: !isNull(types) ? files.reduce(byGivenTypes(types), {}) : undefined,
    },
    _links: {
      ...getSelfLink(req),
      ...getParentLink(req, path),
      ...getChildrenLinks(req, dirsOnly),
    },
  })
}

module.exports = getDirectories
