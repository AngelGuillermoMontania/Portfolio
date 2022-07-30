import multer, { diskStorage } from "multer";
import path, { extname, join } from "path";

export const storageMulterFile: multer.StorageEngine = diskStorage({
    filename: (req, file, cb) => {
        const actualDate: Date = new Date()
        const newFilename = `${actualDate.getFullYear()}-${actualDate.getMonth() + 1}-${actualDate.getDate()}-${Date.now()}${extname(file.originalname)}`;
        cb(null, newFilename);
    },
    destination: './assets',
})

export const storageMulterFiles: multer.StorageEngine = diskStorage({
    filename: (req, file, cb) => {
        let order = 0
        const actualDate: Date = new Date()
        const newFilename = `${++order}-${actualDate.getFullYear()}-${actualDate.getMonth() + 1}-${actualDate.getDate()}-${Date.now()}${extname(file.originalname)}`;
        cb(null, newFilename);
    },
    destination: './assets',
})