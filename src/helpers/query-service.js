import axios from 'axios';

export default class QueryService {
  constructor() {
    this.URL = `https://pixabay.com/api/`;
    this.key = '39808878-d17211b11e4a3c923ce198349';
    this.searchQuery = '';
    this.currentPage = 1;
    this.per_page = 40;
    this.watchedImages = 0;
  }

  fetchImages() {
    const params = {
      key: this.key,
      per_page: this.per_page,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    };
    return axios
      .get(`${this.URL}?page=${this.currentPage}&q=${this.searchQuery}`, {
        params,
      })
      .then(response => {
        this.incrementPage();
        console.log(response);
        return response.data;
      });
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
