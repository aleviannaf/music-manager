import format from "pg-format";
import { Music, MusicCreate, MusicPagination, MusicResult } from "../interfaces";
import { client } from "../database";
import { QueryConfig, QueryResult } from "pg";
import { musicPagination } from "../schemas";

type TMusicCreate = {
    name: string
    author: string
    album?: string | undefined | null
}

const create = async (payload: MusicCreate): Promise<Music[]> => {
    const uniqueKeys: string[] = Array.from(
        new Set(payload.flatMap(el => Object.keys(el)))
    )
    const values: any[][] = payload.map((music: TMusicCreate) => {
        const newObj: any = {}

        for(const key of uniqueKeys){
            newObj[key] = music[key as keyof TMusicCreate] || null
        }

        return Object.values(newObj)
    })

    const queryFormat: string = format(
        `INSERT INTO "musics" (%I) VALUES %L RETURNING *;`,
        uniqueKeys,
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