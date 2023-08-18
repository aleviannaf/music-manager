import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors"

const validatedAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { admin } = res.locals.decoded

    if (!admin)  throw new AppError("Insufiicient permissions", 403)

    return next()
}

export default validatedAdmin