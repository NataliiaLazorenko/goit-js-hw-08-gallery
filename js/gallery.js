import galleryImages from './gallery-items.js';

const refs = {
  gallery: document.querySelector('ul.js-gallery'),
  lightbox: document.querySelector('div.js-lightbox'),
  lightboxOverley: document.querySelector('div.lightbox__overlay'),
  lightboxBtn: document.querySelector('button[data-action="close-lightbox"]'),
  largeImage: document.querySelector('img.lightbox__image'),
};

// Створення і рендер розмітки по масиву даних
let index = 0;
let activeIndex; // індекс поточного елемента

const createGalleryItem = image => {
  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery__item');

  const galleryLink = document.createElement('a');
  galleryLink.classList.add('gallery__link');
  galleryLink.href = image.original;
  galleryItem.append(galleryLink);

  const galleryImage = document.createElement('img');
  galleryImage.classList.add('gallery__image');
  galleryImage.src = image.preview;
  galleryImage.alt = image.description;
  galleryImage.dataset.source = image.original;
  galleryImage.dataset.index = index;
  index += 1;
  galleryLink.append(galleryImage);

  return galleryItem;
};

const galleryItems = galleryImages.map(image => createGalleryItem(image));
refs.gallery.append(...galleryItems);

// Реалізація делегування на галереї ul.js-gallery і отримання url великого зображення
refs.gallery.addEventListener('click', event => {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  openLightbox();

  const largeImageUrl = event.target.dataset.source;
  setLargeImageSrc(largeImageUrl);

  activeIndex = event.target.dataset.index;
});

// Відкриття модального вікна
const openLightbox = () => {
  refs.lightbox.classList.add('is-open');
};

// Підміна значення атрибута src елемента img.lightbox__image
const setLargeImageSrc = url => {
  refs.largeImage.src = url;
};

// Закривання модального вікна
const closeLightbox = () => {
  refs.lightbox.classList.remove('is-open');

  // Очищення значення атрибута src елемента img.lightbox__image.
  // Щоб при наступному відкритті модального вікна, поки вантажиться зображення, не бачили попереднє
  refs.largeImage.src = '';
};

// Закривання модального вікна при натисканні на кнопку button[data-action="close-modal"]
refs.lightboxBtn.addEventListener('click', closeLightbox);

// Закривання модального вікна при натисканні на div.lightbox__overlay
refs.lightboxOverley.addEventListener('click', closeLightbox);

// Закриття модального вікна після натискання клавіші ESC
// Перегортування зображень галереї у відкритому модальному вікні клавішами "вліво" і "вправо"
