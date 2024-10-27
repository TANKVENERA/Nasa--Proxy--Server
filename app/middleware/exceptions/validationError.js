class ValidationError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.code = statusCode;
    this.name = this.constructor.name;
  }
}

module.exports = ValidationError;
