import { sign } from "jsonwebtoken";
import { client } from "../database";
import { AppError } from "../errors";
import { SessionReturn, SessionCreate, UserResult, User} from "../interfaces";

const create  = async (payload: SessionCreate): Promise<SessionReturn> =>{
    const query: UserResult = await client.query(
        'SELECT * FROM "users" WHERE "username" = $1',
        [payload.username]
    )

    if(query.rowCount === 0){
        throw new AppError("Username or password is incorrect", 401)
    }
    
    const user: User = query.rows[0]

    if(user.password !== payload.password){
        throw new AppError("Username or password is incorrect", 401)
    }

    const token: string = sign(
        {username: user.username, admin: user.admin},
        process.env.SECRET_KEY!,
        { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN!}
    )

    return { token }
}

export default { create }