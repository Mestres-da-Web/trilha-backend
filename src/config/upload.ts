import multer, { StorageEngine } from "multer";
import path from 'path'
import crypto from 'crypto'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export interface IUploadConfig {
    driver: 'disk';

    tmpFolder: string;
    uploadsFolder: string;

    multer: {
        storage: StorageEngine
    }
}

export const uploadConfig: IUploadConfig = {
    tmpFolder,
    uploadsFolder: path.resolve(tmpFolder, 'uploads'),
    driver: 'disk',
    multer: {
        storage: multer.diskStorage({
            destination: tmpFolder,
            filename: (request, file, callback) => {
                const fileHash = crypto.randomBytes(10).toString('hex');
                const formattedOriginalName = file.originalname.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^.A-Z0-9]+/gi, '');

                const filename = `${fileHash}-${formattedOriginalName}`

                callback(null, filename)
            }
        })
    }
}