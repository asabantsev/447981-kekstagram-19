'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var userPictures = document.querySelector('.pictures');

  // отрисовка фотографии по шаблону
  var renderPhoto = function (photo) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.addEventListener('click', function () {
      onPictureClick(photo);
    });

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__img').alt = photo.description;

    return pictureElement;
  };

  var onPictureClick = function (photos) {
    window.preview.renderPictureBig(photos);
  };

  var successHandler = function (photos) {
    var fragment = document.createDocumentFragment();

    photos.forEach(function (photo) {
      fragment.appendChild(renderPhoto(photo));
    });

    userPictures.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '10px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);
})();

