import mysql from "promise-mysql"
import dotenv from 'dotenv'
dotenv.config()

const getConnection = async () => {
    return await mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })
    .then(c => {
        console.log("Connessi!");
        return c
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    })
}

export const database = await getConnection()