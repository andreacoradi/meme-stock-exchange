const fetch = require('node-fetch');
const mysql = require("promise-mysql")
const CronJob = require('cron').CronJob;
require('dotenv').config()

// Millisecondi in un giorno
const MS_IN_A_DAY = 1000*60*60*24
// Dopo quanti giorni un meme senza investimenti viene eliminato
const MAX_MEME_AGE = 5

const API_URL = "https://www.reddit.com/r"

let database

mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).then(c => {
    console.log("Connesso!");
    database = c
}).then(() => {
    aggiungiMeme.start();
    rimuoviMeme.start();
    aggiornaMeme.start();
}).catch(err => {
    throw err
})

const insertMeme = (m) => {
    const sql = "INSERT INTO memes (name, title, url, score, subreddit, archived, created_at) VALUES (?)";

    const values = [m.name, m.title, m.url, m.score, m.subreddit, m.archived, m.created_utc]
    database.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("inserisco", m.name);
        console.log("Number of records inserted: " + result.affectedRows);
    });
}

const updateMeme = (m) => {
    const sql = "UPDATE memes SET score = ?, archived = ? WHERE name = ?";
    const values = [m.score, m.archived, m.name]
    database.query(sql, values, function (error, results, fields) {
        if(error) throw error
        console.log("Updated", m.name);
    })
}

const checkIfUnique = (m) => {
    const sql = "SELECT COUNT(*) as Quanti FROM memes WHERE name = ?"

    database.query(sql, m.name, function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result[0].Quanti);
        if(result[0].Quanti === 0) {
            insertMeme(m)
        } else {
            console.log(m.name + " è gia presente");
            if(m.archived) {
                console.log("Vecchio meme! //TODO");
                throw "Implement"
            } else {
                updateMeme(m)
            }
        }
    });
}

const removeFromDB = async (memeID) => {
    const sql = "DELETE FROM memes WHERE name = ?"
    return database.query(sql, [memeID])
}

const isInInvestment = async (memeID) => {
    const sql = "SELECT COUNT(*) AS Quanti FROM investment WHERE id_meme = ?"
    const result = await database.query(sql, [memeID])
    if(result[0].Quanti === 0) {
        console.log("ELIMINO MEME", memeID);
        await removeFromDB(memeID)
    }
}

const hasValidImage = async (url) => {
    const result = await fetch(url)
    return result.status !== 404
}

const updateMemeByID = async (memeID) => {
    const subreddit = "dankmemes"
    const result = await fetch(`${API_URL}/${subreddit}/api/info.json?id=${memeID}`)
    const json = await result.json()
    if(json.data.children.length === 0) {
        throw new Error("meme non esiste")
    }
    const meme = json.data.children[0].data
    updateMeme(meme)
}

const addMemes = async () => {
    // TODO Metti più subreddit e la possibilità di scegliere hot/new
    const subreddit = "dankmemes"
    // new = High Risk High Reward
    // hot = Lower Risk Lower Gains
    const difficulty = "new"

    const r = await fetch(`${API_URL}/${subreddit}/${difficulty}.json`);
    const json = await r.json()
    json.data.children.forEach(meme => {
        checkIfUnique(meme.data)
    })
}

const updateInvestments = async () => {
    const sql = "SELECT id_meme FROM investment"
    const result = await database.query(sql)
    result.forEach(inv => {
        // AGGIORNO IL MEME CON QUESTO ID
        updateMemeByID(inv.id_meme)
    })
}

const deleteOldMemes = async () => {
    const sql = "SELECT name, created_at, url FROM memes"
    const result = await database.query(sql)
    console.log(result.length);
    result.forEach(async m => {
        const validImg = await hasValidImage(m.url)
        if(!validImg) {
            console.log("INVALID IMAGE", m.id_meme);
            removeFromDB(m.name)
            return
        }

        // Converto in millisecondi
        const dataMeme = m.created_at * 1000
        const deltaMs = Date.now() - dataMeme

        // Divido per quanti millisecondi ci sono in un giorno
        const deltaGiorni = Math.floor(deltaMs / MS_IN_A_DAY)

        if(deltaGiorni > MAX_MEME_AGE) {
            isInInvestment(m.name)
        }
    })
}

// Ogni 30 minuti
var aggiungiMeme = new CronJob('*/30 * * * *', addMemes, null, true, "Europe/Berlin")

// Una volta al giorno alle 8 di mattina
var rimuoviMeme = new CronJob('0 8 * * *', deleteOldMemes, null, true, "Europe/Berlin")

// Ogni 15 minuti
var aggiornaMeme = new CronJob('*/15 * * * *', updateInvestments, null, true, "Europe/Berlin")
