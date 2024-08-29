class Response {
  constructor(status, message, data) {
    this.status = status;
    this.message = message;
    this.data = data
  }
}
class SuccessResponse extends Response {
  constructor(message, data) {
    super(true, message, data)
  }
}
class ErrorResponse extends Response {
  constructor(message) {
    super(false, message)
  }
}
module.exports = { Response, SuccessResponse, ErrorResponse }