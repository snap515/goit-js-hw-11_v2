import QueryService from './helpers/query-service';
import {
  makeMarkup,
  notifyNoMatches,
  notifyQuantityOfMatches,
  notifyEmptyQuery,
  smoothScroll,
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

async function onSearch(e) {
  e.preventDefault();
  queryService.searchQuery = e.currentTarget.elements.searchQuery.value;
  if (queryService.searchQuery.trim() === '') {
    notifyEmptyQuery();
    return;
  }
  clearContent();

  queryService.resetPageCounter();

  hideLoadmoreBtn();

  try {
    const images = await queryService.fetchImages();
    console.log(images);
    if (images.hits.length !== 0) {
      notifyQuantityOfMatches(images.total);
      appendMarkup(images.hits);
      queryService.galleryEl = new simpleLightbox('.gallery a', {
        captions: true,
        captionsData: 'alt',
        captionDelay: 250,
      });
      showLoadmoreBtn();
    } else {
      notifyNoMatches();
    }
  } catch (err) {
    console.log(err);
  }
}

async function onLoadMore() {
  try {
    const images = await queryService.fetchImages();
    appendMarkup(images.hits);
    queryService.galleryEl.refresh();
    smoothScroll();
  } catch (err) {
    console.log(err);
  }
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
