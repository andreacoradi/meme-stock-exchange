import { getMemes, getMeme, getMemeValue } from "../model/memes.js"
import { getUserID, getCoins, setCoins } from "../model/user.js"
import { buyMeme, sellMeme } from "../model/investment.js"

import { getToken, getUsername } from "../helper/utils.js"

export const handlerGetMemes = async (req, res) => {
    try {
        const count = req.query.count
        const page = req.query.page
        const memes = await getMemes(count, page)
        res.send(memes)
    } catch (error) {
        throw error
    }
}

export const handlerGetMeme = async (req, res) => {
    try {
        const memeID = req.params.id
        const meme = await getMeme(memeID)
        if(meme.length !== 0) {
            res.send(meme)
        } else {
            res.status(404)
            res.send({
                "message": "No meme found"
            })
        }
    } catch (error) {
        throw error
    }
}

export const handlerExchangeMeme = async (req, res) => {
    const id = req.params.id
    const token = getToken(req)
    const { action } = req.body
    
    const quantity = Number(req.body.quantity)

    if(!action || !quantity || quantity <= 0 || !token || !Number.isInteger(quantity)) {
        res.status(400)
        res.send({
            "message": "Bad request"
        })
        return
    } 

    try {
        const username = await getUsername(token)
        
        let userID = await getUserID(username)

        if(userID.length === 0) {
            res.send({
                "message": "No user found"
            })
            return
        }
        
        userID = userID[0].id

        let valoreMeme = (await getMemeValue(id))

        if (valoreMeme.length === 0) {
            throw new Error("Meme non trovato")
        }

        valoreMeme = valoreMeme[0].score

        const userCoins = (await getCoins(username))[0].coins
        
        if(action === "buy") {
            if(userCoins < valoreMeme * quantity) {
                throw new Error("Not enough coins")
            }
            await buyMeme(id, valoreMeme, userID, quantity)
            await setCoins(username, userCoins - (valoreMeme * quantity))
        } else if (action === "sell") {
            await sellMeme(id, userID, quantity)
            console.log("Valore investimento", valoreMeme * quantity);
            
            await setCoins(username, userCoins + (valoreMeme * quantity))
        } else {
            throw new Error("Bad request")
        }
        res.send({
            "message": "Successful"
        })
    } catch (error) {
        console.error(error);
        res.statusCode = 400
        res.send({
            "message": error.message
        })
    }
}