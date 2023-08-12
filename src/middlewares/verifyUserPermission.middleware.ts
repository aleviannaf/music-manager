import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors"

const verifyUserPermisson = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { userId } = req.params
    const { sub, admin } = res.locals.decoded

    if (admin) return next()

    if (userId !== sub) {
        throw new AppError("Insufiicient permissions", 401)
    }

    return next()
}

export default verifyUserPermisson