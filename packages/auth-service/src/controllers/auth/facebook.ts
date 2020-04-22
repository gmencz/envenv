import { Request, Response } from 'express';

export const callbackFacebookAuth = (req: Request, res: Response): void => {
  res.redirect('/signup/lastStep');
};
