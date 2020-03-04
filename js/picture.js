'use strict';

(function () {
  var pictureBig = document.querySelector('.big-picture');
  var previewCancel = pictureBig.querySelector('#picture-cancel');

  // просмотр любой фотографии в полноразмерном режиме
  var smallPicture = document.querySelectorAll('.picture');

  var smallPicturePreview = function (evt) {
    pictureBig.classList.remove('hidden');
    document.addEventListener('keydown', window.onPreviewEscPress);
    previewCancel.addEventListener('click', function () {
      window.closePreview();
    });
    pictureBig.querySelector('img').src = evt.target.src;
    pictureBig.querySelector('.social__caption').textContent = evt.target.alt;
  };

  for (var i = 0; i < smallPicture.length; i++) {
    smallPicture[i].addEventListener('click', smallPicturePreview);
    smallPicture[i].querySelector('img').setAttribute('tabindex', [i + 1]);
    smallPicture[i].addEventListener('keydown', function (evt) {
      window.isEnterEvent(evt, smallPicturePreview(evt));
    });
  }
})();
