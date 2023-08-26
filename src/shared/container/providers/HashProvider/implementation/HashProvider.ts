import { IHashProviderDto } from "../model/IHashProvider";
import bcrypt from 'bcrypt'

export class HashProvider implements IHashProviderDto {
    generateHash(param: string): Promise<string> {
        return bcrypt.hash(param, 8);
    }

    compareHash(param: string, hash: string): Promise<boolean> {
        return bcrypt.compare(param, hash);
    }
}