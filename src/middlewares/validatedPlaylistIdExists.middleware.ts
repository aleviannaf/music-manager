import { NextFunction, Request, Response } from "express";
import { UserResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors";

const validatedPlaylistIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { playlistID } = req.params;

  const query: UserResult = await client.query(
    'SELECT * FROM "playlists" WHERE "id" = $1',
    [playlistID]
  );

  if (query.rowCount === 0) {
    throw new AppError("Playlist not found", 404);
  }

  res.locals = { ...res.locals, foundUser: query.rows[0] };

  return next();
};

export default validatedPlaylistIdExists;