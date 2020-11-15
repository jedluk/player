const path = require('path')

function getServerURL(req) {
  return `${req.protocol}://${req.get('host')}`
}

function getParentLink(req, dir) {
  const pathChunks = dir.split(path.sep)
  const parentDir = pathChunks.slice(0, -1).join(path.sep)
  if (parentDir === '') {
    return {}
  }
  return {
    parent: {
      method: 'GET',
      href: `${getServerURL(req)}/api/dirs?path=${parentDir}`,
    },
  }
}

function getChildrenLinks(req, children) {
  return {
    children: children.map(child => ({
      method: 'GET',
      href: `${getServerURL(req)}/api/dirs?path=${child}`,
    })),
  }
}

function getSelfLink(req) {
  return {
    self: {
      method: 'GET',
      href: getServerURL(req) + req.originalUrl,
    },
  }
}

module.exports = {
  getServerURL,
  getSelfLink,
  getParentLink,
  getChildrenLinks,
}
