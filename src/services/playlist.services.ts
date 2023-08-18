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

const read = async (admin: boolean): Promise<Playlist[]> =>{
  if(!admin){
    const queryString: string = `
    SELECT 
      p.*, u.username 
    FROM "playlists" "p" 
    JOIN "users" "u" 
      ON "p"."userID" = "u"."id"
      WHERE "p"."privancy" != 'private';
    `
    const query: PlaylistResult = await client.query(queryString)
    
    return query.rows;
  }

  const queryString: string = `
  SELECT 
    p.*, u.username 
  FROM "playlists" "p" 
  JOIN "users" "u" 
    ON "p"."userID" = "u"."id";
  `
  const query: PlaylistResult = await client.query(queryString)
  
  return query.rows;
 
}

export default { create, read }