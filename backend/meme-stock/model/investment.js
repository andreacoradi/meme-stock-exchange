import { database } from "../helper/database.js"

export const buyMeme = async (memeID, valoreMeme, userID, quantita) => {
    try {
        let sql = 
        `SELECT COUNT(id_meme) AS Quanti, quantita, coin_investiti 
        FROM investment 
        WHERE id_meme = ? 
        AND id_utente = ?`

        const result = (await database.query(sql, [memeID, userID]))[0]
        if(result.Quanti === 0) {
            sql = 
            `INSERT INTO investment (
                id_meme, 
                id_utente, 
                quantita, 
                coin_investiti
            ) 
            VALUES (?, ?, ?, ?)`
            const values = [memeID, userID, quantita, valoreMeme*quantita]
            return database.query(sql, values)
        } else {
            sql = 
            `UPDATE investment 
            SET quantita = ?, coin_investiti = ? 
            WHERE id_meme = ? 
            AND id_utente = ?`

            return database.query(sql, [result.quantita + quantita, result.coin_investiti + (valoreMeme*quantita) ,memeID, userID])
        }
    } catch (error) {
        console.error(error);
    }
}

export const sellMeme = async (memeID, valoreMeme, userID, quantita) => {
    let sql = 
    `SELECT quantita, coin_investiti
    FROM investment 
    WHERE id_meme = ? 
    AND id_utente = ?`

    console.log(memeID, userID);
    return database.query(sql, [memeID, userID])
    .then(result => {
        if(result.length === 0) {
            throw new Error("Non hai azioni di questo meme")
        }
        const quantita_azioni = result[0].quantita
        const coin_investiti = result[0].coin_investiti
        let values = []
        if(quantita > quantita_azioni) {
            throw new Error("Non hai abbastanza azioni")
        } else if (quantita_azioni == quantita) {
            // Se vendo tutto cancello
            sql = 
            `DELETE FROM investment 
            WHERE id_meme = ? 
            AND id_utente = ?`

            values = [memeID, userID]
        } else {
            // Vado a sottrarre la quantita
            sql = 
            `UPDATE investment 
            SET quantita = ?,
            coin_investiti = ? 
            WHERE id_meme = ? 
            AND id_utente = ?`

            values = [quantita_azioni - quantita, coin_investiti - valoreMeme, memeID, userID]
        }
        database.query(sql, values)
    })
}

export const getPortfolio = async (userID) => {
    try{
        const sql =
        `SELECT quantita, name, coin_investiti, data_acquisto, title, url, score, subreddit
        FROM investment, memes 
        WHERE investment.id_meme = memes.name 
        AND id_utente = ?`
        
        return database.query(sql,[userID])
    } catch (error) {
        console.log("OOPS");
        throw error
    }
}