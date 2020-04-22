import User from '../entities/User';
import { sign } from 'jsonwebtoken';

export const createAccessToken = (user: User): string => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};
