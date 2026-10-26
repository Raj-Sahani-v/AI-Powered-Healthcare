
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Yeh batata hai ki yeh expected error hai, system crash nahi
    Error.captureStackTrace(this, this.constructor);
  }
}