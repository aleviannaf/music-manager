import format from "pg-format";
import { Playlist, PlaylistCreate, PlaylistResult } from "../interfaces";
import { client } from "../database";

const create = async (payload: PlaylistCreate, userId: string): Promise<Playlist> => {

    const queryFormat: string = format(
      `INSERT INTO "playlists" (%I, "userID") VALUES (%L, $1) RETURNING *;`,
        Object.keys(payload),
        Object.values(payload)
    )

    const queryResult: PlaylistResult = await client.query(queryFormat, [userId])

    return queryResult.rows[0]
}

export default { create }