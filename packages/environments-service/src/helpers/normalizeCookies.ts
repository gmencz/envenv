import { Request, NextFunction, Response } from 'express';

/*
  Middleware to normalize cookies into req.cookies without having to care if
  the request comes from the gateway or from a direct channel.
*/
export default function normalizeCookies(
  request: Request,
  _: Response,
  next: NextFunction
): void {
  try {
    if (request.headers['x-forwarded-from-gateway']) {
      if (!request.headers.cookie) return;

      request.cookies = JSON.parse(request.headers.cookie);
    }

    if (Object.keys(request.cookies).length === 0) {
      request.cookies = {};
    }

    return next();
  } catch (error) {
    console.error(error);
  }
}
