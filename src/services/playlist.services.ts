import format from "pg-format";
import { Playlist, PlaylistAddMusic, PlaylistCreate, PlaylistResult } from "../interfaces";
import { client } from "../database";
import { QueryResult } from "pg";
import { AppError } from "../errors";

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

const addMusic = async (payload: PlaylistAddMusic, playlistID: string) =>{
  const query: QueryResult = await client.query(
    `SELECT * FROM "music_playlists" WHERE "musicID" = $1 AND "playlistID" = $2;`,
    [payload.musicID, playlistID]
  )

  if(query.rowCount !== 0) throw new AppError("Music already added to playlist", 409)

  await client.query(
    `INSERT INTO "music_playlists" ("musicID", "playlistID") VALUES ($1, $2);`,
    [payload.musicID, playlistID]
  )



  return "Music added to playlist"
}

export default { create, read, addMusic }