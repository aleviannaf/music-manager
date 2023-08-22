import format from "pg-format";
import { Music, MusicCreate, MusicPagination, MusicResult } from "../interfaces";
import { client } from "../database";
import { QueryConfig, QueryResult } from "pg";
import { musicPagination } from "../schemas";

const create = async (payload: MusicCreate): Promise<Music[]> => {
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

const read = async (payload: any): Promise<MusicPagination> => {
    let perPage = Number(payload.perPage) || 5
    let page = payload.page ? Number(payload.page) : 1


    const queryMusic: QueryResult = await client.query(`SELECT COUNT(*) FROM musics;`)
    const totalMusic: number = parseInt(queryMusic.rows[0].count)

    const queryConfig: QueryConfig = {
        text: `SELECT * FROM "musics" OFFSET $1 LIMIT $2;`,
        values: [perPage * (page - 1), perPage]
    }
    
    const queryResult: MusicResult = await client.query(queryConfig)


    const baseUrl: string = `http://localhost:3000/musics`
    const prevPage: string | null = page == 1 ? null : `${baseUrl}?page=${page - 1}&perPage=${perPage}`
    const nextPage: string | null = page >= totalMusic / perPage ? null : `${baseUrl}?page=${page + 1}&perPage=${perPage}`

    const pagination = musicPagination.parse({
        prevPage,
        nextPage,
        currentPage: page,
        totalItens: totalMusic,
        data: queryResult.rows
    })

    return pagination
}

export default { create, read }