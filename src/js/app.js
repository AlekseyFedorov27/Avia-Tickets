import '../css/style.css';
import './plugins';
import locations from './store/locations';
import favoriteTickets from './store/favoriteTickets';
import favoriteUI from './views/favorite';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';


document.addEventListener('DOMContentLoaded', e => {
  const form = formUI.form;
  const favoriteBtn = document.getElementById('favorites');

  //add favorite
  ticketsUI.container.addEventListener('click', (e)=>{
    if(e.target.classList.contains('add-favorite')){
      //ищем по id нужный билет и записываем в избранные
      const favTicket = locations.lastSearch.filter( item => item.id_ticket == e.target.dataset.userFavotite);
      console.log(favTicket)
      favoriteTickets.setFavorite(...favTicket);
    }
  })

  //delete favorite
  favoriteUI.containerFavorite.addEventListener('click', (e)=>{
    if(e.target.classList.contains('delete-favorite')){
      let item = e.target.dataset.userDelete;
      console.log(e.target.dataset.userDelete);
      favoriteTickets.deleteFavorite(item)
    }
  })

  //show favorite 
  favoriteBtn.addEventListener('click', () => {
    favoriteTickets.getFavorite()
  });

  // Events
  initApp();
  form.addEventListener('submit', e => {
    e.preventDefault();
    onFormSubmit();
  });

  // handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currecyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);
    console.log(locations.lastSearch);


  }
});

// *1 - создать отдельный метод для получения airlines
// *2 - в init добавить получение airlines
// *3 - serializeAirlines
// *4 - serializeTickets и переделать serializeCities и createShortCities и getCityCodeByKey
// *5 - новые методы getAirlineNameByCode, getAirlineLogoByCode, getCityNameByCode
// *6 - TicketsUI
