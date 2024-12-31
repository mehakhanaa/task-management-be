import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const secret: Secret = process.env.JWT_SECRET || 'your_jwt_secret';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (err) {
    return null;
  }
};