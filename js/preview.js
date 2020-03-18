'use strict';

(function () {

  var body = document.querySelector('body');
  var pictureBig = document.querySelector('.big-picture');
  var pictureBigCancel = pictureBig.querySelector('.big-picture__cancel');
  var commentsLoader = pictureBig.querySelector('.comments-loader');

  var renderPictureBig = function (photos) {
    pictureBig.classList.remove('hidden');
    body.classList.add('modal-open');

    pictureBig.querySelector('.big-picture__img').querySelector('img').src = photos.url;
    pictureBig.querySelector('.likes-count').textContent = photos.likes;
    pictureBig.querySelector('.comments-count').textContent = photos.comments.length;
    pictureBig.querySelector('.social__caption').textContent = photos.description;

    window.comments.remove();
    window.comments.renderList(photos);

    commentsLoader.addEventListener('click', window.comments.onLoaderClick);

    document.addEventListener('keydown', onPictureBigEscPress);
  };

  var closePictureBig = function () {
    pictureBig.classList.add('hidden');
    body.classList.remove('modal-open');

    document.removeEventListener('keydown', onPictureBigEscPress);
    commentsLoader.removeEventListener('click', window.comments.onLoaderClick);
  };

  var onPictureBigEscPress = function (evt) {
    window.util.isEscEvent(evt, closePictureBig);
  };

  var onPictureBigCancelEnterPress = function (evt) {
    window.util.isEnterEvent(evt, closePictureBig);
  };

  pictureBigCancel.addEventListener('click', closePictureBig);
  pictureBigCancel.addEventListener('keydown', onPictureBigCancelEnterPress);

  window.preview = {
    renderPictureBig: renderPictureBig
  };

})();
