import Notiflix from 'notiflix';

export function makeMarkup(data) {
  return data.reduce((acc, element) => {
    return (
      acc +
      `<a href="${element.largeImageURL}">
      <div class="photo-card">
          <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
        
        <div class="info">
          <p class="info-item">
            <b>Likes ${element.likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${element.views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${element.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${element.downloads}</b>
          </p>
        </div>
      </div>
      </a>`
    );
  }, '');
}

export function notifyNoMatches() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

export function notifyQuantityOfMatches(totaHits) {
  Notiflix.Notify.success(`Hooray! We found ${totaHits} images.`);
}

export function notifyEmptyQuery() {
  Notiflix.Notify.warning('Please, enter your request ');
}
