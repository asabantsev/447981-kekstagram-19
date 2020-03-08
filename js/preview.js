'use strict';

(function () {
  var PHOTOS_NUMBER = 25;

  // добавление большой фотографии на страницу
  var pictureBig = document.querySelector('.big-picture');
  var commentsContainer = pictureBig.querySelector('.social__comments');
  var commentsDefault = commentsContainer.querySelectorAll('.social__comment');

  // создаем шаблон комментария
  function createCommentTemplate(container) {
    container.insertAdjacentHTML('afterbegin',
        '<li class="social__comment">' +
          '<img class="social__picture" width="35" height="35">' +
          '<p class="social__text"></p>' +
        '</li>'
    );
  }

  // изменение большой фотографии
  function renderPictureBig(photos) {
    pictureBig.querySelector('.big-picture__img').querySelector('img').src = photos[0].url;
    pictureBig.querySelector('.likes-count').textContent = photos[0].likes;
    pictureBig.querySelector('.comments-count').textContent = photos[0].comments.length;
    pictureBig.querySelector('.social__caption').textContent = photos[0].description;

    commentsDefault.forEach(function (comment) {
      commentsContainer.removeChild(comment);
    });

    for (var i = 0; i < photos[0].comments.length; i++) {
      createCommentTemplate(commentsContainer);

      commentsContainer.querySelector('.social__comment').querySelector('img').src = photos[0].comments[i].avatar;
      commentsContainer.querySelector('.social__comment').querySelector('img').alt = photos[0].comments[i].name;
      commentsContainer.querySelector('.social__text').textContent = photos[0].comments[i].message;
    }
  }

  pictureBig.querySelector('.social__comment-count').classList.add('hidden');
  pictureBig.querySelector('.comments-loader').classList.add('hidden');

  renderPictureBig(window.data.createPhotosObjectsArray(PHOTOS_NUMBER));

})();
