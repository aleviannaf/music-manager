import { Request, Response } from "express"
import { Playlist } from "../interfaces"
import { playlistServices } from "../services"

const create = async (req: Request, res: Response): Promise<Response> => {
    const playlist: Playlist = await playlistServices.create(
        res.locals.validated, 
        res.locals.decoded.sub
    )
    
    return res.status(201).json(playlist)
}

const read = async (req: Request, res: Response): Promise<Response> => {
    const playlist: Playlist[] = await playlistServices.read(
        res.locals.decoded.admin
    )
    
    return res.status(201).json(playlist)
}


export default { create, read }