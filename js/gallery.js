'use strict';

(function () {
  var PHOTOS_NUMBER = 25;

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var userPictures = document.querySelector('.pictures');

  // отрисовка фотографии по шаблону
  function renderPhoto(photo) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__img').alt = photo.description;

    return pictureElement;
  }

  // добавление фотографий пользователей на страницу
  function renderUserPictures(photos) {
    var fragment = document.createDocumentFragment();

    photos.forEach(function (photo) {
      fragment.appendChild(renderPhoto(photo));
    });

    userPictures.appendChild(fragment);
  }

  renderUserPictures(window.createPhotosObjectsArray(PHOTOS_NUMBER));
})();

