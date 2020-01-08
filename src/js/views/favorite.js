import currencyUI from './currency';

class FavoriteUI {
  constructor(currency) {
    this.containerFavorite = document.getElementById('dropdown1');
    this.currencySymbol = currency.currencySymbol;
  }

  getFavorite(tickets) {
    this.clearContainer();
    let fragment = '';
    for( let ticket in tickets){
      const template = this.templateFavorite(tickets[ticket], this.currencySymbol);
      fragment += template;
    }
    this.containerFavorite.insertAdjacentHTML('afterbegin', fragment);
  }

  clearContainer() {
    this.containerFavorite.innerHTML = '';
  }

   templateFavorite(ticket, currency){
    return `<div class="favorite-item  d-flex align-items-start">
            <img
              src="${ticket.airline_logo}"
              class="favorite-item-airline-img"/>
            <div class="favorite-item-info d-flex flex-column">
              <div
                class="favorite-item-destination d-flex align-items-center">
                <div class="d-flex align-items-center mr-auto">
                  <span class="favorite-item-city">${ticket.origin_name}</span>
                  <i class="medium material-icons">flight_takeoff</i>
                </div>
                <div class="d-flex align-items-center">
                  <i class="medium material-icons">flight_land</i>
                  <span class="favorite-item-city">${ticket.destination_name}</span>
                </div>
              </div>
              <div class="ticket-time-price d-flex align-items-center">
                <span class="ticket-time-departure">${ticket.departure_at}</span>
                <span class="ticket-price ml-auto">${currency} ${ticket.price}</span>
              </div>
              <div class="ticket-additional-info">
                <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
                <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
              </div>
              <a data-user-delete='${ticket.departure_at}'
                class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
                >Delete</a>
            </div>
          </div>`
  }
}

const favoriteUI = new FavoriteUI(currencyUI);

export default favoriteUI;
