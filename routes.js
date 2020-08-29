const express = require('express')
const formidable = require('formidable')
const NodeID3 = require('node-id3')
const path = require('path')
const fs = require('fs').promises

const { ASSETS_DIR = path.join('.', 'assets') } = process.env

const router = express.Router()

const pickTags = (tags, required) =>
  Object.fromEntries(
    Object.entries(tags).filter(([key]) => required.includes(key))
  )

router.get('/assets', async (req, res) => {
  const { path: queryPath } = req.query
  const ROOT_DIR = typeof queryPath === 'string' ? queryPath : ASSETS_DIR
  await fs
    .readdir(ROOT_DIR)
    .then(files => {
      const paths = files.map(file => path.join(ROOT_DIR, file))
      return Promise.all([
        Promise.resolve(paths),
        Promise.all(paths.map(fs.stat))
      ])
    })
    .then(async ([files, stats]) => {
      const directories = files.filter((_, idx) => stats[idx].isDirectory())
      const tracks = files.filter(file =>  file.endsWith('.mp3'))
      const [trackStats, tags] = await Promise.all([
        Promise.all(tracks.map(fs.stat)),
        Promise.all(
          tracks
            .map(
              track =>
                new Promise(resolve =>
                  NodeID3.read(track, function (err, tags) {
                    resolve(err === null ? tags : {})
                  })
                )
            )
        ),
      ])
      res.status(200).send({
        dirs: directories.map(dir => ({
          name: dir.slice(dir.lastIndexOf('/') + 1),
          url: dir
        })),
        tracks: tags.map((tag, idx) => ({
          uploaded: trackStats[idx].birthtime,
          url: tracks[idx],
          ...pickTags(tag, ['title', 'artist', 'album', 'year', 'genre']),
        })),
      })
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ msg: err.message || 'Intenral server error' })
    })
})

router.post('/assets', async (req, res) => {
  const form = new formidable.IncomingForm({
    uploadDir: ASSETS_DIR,
    multiples: true,
    keepExtensions: true,
  })
  form
    .on('fileBegin', function (name, file) {
      file.path = path.join(form.uploadDir, file.name)
    })
    .on('error', () => {
      return res.status(500).send('Server error while uploading a file!')
    })
    .on('end', () => {
      return res.status(201).send('File(s) saved')
    })
  form.parse(req)
})

module.exports = router
