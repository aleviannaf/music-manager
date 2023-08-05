import "dotenv/config"
import { Client } from "pg"

const client: Client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    password: process.env.DB_PASSWORD,
    database: process.env.DB
})

export default client