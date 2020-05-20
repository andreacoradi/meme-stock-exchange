const express = require("express")
const mysql = require("promise-mysql")
require('dotenv').config()
const fetch = require("node-fetch")

const AUTH_URL = "https://auth-go.rover.acoradi.xyz/api/v1"


const app = express()
app.use(express.json())

let database

mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).then((c)=> {
    console.log("Connected!");
    database = c
}).catch(err => {
    throw err
})

const getMemes = async () => {
    let sql = "SELECT * FROM memes"

    return database.query(sql)
}

const getMemeValue = async (memeID) => {
    let sql = "SELECT score FROM memes WHERE name = ?"
    let values = [memeID]
    // TODO prepare sql
    return database.query(sql, values)
}

const getUsername = async (token) => {
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

const getUserID = async (username) => {
    const sql = "SELECT id FROM user WHERE username = ?"
    return database.query(sql, [username])
}

const buyMeme = async (memeID, userID, quantita) => {
    try {
        const valoreMeme = (await getMemeValue(memeID))[0].score

        console.log("VALORE MEME", valoreMeme);
        sql = "INSERT INTO investment (id_meme, id_utente, quantita, valore_meme) VALUES (?, ?, ?, ?)"

        values = [memeID, userID, quantita, valoreMeme]
        return database.query(sql, values)
    } catch (error) {
        console.error(error);
    }
}

// Sappiamo che il token c'è ed è valido perchè avviene un controllo prima nel middleware AUTH
const getToken = (req) => {
    const auth = req.headers["authorization"]
    const token = auth.split(" ")[1]
    return token
}

// AUTH
app.use(async (req, res, next) => {
    const auth = req.headers["authorization"]
    if(!auth) {
        res.status(400)
        res.send("no vecio, ma l'auth?")
        return
    }
    const token = auth.split(" ")[1]

    const result = await fetch(`${AUTH_URL}/auth`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    const json = await result.json()

    if(json.ok) {
        next()
    } else {
        res.status(403)
        res.send({
            "message": "token not valid"
        })
        return
    }
})

app.get("/memes", async (req, res) => {
    try {
        let memes = await getMemes()
        res.send(memes)
    } catch (error) {
        throw err
    }
})

app.post("/memes/:id", async (req, res) => {
    console.log(req.params.id);
    const id = req.params.id
    
    const token = getToken(req)

    const { action, quantity } = req.body
    console.log(token);
    console.log(action, quantity);
    if(!action || !quantity || !token) {
        res.status(400)
        res.send("no frah")
        return
    } 

    try {
        const username = await getUsername(token)
        // TODO fallo in una linea sola tenendolo const
        let userID = await getUserID(username)
        
        if(userID.length === 0) {
            res.send({
                "message": "no user found"
            })
            return
        }
        
        userID = userID[0].id
        
        if(action === "buy") {
            buyMeme(id, userID, quantity)
        } else if (action === "sell") {
            sellMeme(id, userID, quantity)
        }
        res.send({
            "message": "si, tutto a posto!"
        })
    } catch (error) {
        throw error
    }



})

app.listen(1337)