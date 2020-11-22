import galleryImages from './gallery-items.js';

const refs = {
  gallery: document.querySelector('ul.js-gallery'),
  lightbox: document.querySelector('div.js-lightbox'),
  lightboxOverley: document.querySelector('div.lightbox__overlay'),
  lightboxBtn: document.querySelector('button[data-action="close-lightbox"]'),
  largeImage: document.querySelector('img.lightbox__image'),
};

let index = 0;
let activeIndex; // індекс поточного елемента

// Створення розмітки
const galleryItems = galleryImages.map(image => createGalleryItem(image));
refs.gallery.append(...galleryItems);

function createGalleryItem(image) {
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
}

refs.gallery.addEventListener('click', onGalleryClick);
refs.lightboxBtn.addEventListener('click', onModalClose); // Закривання модального вікна при натисканні на кнопку
refs.lightboxOverley.addEventListener('click', onModalClose); // Закривання модального вікна при натисканні на оверлей

function onGalleryClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  openModal();

  activeIndex = event.target.dataset.index;
  const largeImageUrl = event.target.dataset.source;
  setLargeImageSrc(largeImageUrl);
}

// Відкривання модального вікна
function openModal() {
  window.addEventListener('keydown', onKeyPress);
  refs.lightbox.classList.add('is-open');
}

function onKeyPress(event) {
  // Закривання модального вікна клавішею Escape
  if (event.code === 'Escape') {
    onModalClose();
  } else if (event.code === 'ArrowRight') {
    switchNextImage();
  } else if (event.code === 'ArrowLeft') {
    switchPreviousImage();
  }
}

// Підміна значення атрибута src елемента img.lightbox__image
function setLargeImageSrc(url) {
  refs.largeImage.src = url;
}

// Перегортування зображень вперед
function switchNextImage() {
  if (activeIndex === galleryImages.length - 1) {
    return;
  }

  activeIndex = Number(activeIndex) + 1;
  refs.largeImage.src = galleryImages[activeIndex].original;
}

// Перегортування зображень назад
function switchPreviousImage() {
  if (activeIndex === 0) {
    return;
  }

  activeIndex = Number(activeIndex) - 1;
  refs.largeImage.src = galleryImages[activeIndex].original;
}

// Закривання модального вікна
function onModalClose() {
  window.removeEventListener('keydown', onKeyPress);
  refs.lightbox.classList.remove('is-open');
  refs.largeImage.src = ''; // Очищення атрибута src, щоб при наступному відкритті модального вікна не бачили попереднє зображення
}
