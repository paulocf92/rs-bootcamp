import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

/* multer handles multipart form data (images), and crypto generates a random
   16-byte code for file's name. */
export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
