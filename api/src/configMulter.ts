import multer, { diskStorage } from 'multer';
import { extname } from 'path';

export const storageMulterFile: multer.StorageEngine = diskStorage({
  filename: (req, file, cb) => {
    const actualDate: Date = new Date();
    const newFilename = `${actualDate.getFullYear()}-${
      actualDate.getMonth() + 1
    }-${actualDate.getDate()}-${Date.now()}${extname(file.originalname)}`;
    cb(null, newFilename);
  },
});

export const storageResumeMulterFile: multer.StorageEngine = diskStorage({
  filename: (req, file, cb) => {
    const newFilename = `${file.originalname}`;
    cb(null, newFilename);
  },
});
