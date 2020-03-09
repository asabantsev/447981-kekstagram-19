'use strict';

(function () {
  var SIZE_STEP = 25;
  var MIN_SIZE = 25;
  var MAX_SIZE = 100;

  var buttonSmaller = document.querySelector('.scale__control--smaller');
  var buttonBigger = document.querySelector('.scale__control--bigger');

  // Редактирование размера изображения
  var sizeSmaller = function () {
    if (window.util.pictureScale.value > MIN_SIZE) {
      window.util.pictureScale.value = window.util.pictureScale.value - SIZE_STEP;
      window.util.picturePreview.style.transform = 'scale(' + (window.util.pictureScale.value / 100) + ')';
    }
  };

  var sizeBigger = function () {
    if (window.util.pictureScale.value < MAX_SIZE) {
      window.util.pictureScale.value = parseInt(window.util.pictureScale.value, 10) + SIZE_STEP;
      window.util.picturePreview.style.transform = 'scale(' + (window.util.pictureScale.value / 100) + ')';
    }
  };

  buttonSmaller.addEventListener('click', function () {
    sizeSmaller();
  });

  buttonBigger.addEventListener('click', function () {
    sizeBigger();
  });
})();
