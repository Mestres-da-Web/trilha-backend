import { sign } from "jsonwebtoken";
import { jwt_config } from "../../config/auth";

export const jwtGenerate = (
    id: string,
    role: string
): string =>{
    return sign({id, role}, jwt_config.secret, {
        expiresIn: jwt_config.expereIn
    })
}