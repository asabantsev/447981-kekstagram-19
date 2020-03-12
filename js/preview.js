'use strict';

(function () {
  // добавление большой фотографии на страницу
  var pictureBig = document.querySelector('.big-picture');
  var commentsContainer = pictureBig.querySelector('.social__comments');
  var pictureBigCancel = pictureBig.querySelector('.big-picture__cancel');

  // создаем шаблон комментария
  var createCommentTemplate = function (container) {
    container.insertAdjacentHTML('afterbegin',
        '<li class="social__comment">' +
          '<img class="social__picture" width="35" height="35">' +
          '<p class="social__text"></p>' +
        '</li>'
    );
  };

  // удаление комментариев
  var removeComments = function () {
    var commentsDefault = commentsContainer.querySelectorAll('.social__comment');

    commentsDefault.forEach(function (comment) {
      commentsContainer.removeChild(comment);
    });
  };

  // изменение большой фотографии
  var renderPictureBig = function (photos) {
    pictureBig.classList.remove('hidden');

    pictureBig.querySelector('.social__comment-count').classList.add('hidden');
    pictureBig.querySelector('.comments-loader').classList.add('hidden');

    pictureBig.querySelector('.big-picture__img').querySelector('img').src = photos.url;
    pictureBig.querySelector('.likes-count').textContent = photos.likes;
    pictureBig.querySelector('.comments-count').textContent = photos.comments.length;
    pictureBig.querySelector('.social__caption').textContent = photos.description;

    removeComments();

    for (var i = 0; i < photos.comments.length; i++) {
      createCommentTemplate(commentsContainer);

      commentsContainer.querySelector('.social__comment').querySelector('img').src = photos.comments[i].avatar;
      commentsContainer.querySelector('.social__comment').querySelector('img').alt = photos.comments[i].name;
      commentsContainer.querySelector('.social__text').textContent = photos.comments[i].message;
    }

    document.addEventListener('keydown', window.form.onPreviewEscPress);
  };

  var closePictureBig = function () {
    pictureBig.classList.add('hidden');
    document.removeEventListener('keydown', window.form.onPreviewEscPress);
  };

  pictureBigCancel.addEventListener('click', closePictureBig);

  window.preview = {
    renderPictureBig: renderPictureBig
  };

})();
