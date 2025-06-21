import { Request, Response, NextFunction } from 'express';
import Jwt from 'jsonwebtoken';
import { errorResponse, validationError } from '../helpers/api-responses';
import dotenv from 'dotenv'
dotenv.config();

const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

        if (!token) {
            return validationError(res, 'Token not Found')
        }
        Jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (error: any) {
        return errorResponse(res, error.message)
    }
}

export default authenticate;