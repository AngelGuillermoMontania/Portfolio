import multer, { diskStorage } from "multer";
import path, { extname } from "path";

export const storageMulter: multer.StorageEngine = diskStorage({
    filename: (req, file, cb) => {
        const actualDate: Date = new Date()
        const newFilename = `${actualDate.getFullYear()}-${actualDate.getMonth() + 1}-${actualDate.getDate()}-${Date.now()}${extname(file.originalname)}`;
        cb(null, newFilename);
    }
})