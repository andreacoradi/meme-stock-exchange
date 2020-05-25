// axios bad, fetch gud

const { REACT_APP_DBURI } = process.env
const userToken = localStorage.getItem('token') //  || REACT_APP_DEVTOKEN
let memesArray = []
let ranked = []
let ownedArray = []

//  I hope somebody is gonna actually use this class ffs
//  All I need to do is to re-write this but using fetch
//  instead of axios

const fetchMarket = async (count) => {
  const URL = `${REACT_APP_DBURI}/memes?count=${count}`
  await fetch(URL, {
    method: 'GET',
    headers: {
      authorization: 'Bearer ' + userToken,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      memesArray = data
    })
}

//todo
const fetchOwned = async () => {
  ownedArray = []
  // todo
}

const fetchRanking = async (count) => {
  ranked = []
  // todo
}

export async function Fetcher(type, count) {
  // type: "market"
  // type: "user_owned"
  // type: "ranking"

  // console.log(type, count)

  switch (type) {
    case 'market':
      try {
        await fetchMarket(count)
        return memesArray
      } catch (error) {
        console.log(error)
      }
      break
    case 'user_owned':
      try {
        await fetchOwned()
        return ownedArray
      } catch (error) {
        console.log(error)
      }
      break
    case 'ranking':
      try {
        await fetchRanking(count)
        return ranked
      } catch (error) {
        console.log(error)
      }
      break
    default:
      break
  }
}
