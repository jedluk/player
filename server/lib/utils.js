const { read } = require('node-id3')
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

function pick(obj, keys) {
  if (!Array.isArray(keys) || (Array.isArray(keys) && keys.length === 0)) {
    return obj
  }
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => keys.includes(key))
  )
}

function getTrackTags(track) {
  return new Promise(resolve =>
    read(track, (err, tags) => resolve(isNull(err) ? tags : {}))
  )
}

function nameOnly(filePath) {
  return filePath.split(path.sep).pop()
}

module.exports = {
  isNil,
  isNull,
  isUndefined,
  isString,
  pick,
  noExt,
  defaultsTo,
  getTrackTags,
  nameOnly,
}
