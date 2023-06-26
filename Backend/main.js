import express from "express";
import dotenv from "dotenv";

import { genresRoute } from "./routes/genres.js";
dotenv.config()

const app = express()
app.use(express.json())

// console.log(`Process running in port ${}`)
app.use('/api/genres',genresRoute)

console.log(process.env.PORT)


const PORT = process.env.PORT_ADDR || 3000
console.log(process.env)
app.listen(PORT, ()=>console.log("Listening on port ", PORT))