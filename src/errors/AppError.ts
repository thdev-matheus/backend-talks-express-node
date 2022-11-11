export class AppError {
  statusCode: number;
  message: string;
  image: string;

  constructor(statusCode: number, message: string, image: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.image = image;
  }
}
