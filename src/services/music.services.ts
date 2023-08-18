import format from "pg-format";
import { Music, MusicCreate, MusicResult } from "../interfaces";
import { client } from "../database";

const create = async (payload: MusicCreate):Promise<Music[]> => {
    const columns: string[] = Object.keys(payload[0])
    const values: any[][] = payload.map((el) => Object.values(el))

    const queryFormat: string = format(
        `INSERT INTO "musics" (%I) VALUES %L RETURNING *;`,
        columns,
        values
    )

    const queryResult: MusicResult = await client.query(queryFormat)
    
    return queryResult.rows
}

const read =async (): Promise<Music[]> => {
    const queryString: string = `SELECT * FROM "musics";`
    const queryResult: MusicResult = await client.query(queryString)

    return queryResult.rows
}

export default { create, read }