class ValidationError extends Error {
  code: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.code = statusCode;
    this.name = this.constructor.name;
  }
}

export { ValidationError };
