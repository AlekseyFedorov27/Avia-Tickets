import currencyUI from '../views/currency';
import favoriteUI from '../views/favorite';

class FavoriteTikets {
  constructor(currency) {
    this.favorite = {};
  }

  getFavorite() {
    favoriteUI.getFavorite(this.favorite)
  }

  deleteFavorite(item){
    delete this.favorite[item];
    favoriteUI.clearContainer();
    this.getFavorite();
  }

  setFavorite(item) {
    let key = item.departure_at;
    let obj = {};
    obj[key] = item;
    Object.assign(this.favorite, obj);
    this.getFavorite();
  }
}

const favoriteTickets = new FavoriteTikets(currencyUI);

export default favoriteTickets;
