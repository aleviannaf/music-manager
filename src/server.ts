import app from "./app";
import startDatabase from "./database/connection";

const PORT: number = Number(process.env.PORT || 3000);
app.listen( PORT, async(): Promise<void> =>{
    await startDatabase()
    console.log(`Server running on http://localhost:${PORT}`)
})