const express = require('express')
const formidable = require('formidable')
const NodeID3 = require('node-id3')
const path = require('path')
const fs = require('fs').promises

const { UPLOAD_DIR = path.join('.', 'uploads') } = process.env

const router = express.Router()

const getFileDetails = async name => await fs.stat(path.join(UPLOAD_DIR, name))

const pickTags = (tags, required) =>
  Object.fromEntries(
    Object.entries(tags).filter(([key]) => required.includes(key))
  )

router.get('/file', async (req, res) => {
  await fs.readdir(UPLOAD_DIR).then(async tracks => {
    const [stats, tags] = await Promise.all([
      Promise.all(tracks.map(getFileDetails)),
      Promise.all(
        tracks
          .map(track => path.join(UPLOAD_DIR, track))
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
      tracks: tracks.map((track, idx) => ({
        uploaded: stats[idx].birthtime,
        ...pickTags(tags[idx], ['title', 'artist', 'album', 'year', 'genre']),
      })),
    })
  })
})

router.post('/file', async (req, res) => {
  const form = new formidable.IncomingForm({
    uploadDir: UPLOAD_DIR,
    multiples: true,
    keepExtensions: true,
  })
  form
    .on('fileBegin', function (name, file) {
      file.path = path.join(form.uploadDir, file.name)
    })
    .on('error', () => {
      return res.status(500).send('Error while uploading a file')
    })
    .on('end', () => {
      return res.status(201).send('File(s) saved')
    })
  form.parse(req)
})

module.exports = router
