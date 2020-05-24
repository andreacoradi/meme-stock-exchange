// const UserToken = localStorage.getItem('token')

class Exchange {
  // action = "buy" || "sell"
  static transaction(action, memeID, count) {
    switch (action) {
      case 'buy':
        this._buy(memeID, count)
        break

      case 'sell':
        this._sell(memeID, count)
        break

      default:
        return false
    }
  }

  //    JS is a wonderful language but as of now,
  //    ES6 does not allow private methods in classes.
  //    Let's enjoy this fuzzy "underscore" naming of
  //    said methods. If you're a dev, pls, don't use such
  //    methods if you notice an underscore somewhere :D
  //    Have a nice day lads

  _buy(memeID, count) {
    // gonna read docs
  }
  _sell(memeID, count) {
    // gonna read docs
  }
}

export default Exchange
