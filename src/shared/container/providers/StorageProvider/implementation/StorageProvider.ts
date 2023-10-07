import { IStorageProviderDto } from "../model/IStorageProvider";
import fs from 'fs';
import path from 'path'
import { AppError } from "../../../../../AppError";
import { uploadConfig } from "../../../../../config/upload";

export class StorageProvider implements IStorageProviderDto {
    async saveFile(file: string): Promise<string> {
        try{
            await fs.promises.rename(
                path.resolve(uploadConfig.tmpFolder, file),
                path.resolve(uploadConfig.uploadsFolder, file)
            )

        }catch(err){
            throw new AppError("Erro ao salvar o arquivo: "+ err, 400);
        }

        return file
    }

    async deleteFile(file: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.uploadsFolder, file);

        try{
            await fs.promises.stat(filePath);
        }catch(err) {
            return;
        }

        await fs.promises.unlink(file)
    }
}