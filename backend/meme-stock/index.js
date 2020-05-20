const express = require("express")
const mysql = require("promise-mysql")
require('dotenv').config()
const fetch = require("node-fetch")
const e = require("express")

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

const getMemes = async (count) => {
    let sql = "SELECT name, title, url, subreddit, score, archived, created_at FROM memes ORDER BY created_at DESC "
    if(count) {
        sql += ` LIMIT ${count}` 
    }
    return database.query(sql)
}

const getMeme = async (memeID) => {
    const sql = "SELECT name, title, url, subreddit, score, archived, created_at FROM memes WHERE name = ?"
    return database.query(sql, [memeID])
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

const getCoins = async (username) => {
    const sql = "SELECT coins FROM user WHERE username = ?"
    return database.query(sql, username)
}

const setCoins = async (username, coins) => {
    const sql = "UPDATE user SET coins = ? WHERE username = ?"
    return database.query(sql, [coins, username])
}

const getUserID = async (username) => {
    const sql = "SELECT id FROM user WHERE username = ?"
    return database.query(sql, [username])
}

const buyMeme = async (memeID, valoreMeme, userID, quantita) => {
    try {
        let sql = "SELECT COUNT(*) AS Quanti FROM investment WHERE id_meme = ? AND id_utente = ?"

        const result = (await database.query(sql, [memeID, userID]))[0].Quanti
        if(result === 0) {
            sql = "INSERT INTO investment (id_meme, id_utente, quantita, valore_meme) VALUES (?, ?, ?, ?)"
            const values = [memeID, userID, quantita, valoreMeme]
            return database.query(sql, values)
        } else {
            sql = "UPDATE investment SET quantita = ? WHERE id_meme = ? AND id_utente = ?"
            return database.query(sql, [result + quantita, memeID, userID])
        }
    } catch (error) {
        console.error(error);
    }
}

const sellMeme = async (memeID, userID, quantita) => {
    let sql = "SELECT quantita FROM investment WHERE id_meme = ? AND id_utente = ?"
    console.log(memeID, userID);
    return database.query(sql, [memeID, userID])
    .then(result => {
        console.log("Quantità di meme trovata", result);
        if(!result) {
            throw new Error("questo meme non esiste")
        }
        const q = result[0].quantita
        let values = []
        if(quantita > q) {
            throw new Error("Non hai abbastanza azioni")
        } else if (q == quantita) {
            // Se vendo tutto cancello
            sql = "DELETE FROM investment WHERE id_meme = ? AND id_utente = ?"
            values = [memeID, userID]
        } else {
            // Vado a sottrarre la quantita
            sql = "UPDATE investment SET quantita = ? WHERE id_meme = ? AND id_utente = ?"
            values = [q-quantita,memeID, userID]
        }
        database.query(sql, values)
    })
    .catch(err => {
        throw err
    })
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
        const count = req.query.count
        const memes = await getMemes(count)
        res.send(memes)
    } catch (error) {
        throw error
    }
})

app.get("/memes/:id", async (req, res) => {
    try {
        const memeID = req.params.id
        const meme = await getMeme(memeID)
        res.send(meme)
    } catch (error) {
        throw error
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
        
        let userID = await getUserID(username)
        
        if(userID.length === 0) {
            res.send({
                "message": "no user found"
            })
            return
        }
        
        userID = userID[0].id

        const valoreMeme = (await getMemeValue(id))[0].score

        const userCoins = (await getCoins(username))[0].coins
        
        if(action === "buy") {
            if(userCoins < valoreMeme * quantity) {
                throw new Error("not enough coins")
            }
            await buyMeme(id, valoreMeme, userID, quantity)

            await setCoins(username, userCoins - (valoreMeme * quantity))
        } else if (action === "sell") {
            await sellMeme(id, userID, quantity)
            console.log("Valore investimento", valoreMeme * quantity);
            
            await setCoins(username, userCoins + (valoreMeme * quantity))
        }
        res.send({
            "message": "si, tutto a posto!"
        })
    } catch (error) {
        console.error(error);
        res.statusCode = 400
        res.send({
            "message": error.message
        })
    }
})

app.listen(1337)