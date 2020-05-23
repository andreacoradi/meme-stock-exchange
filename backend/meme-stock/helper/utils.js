import fetch from "node-fetch"

import { AUTH_URL } from "../controllers/auth.js"

export const getUsername = async (token) => {
    const result = await fetch(`${AUTH_URL}/auth`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    const json = await result.json()
    if(json.username) {
        return json.username
    } else {
        throw json.message
    }
}

// Sappiamo che il token c'è ed è valido perchè avviene un controllo prima nel middleware AUTH
export const getToken = (req) => {
    const auth = req.headers["authorization"]
    const token = auth.split(" ")[1]
    return token
}