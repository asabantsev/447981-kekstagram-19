'use strict';

(function () {
  var CHROME_COEFFICIENT = 0.01;
  var SEPIA_COEFFICIENT = 0.01;
  var PHOBOS_COEFFICIENT = 0.03;
  var HEAT_COEFFICIENT = 0.02;

  var effectsList = document.querySelector('.effects__list');
  var levelPin = document.querySelector('.effect-level__pin');
  var levelBar = document.querySelector('.effect-level__line');
  var levelValue = document.querySelector('.effect-level__value');

  // Применение эффекта для изображения
  var changeEffects = function () {
    if (effectsList.querySelector('input:checked').value !== 'none') {
      window.util.levelBlock.classList.remove('hidden');
    }

    switch (effectsList.querySelector('input:checked').value) {
      case 'chrome':
        window.util.picturePreview.classList.add('effects__preview--chrome');
        break;
      case 'sepia':
        window.util.picturePreview.classList.add('effects__preview--sepia');
        break;
      case 'marvin':
        window.util.picturePreview.classList.add('effects__preview--marvin');
        break;
      case 'phobos':
        window.util.picturePreview.classList.add('effects__preview--phobos');
        break;
      case 'heat':
        window.util.picturePreview.classList.add('effects__preview--heat');
        break;
    }
  };

  var onEffectsItemClick = function () {
    window.util.resetUserImgSettings();

    changeEffects();
  };

  effectsList.addEventListener('click', onEffectsItemClick);

  var setEffectValue = function () {
    var levelBarWidth = Math.round(levelBar.getBoundingClientRect().width);
    var levelEffectWidth = Math.round(levelPin.getBoundingClientRect().x - levelBar.getBoundingClientRect().x);
    levelValue.value = Math.round(levelEffectWidth * 100 / levelBarWidth);

    switch (window.util.picturePreview.className) {
      case 'effects__preview--chrome':
        window.util.picturePreview.style.filter = 'grayscale(' + levelValue.value * CHROME_COEFFICIENT + ')';
        break;
      case 'effects__preview--sepia':
        window.util.picturePreview.style.filter = 'sepia(' + levelValue.value * SEPIA_COEFFICIENT + ')';
        break;
      case 'effects__preview--marvin':
        window.util.picturePreview.style.filter = 'invert(' + levelValue.value + '%)';
        break;
      case 'effects__preview--phobos':
        window.util.picturePreview.style.filter = 'blur(' + levelValue.value * PHOBOS_COEFFICIENT + 'px)';
        break;
      case 'effects__preview--heat':
        window.util.picturePreview.style.filter = 'brightness(' + levelValue.value * HEAT_COEFFICIENT + 1 + ')';
        break;
    }
  };

  levelPin.addEventListener('mouseup', function () {
    setEffectValue();
  });

})();
