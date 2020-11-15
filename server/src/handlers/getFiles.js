const fs = require('fs').promises

function getPartials(range, total) {
  const [partialStart, partialEnd] = range.replace(/bytes=/, '').split('-')
  const start = parseInt(partialStart, 10) || 0
  const end = partialEnd ? parseInt(partialEnd, 10) : total - 1
  return { start, end }
}

async function streamFile(req, res) {
  const stat = await fs.stat(file)
  const { size: total } = stat
  const { range } = req.headers

  const { start, end } = getPartials(range, total)
  const chunkSize = end - start + 1
  const rstream = fs.createReadStream(file, { start, end })

  res.writeHead(206, {
    'Content-Range': ['bytes ', start, '-', end, '/', total].join(''),
    'Accept-Ranges': 'bytes',
    'Content-Length': chunkSize,
    'Content-Type': 'audio/mpeg',
  })
  rstream.pipe(res)
}

module.exports = streamFile
