const fetch = require('node-fetch');
const mysql = require("promise-mysql")
const CronJob = require('cron').CronJob;
require('dotenv').config()

// Millisecondi in un giorno
const MS_IN_A_DAY = 1000 * 60 * 60 * 24
// Dopo quanti giorni un meme senza investimenti viene eliminato
const MAX_MEME_AGE = 5

const API_URL = "https://www.reddit.com"

let database

mysql.createPool({
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

    // addMemes()
    // updateInvestments()
    deleteOldMemes()
}).catch(err => {
    console.error(err)
    process.exit(1)
})

const insertMeme = (m) => {
    const sql = "INSERT INTO memes (name, title, url, score, subreddit, archived, created_at) VALUES (?)";

    const values = [m.name, m.title, m.url, m.score, m.subreddit, m.archived, m.created_utc]

    database.query(sql, [values])
        .then(result => {
            console.log("Inserisco meme", m.name);
        })
        .catch(err => {
            if (err.code === "ER_DUP_ENTRY") {
                updateMeme(m)
                return
            }
            console.error(err);
        })
}

const updateMeme = (m) => {
    const sql = "UPDATE memes SET score = ?, archived = ? WHERE name = ?";
    const values = [m.score, m.archived, m.name]
    database.query(sql, values, function (error, results, fields) {
        if (error) throw error
        console.log("Updated", m.name);
    })
}

// const checkIfUnique = (m) => {
//     const sql = "SELECT COUNT(*) as Quanti FROM memes WHERE name = ?"

//     database.query(sql, [m.name])
//     .then(result => {
//         if(result[0].Quanti === 0) {
//             insertMeme(m)
//         } else {
//             console.log(m.name + " è gia presente");
//             if(m.archived) {
//                 console.log("Vecchio meme! //TODO");
//                 throw "Implement"
//             } else {
//                 updateMeme(m)
//             }
//         }
//     })
//     .catch(err => {
//         console.error(err)
//     })
// }

const removeFromDB = async (memeID) => {
    console.log("RIMUOVO DAL DB", memeID);
    const sql = "DELETE FROM memes WHERE name = ?"
    return database.query(sql, [memeID])
}

const removeFromInvestment = async (memeID) => {
    // Metto coin investiti a 0 o elimino il meme??
    // const sql = "UPDATE investment SET coin_investiti = ? WHERE id_meme = ?"
    console.log("RIMUOVO DA INVESTIMENTI", memeID);
    const sql = "DELETE FROM investment WHERE id_meme = ?"
    return database.query(sql, [memeID])
}

const isInInvestment = async (memeID) => {
    const sql = "SELECT COUNT(*) AS Quanti FROM investment WHERE id_meme = ?"
    const result = await database.query(sql, [memeID])
    if (result[0].Quanti === 0) {
        console.log("ELIMINO MEME", memeID);
        await removeFromDB(memeID)
    }
}

const hasValidImage = async (url) => {
    const result = await fetch(url)
    return result.status < 400
}

const updateMemeByID = async (memeID) => {
    try {
        const result = await fetch(`${API_URL}/api/info.json?id=${memeID}`)
        const json = await result.json()
        // console.log(json);
        if (json.data.dist.length === 0) {
            console.log("Meme non esiste", memeID);
            await removeFromDB(memeID)
            await removeFromInvestment(memeID)
            //throw new Error("meme non esiste")
            return
        }
        const meme = json.data.children[0].data
        updateMeme(meme)
    } catch (error) {
        console.error("update by id", error.code);
    }
}

const addMemes = async () => {
    // TODO Metti più subreddit e la possibilità di scegliere hot/new
    const subreddit = "dankmemes"
    // new = High Risk High Reward
    // hot = Lower Risk Lower Gains
    const difficulty = "new"
    try {
        const r = await fetch(`${API_URL}/r/${subreddit}/${difficulty}.json`);
        const json = await r.json()
        json.data.children.forEach(meme => {
            // checkIfUnique(meme.data)
            insertMeme(meme.data)
        })
    } catch (error) {
        console.error("add memes", error.code)
    }
}

const updateInvestments = async () => {
    const sql = "SELECT id_meme FROM investment"
    const result = await database.query(sql)
    if (result.length === 0)
        return

    result.forEach(inv => {
        // AGGIORNO IL MEME CON QUESTO ID
        updateMemeByID(inv.id_meme)
    })
}

const deleteOldMemes = async () => {
    const sql = "SELECT name, created_at, url FROM memes"
    const result = await database.query(sql)
    console.log(result.length);
    for (let i = 0; i < result.length; i++) {
        const m = result[i]

        let validImg
        try {
            validImg = await hasValidImage(m.url)
        } catch (error) {
            console.error(error.code)
            if (error.code === "ETIMEDOUT") {
                console.log("esco e basta aggiornare");
                return
            }
        }

        if (!validImg) {
            console.log("INVALID IMAGE", m.name);
            removeFromDB(m.name)
            removeFromInvestment(m.name)
            continue
        }

        // Converto in millisecondi
        const dataMeme = m.created_at * 1000
        const deltaMs = Date.now() - dataMeme

        // Divido per quanti millisecondi ci sono in un giorno
        const deltaGiorni = Math.floor(deltaMs / MS_IN_A_DAY)

        if (deltaGiorni > MAX_MEME_AGE) {
            console.log("TOO OLD");
            isInInvestment(m.name)
        }
    }
}

// Ogni 30 minuti
var aggiungiMeme = new CronJob('*/30 * * * *', addMemes, null, true, "Europe/Berlin")

// Ogni ora
var rimuoviMeme = new CronJob('*/30 * * * *', deleteOldMemes, null, true, "Europe/Berlin")

// Ogni 15 minuti
var aggiornaMeme = new CronJob('*/5 * * * *', updateInvestments, null, true, "Europe/Berlin")
