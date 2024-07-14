import { images } from './images.js';

const galleryRef = document.querySelector('.gallery');

galleryRef.innerHTML = images.map(getGalleryItemMarkup).join('');

galleryRef.addEventListener('click', e => {
  e.preventDefault();

  const { target } = e;

  if (!target.classList.contains('gallery-image')) return;

  const largeImgUrl = target.dataset.source;

  onOpenModal(largeImgUrl);
});

function getGalleryItemMarkup({ preview, original, description }) {
  return `
        <li class="gallery-item">
            <a class="gallery-link" href="${original}">
                <img
                  class="gallery-image"
                  src="${preview}"
                  data-source="${original}"
                  alt="${description}"
                />
            </a>
        </li>
    `;
}

function onOpenModal(link) {
  const instance = basicLightbox.create(
    `
    <img src="${link}" width="800" height="600" />
    `,
    {
      handler: null,
      onShow() {
        this.handler = onCloseModal.bind(instance);
        window.addEventListener('keydown', this.handler);
      },
      onClose() {
        window.removeEventListener('keydown', this.handler);
      },
    }
  );

  instance.show();
}

function onCloseModal(e) {
  if (e.code === 'Escape') {
    this.close();
  }
}
