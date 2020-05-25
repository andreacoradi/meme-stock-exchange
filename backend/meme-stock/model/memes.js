import { database } from "../helper/database.js"

export const getMemes = async (count, page) => {
    if(!count) {
        count = 100
    }
    if(!page) {
        page = 0
    }
    const sql = 
    `SELECT name, title, url, subreddit, score, archived, created_at 
    FROM memes 
    ORDER BY created_at DESC 
    LIMIT ${count}
    OFFSET ${page*count}`
    
    return database.query(sql)
}

export const getMeme = async (memeID) => {
    const sql = 
    `SELECT name, title, url, subreddit, score, archived, created_at 
    FROM memes 
    WHERE name = ?`

    return database.query(sql, [memeID])
}

export const getMemeValue = async (memeID) => {
    let sql = 
    `SELECT score 
    FROM memes 
    WHERE name = ?`
    
    let values = [memeID]
    // TODO prepare sql
    return database.query(sql, values)
}