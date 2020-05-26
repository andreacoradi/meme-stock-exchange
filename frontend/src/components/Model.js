import { Fetcher } from './Fetcher'
import { action } from 'easy-peasy'

export default {
  coinCount: 0,
  update: action(async (state) => {
    return await Fetcher('coins')
  }),
}
