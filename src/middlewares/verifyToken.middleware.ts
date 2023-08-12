import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import { verify } from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const autorization: string | undefined = req.headers.authorization

    if (!autorization) throw new AppError("Missing bearer token", 401)

    const token: string = autorization.split(" ")[1]

    verify(token, process.env.SECRET_KEY!, (err, decoded) => {
        if (err) throw new AppError(err.message, 401)
        
        res.locals = { ...res.locals, decoded }
    })


    return next()
}

export default verifyToken