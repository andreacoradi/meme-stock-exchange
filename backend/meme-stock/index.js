const express = require("express")
const mysql = require("mysql")
require('dotenv').config()


const app = express()

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

// FIX: Se uso la funzione non ritorna il risultato
const getMemes = async () => {
    let sql = "SELECT * FROM memes"
    let memes
    con.query(sql, (err, result) => {
        // console.log(result);
        if(err) throw err
        
    })
    console.log("Memes: ", memes);
} 

app.get("/api/v1/memes", async (req, res) => {
    let sql = "SELECT name, title, url, subreddit, score FROM memes"
    
    con.query(sql, (err, result) => {
        // console.log(result);
        if(err) throw err
        
        res.send(result)
    })
})

app.listen(1337)