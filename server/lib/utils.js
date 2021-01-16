const ID3Promise = require('node-id3').Promise
const path = require('path')

function isNil(any) {
  return any == undefined
}

function isNull(any) {
  return any === null
}

function isUndefined(any) {
  return any === undefined
}

function isString(any) {
  return typeof any === 'string'
}

function noExt(name) {
  const lastDot = name.lastIndexOf('.')
  return name.slice(0, lastDot)
}

function defaultsTo(any, fallback) {
  return !isNil(any) ? any : fallback
}

function pick(obj, keys, fallback) {
  if (!Array.isArray(keys) || keys.length === 0) {
    return obj
  }
  return keys.reduce((accum, key) => {
    accum[key] = obj[key] || fallback
    return accum
  }, {})
}

function getTrackTags(track) {
  return new Promise(resolve =>
    ID3Promise.read(track)
      .then(resolve)
      .catch(() => resolve({}))
  )
}

function nameOnly(filePath) {
  return filePath.split(path.sep).pop()
}

module.exports = {
  defaultsTo,
  getTrackTags,
  isNil,
  isNull,
  isUndefined,
  isString,
  nameOnly,
  noExt,
  pick,
}
