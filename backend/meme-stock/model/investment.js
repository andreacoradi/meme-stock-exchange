import { database } from "../helper/database.js"

export const buyMeme = async (memeID, valoreMeme, userID, quantita) => {
    try {
        let sql = 
        `SELECT COUNT(*) AS Quanti, quantita, coin_investiti 
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

export const sellMeme = async (memeID, userID, quantita) => {
    let sql = 
    `SELECT quantita 
    FROM investment 
    WHERE id_meme = ? 
    AND id_utente = ?`

    console.log(memeID, userID);
    return database.query(sql, [memeID, userID])
    .then(result => {
        if(result.length === 0) {
            throw new Error("non hai azioni di questo meme")
        }
        const q = result[0].quantita
        let values = []
        if(quantita > q) {
            throw new Error("non hai abbastanza azioni")
        } else if (q == quantita) {
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
            SET quantita = ? 
            WHERE id_meme = ? 
            AND id_utente = ?`

            values = [q-quantita,memeID, userID]
        }
        database.query(sql, values)
    })
}

export const getPortfolio = async (userID) => {
    try{
        const sql =
        `SELECT quantita, name, coin_investiti, data_acquisto, title, url, score, subreddit
        FROM investment, memes 
        WHERE investment.id_meme = memes.name AND id_utente = ?`
        
        return database.query(sql,[userID])
    } catch (error) {
        console.log("OOPS");
        throw error
    }
}