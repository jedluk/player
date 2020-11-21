module.exports = {
  byMP3: file => file.toLowerCase().endsWith('.mp3'),
  byMPEG: file => /\.mpe?g$/i.test(file.toLowerCase()),
  byDirectory: fileStat => fileStat.isDirectory(),
  byGivenTypes: types => file =>
    types.some(type => file.toLowerCase().endsWith(type)),
}
