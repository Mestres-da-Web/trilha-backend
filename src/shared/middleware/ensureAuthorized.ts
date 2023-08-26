import { NextFunction, Request, Response } from "express";
import { AppError } from "../../AppError";
import { verify } from "jsonwebtoken";
import { jwt_config } from "../../config/auth";

interface JwtPayload {
    id: string,
    role: string,
    iat: number,
    exp: number
}

export function ensureAuthorized(
    request: Request,
    response: Response,
    next:NextFunction
){
    const authHeader = request.headers.authorization;
    if(!authHeader){
        throw new AppError("Não autorizado", 401)
    }
    const token = authHeader.split(" ")[1];

    const result = verify(token, jwt_config.secret) as JwtPayload;

    if(!result){
        throw new AppError("Não autorizado", 401)
    }

    request.user = {
        id: result.id,
        role: result.role
    }

    next();
}