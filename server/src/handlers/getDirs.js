const fs = require('fs').promises
const path = require('path')
const { getTrackTags, isNull, isUndefined, nameOnly } = require('../lib/utils')
const { getSelfLink, getParentLink, getChildrenLinks } = require('../lib/links')
const { byDirectory, byGivenTypes } = require('../lib/predicates')
const {
  combineFilePathWitTags,
  withStats,
  nameToDetails,
  nameToPath,
} = require('./getDirs.utils')

async function getDirectories(req, res) {
  const { path: dirPath, fileTypes } = req.query

  const dir = await fs.readdir(dirPath)
  const files = dir.map(file => path.join(dirPath, file))

  const dirsNotHiddenOnly = (await withStats(files))
    .filter(file => byDirectory(file.stat))
    .map(dir => dir.path)
    .filter(path => !nameOnly(path).startsWith('.'))

  const filesAndTags = isUndefined(fileTypes)
    ? await Promise.resolve(null)
    : await Promise.resolve(files.filter(byGivenTypes(fileTypes.split(','))))
        .then(ff => Promise.all([ff, Promise.all(ff.map(getTrackTags))]))
        .then(result => combineFilePathWitTags(...result))

  res.status(200).send({
    content: {
      dirs: dirsNotHiddenOnly.reduce(nameToPath, {}),
      files: !isNull(filesAndTags)
        ? filesAndTags.reduce(nameToDetails, {})
        : undefined,
    },
    _links: {
      ...getSelfLink(req),
      ...getParentLink(req, dirPath),
      ...getChildrenLinks(req, dirsNotHiddenOnly),
    },
  })
}

module.exports = getDirectories
