import { NextFunction, Request, Response } from "express";
import { UserResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors";

const validatedIdBodyExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { musicID } = res.locals.validated;

  const query: UserResult = await client.query(
    'SELECT * FROM "musics" WHERE "id" = $1',
    [musicID]
  );

  if (query.rowCount === 0) {
    throw new AppError("Music not found", 404);
  }

  res.locals = { ...res.locals, foundUser: query.rows[0] };

  return next();
};

export default validatedIdBodyExists;