import { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError";

export function globalErrorHandler(error: any, request: Request, response: Response, _:NextFunction){
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
            
        })
    }

    return response.status(500).json({
        status: 'error',
        message: 'Server Error ' + error
    })
}

