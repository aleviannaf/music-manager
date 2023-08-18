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
    
    return res.status(200).json(playlist)
}

const addMusic = async (req: Request, res: Response): Promise<Response> => {
    const { validated } = res.locals
    const { playlistID } = req.params

    const message: string = await playlistServices.addMusic(validated, playlistID)
    
    return res.status(200).json(message)
}


export default { create, read, addMusic  }