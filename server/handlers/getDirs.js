const fs = require('fs').promises
const { read } = require('fs')
const nodePath = require('path')
// const { pick, byMP3, getTags } = require('./utils')
const { getSelfLink, getParentLink, getChildrenLinks } = require('../lib/links')
const { byDirectory } = require('../lib/predicates')
const { nameOnly, isUndefined } = require('../lib/utils')

async function withStats(files) {
  const stats = await Promise.all(files.map(fs.stat))
  return files.map((path, idx) => ({ path, stat: stats[idx] }))
}

async function readFiles(dir, types) {
  if (isUndefined(types)) {
    return {}
  }
  return {
    files: [],
  }
}

async function getDirs(req, res) {
  const { path, fileTypes } = req.query

  const dir = await fs.readdir(path)
  const files = dir.map(file => nodePath.join(path, file))

  const dirsOnly = (await withStats(files))
    .filter(file => byDirectory(file.stat))
    .map(dir => dir.path)

  res.status(200).send({
    content: {
      directories: dirsOnly.map(async path => ({
        path,
        name: nameOnly(path),
      })),
    },
    _links: {
      ...getSelfLink(req),
      ...getParentLink(req, path),
      ...getChildrenLinks(req, dirsOnly),
    },
  })
}

module.exports = getDirs

// const {
//   ASSETS_DIR = path.join(__dirname, '..', 'assets'),
//   ROOT_DIR = path.join(__dirname, '..', 'assets'),
// } = process.env

//   await fs
//     .readdir(assetsPath)
//     .then(files => {
//       const paths = files.map(file => path.join(ROOT_DIR, file))
//       return Promise.all([
//         Promise.resolve(paths),
//         Promise.all(paths.map(path => fs.stat(path))),
//       ])
//     })
//     .then(async ([files, stats]) => {
//       const directories = files.filter((_, idx) => stats[idx].isDirectory())
//       const tracks = files.filter(byMP3)
//       const [trackStats, tags] = await Promise.all([
//         Promise.all(tracks.map(track => fs.stat(track))),
//         Promise.all(tracks.map(getTags)),
//       ])

//       res.status(200).send({
//         content: {
//           dirs: directories.map(dir => ({
//             name: dir.slice(dir.lastIndexOf(path.sep) + 1),
//             url: dir,
//           })),
//           tracks: tags.map((tag, idx) => ({
//             uploaded: trackStats[idx].birthtime,
//             url: tracks[idx],
//             ...{
//               title: path.basename(tracks[idx]),
//               album: path.basename(path.dirname(tracks[idx])),
//             },
//             ...pick(tag, ['title', 'artist', 'album', 'year', 'genre']),
//           })),
//         },

//       })
//     })
//     .catch(err => {
//       console.error(err)
//       return res
//         .status(500)
//         .json({ msg: err.message || 'Internal server error' })
//     })
