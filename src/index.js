import QueryService from './query-service';
import {
  makeMarkup,
  notifyNoMatches,
  notifyQuantityOfMatches,
} from './helpers/helpers';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const queryService = new QueryService();
const refs = {
  queryForm: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};

refs.queryForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  queryService.searchQuery = e.currentTarget.elements.searchQuery.value;
  clearContent();
  queryService.resetPageCounter();
  hideLoadmoreBtn();
  queryService.fetchImages().then(data => {
    if (data.hits.length !== 0) {
      notifyQuantityOfMatches(data.total);
      appendMarkup(data.hits);
      queryService.galleryEl = new simpleLightbox('.gallery a');
      showLoadmoreBtn();
    } else {
      notifyNoMatches();
    }
  });
  console.log(queryService);
}

function onLoadMore() {
  queryService.fetchImages().then(data => {
    appendMarkup(data.hits);
    queryService.galleryEl.refresh();
  });
}

function appendMarkup(data) {
  refs.gallery.insertAdjacentHTML('beforeend', makeMarkup(data));
}

function clearContent() {
  refs.gallery.innerHTML = '';
}
function showLoadmoreBtn() {
  refs.loadMoreBtn.classList.remove('visually-hidden');
}

function hideLoadmoreBtn() {
  if (refs.loadMoreBtn.classList.contains('visually-hidden')) {
    return;
  }
  refs.loadMoreBtn.classList.add('visually-hidden');
}
