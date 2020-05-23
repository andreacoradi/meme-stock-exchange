import express from "express"
import cors from "cors"

import { auth } from "./controllers/auth.js"
import { router } from "./routes/routes.js"

const app = express()
app.use(express.json())
app.use(cors())
app.use(auth)
app.use(router)

const PORT = process.env.PORT || 1337

app.listen(PORT)