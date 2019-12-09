import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // use destructuring to grab only second param as token (form: "Bearer TOKEN")
  const [, token] = authHeader.split(' ');

  try {
    // promisify jwt's verify func and pass token+secret to the returned func
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // if there wasn't an error, proceed to appending user id to this request
    req.userId = decoded.id; // id is passed as payload in session controller

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
