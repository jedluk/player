class APIError extends Error {
  constructor(message, code, status) {
    super(message)
    this.code = code
    this.status = status
  }

  log() {
    console.error(this.stack)
  }

  serialize() {
    return {
      message: this.message,
      code: this.code,
    }
  }
}

class ClientError extends APIError {
  constructor(message, code) {
    super(message, code, 400)
  }
}

module.exports = {
  APIError,
  ClientError,
}
