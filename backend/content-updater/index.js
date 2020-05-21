const fetch = require('node-fetch');
var mysql = require('mysql');
var CronJob = require('cron').CronJob;
require('dotenv').config()

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});



let memes = []


const insertMeme = (m) => {
    const sql = "INSERT INTO memes (name, title, url, score, subreddit, archived, created_at) VALUES (?)";

    const values = [m.name, m.title, m.url, m.score, m.subreddit, m.archived, m.created_utc]
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("inserisco", m.name);
        console.log("Number of records inserted: " + result.affectedRows);
    });
}

const updateMeme = (m) => {
    const sql = "UPDATE memes SET score = ?, archived = ? WHERE name = ?";
    const values = [m.score, m.archived, m.name]
    con.query(sql, values, function (error, results, fields) {
        if(error) throw error
        // console.log("Result: ", results);
        console.log("Updated", m.name);
    })
}

const checkIfUnique = (m) => {
    const sql = "SELECT COUNT(*) as Quanti FROM memes WHERE name = ?"

    con.query(sql, m.name, function (err, result) {
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

// TODO Metti più subreddit e la possibilità di scegliere hot/new

const getMemes = async () => {
    const r = await fetch("https://www.reddit.com/r/dankmemes/new.json");
    "https://www.reddit.com/r/dankmemes/api/info.json?id=t3_gnu57v"
    const json = await r.json()
    memes = json.data.children
    // console.log(memes);
    memes.forEach(m => {
        checkIfUnique(m.data)
    })
}

// Ogni 30 minuti
// '0 0/30 * 1/1 * ? *'
// Ogni 15 minuti
// */15 * * * *
// Ogni ora
// 0 * * * *
var aggiungiMeme = new CronJob('*/30 * * * *', getMemes, null, true, "Europe/Berlin")

//getMemes()

aggiungiMeme.start();

