import { database } from "../helper/database.js"

export const getCoins = async (username) => {
    const sql = "SELECT coins FROM user WHERE username = ?"
    return database.query(sql, username)
}

export const setCoins = async (username, coins) => {
    const sql = "UPDATE user SET coins = ? WHERE username = ?"
    return database.query(sql, [coins, username])
}

export const getUserID = async (username) => {
    const sql = "SELECT id FROM user WHERE username = ?"
    return database.query(sql, [username])
}

export const createNewUser = async (username) => {
    console.log("CREO NUOVO USER", username);
    sql = "INSERT INTO user (username) VALUES (?)"
    return database.query(sql, [username])
}

export const getUsers = async (count) => {
    if(!count) {
        count = 100
    }
    const sql = `SELECT username, coins FROM user ORDER BY coins DESC LIMIT ${count}`
    return database.query(sql)
}

export const getUser = async (username) => {
    const sql = "SELECT username, coins FROM user WHERE username = ?"
    return database.query(sql, [username])
}