import { getToken, getUsername } from "../helper/utils.js"
import { getUsers, getUser, getUserID } from "../model/user.js"
import { getPortfolio } from "../model/investment.js"

export const handlerGetUserPortfolio = async(req, res) => {
    const username = req.params.username
    const token = getToken(req)
    const tokenUsername = await getUsername(token)
    if(username !== tokenUsername) {
        res.status(400)
        res.send({
            "message": "Token does not match"
        })
        return
    }

    try {
        const userID = (await getUserID(username))[0].id
        const portfolio = await getPortfolio(userID)
        res.send({
            "data" : portfolio
        })
    } catch (error) {
        throw error
    }
}

export const handlerGetUsers = async (req, res) => {
    try {
        const count = req.query.count
        const users = await getUsers(count)
        res.send(users)
    } catch (error) {
        throw error
    }
}

export const handlerGetUser = async (req, res) => {
    try {
        const username = req.params.username
        const user = await getUser(username)
        res.send(user)
    } catch (error) {
        throw error
    }
}