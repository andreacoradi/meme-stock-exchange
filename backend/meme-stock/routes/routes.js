import express from "express"

import { handlerGetUserPortfolio, handlerGetUsers, handlerGetUser } from "../controllers/userController.js"
import { handlerGetMemes, handlerGetMeme, handlerExchangeMeme } from "../controllers/memes.js"

export const router = express.Router()

router.get("/memes", handlerGetMemes)
router.get("/memes/:id", handlerGetMeme)
router.post("/memes/:id", handlerExchangeMeme)

router.get("/users", handlerGetUsers)
router.get("/users/:username", handlerGetUser)
router.get("/users/:username/portfolio", handlerGetUserPortfolio)


