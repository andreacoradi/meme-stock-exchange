import fetch from "node-fetch"

import { getUserID } from "../model/user.js"

export const AUTH_URL = "https://auth-go.rover.acoradi.xyz/api/v1"

export const auth = async (req, res, next) => {
    const auth = req.headers["authorization"]
    if(!auth) {
        res.status(401)
        res.send({
            "message": "authorization is needed"
        })
        return
    }
    const token = auth.split(" ")[1]

    if(!token) {
        res.status(403)
        res.send({
            "message": "no token provided"
        })
        return
    }

    const result = await fetch(`${AUTH_URL}/auth`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    const json = await result.json()

    if(json.ok) {
        try {
            const userID = await getUserID(json.username)
            if(userID.length === 0) {
                await createNewUser(json.username)
            }
            next()
        } catch (error) {
            console.error(error)
        }
    } else {
        res.status(result.status)
        res.send({
            "message": json.message
        })
        return
    }
}