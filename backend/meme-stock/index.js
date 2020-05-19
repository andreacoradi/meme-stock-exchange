const express = require("express")
const mysql = require("promise-mysql")
require('dotenv').config()


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

const getUser = async (memeID) => {
    let sql = "SELECT score FROM memes WHERE name = ?"
    let values = ["id", memeID]
    // TODO prepare sql
    return database.query(sql, values)
}

const buyMeme = async (memeID, quantita) => {
    try {
        const valoreMeme = (await getMemeValue(memeID))[0].score

        console.log("VALORE MEME", valoreMeme);
        sql = "INSERT INTO investment (id_meme, id_utente, quantita, valore_meme) VALUES (?, ?, ?, ?)"
        // TODO ottieni l'id dell'utente
        values = [memeID, 1, quantita, valoreMeme]
        return database.query(sql, values)
    } catch (error) {
        console.error(error);
    }
}

app.get("/memes", async (req, res) => {
    try {
        let memes = await getMemes()
        res.send(memes)
    } catch (error) {
        throw err
    }
})

app.post("/memes/:id", (req, res) => {
    console.log(req.params.id);
    const id = req.params.id
    const auth = req.headers["authorization"]
    if(!auth) {
        res.status(400)
        res.send("no vecio, ma l'auth?")
        return
    }
    const token = auth.split(" ")[1]
    const { action, quantity } = req.body
    console.log(token);
    console.log(action, quantity);
    if(!action || !quantity || !token) {
        res.status(400)
        res.send("no frah")
        return
    } 

    if(action === "buy") {
        buyMeme(id, quantity)
    } else if (action === "sell") {
        sellMeme(id)
    }

    res.send({
        "message": "si, tutto a posto!"
    })
})

app.listen(1337)