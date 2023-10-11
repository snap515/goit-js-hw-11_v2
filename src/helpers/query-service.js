import axios from 'axios';

const API_KEY = '39808878-d17211b11e4a3c923ce198349';
const BASE_URL = `https://pixabay.com/api/`;

export default class QueryService {
  constructor() {
    this.searchQuery = '';
    this.currentPage = 1;
  }

  fetchImages() {
    const params = {
      key: API_KEY,
      per_page: 40,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    };

    return axios
      .get(`${BASE_URL}?page=${this.currentPage}&q=${this.searchQuery}`, {
        params,
      })
      .then(response => {
        this.incrementPage();
        console.log(response.data);

        return response.data;
      })
      .catch(error => console.log(error));
  }

  resetPageCounter() {
    this.currentPage = 1;
  }

  incrementPage() {
    this.currentPage += 1;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get query() {
    return this.searchQuery;
  }

  set page(newPage) {
    this.currentPage = newPage;
  }

  get page() {
    return this.currentPage;
  }
}
