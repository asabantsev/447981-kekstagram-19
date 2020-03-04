'use strict';

(function () {
  var ERROR_MESSAGES = [
    'Хэш-тег должен начинаться с символа "#"',
    'Хеш-тег не может состоять только из символа "#"',
    'Один и тот же хэш-тег не может быть использован дважды',
    'Нельзя указать больше пяти хэш-тегов',
    'Максимальная длина одного хэш-тега 20 символов, включая символ "#"'
  ];
  var DEFAULT_SIZE = 100;
  var SIZE_STEP = 25;
  var MIN_SIZE = 25;
  var MAX_SIZE = 100;
  var HASHTAGS_MAX_COUNT = 5;
  var HASHTAG_MAX_LENGTH = 20;
  var CHROME_COEFFICIENT = 0.01;
  var SEPIA_COEFFICIENT = 0.01;
  var PHOBOS_COEFFICIENT = 0.03;
  var HEAT_COEFFICIENT = 0.02;

  // Загрузка изображения и показ формы редактирования
  var body = document.querySelector('body');
  var pictureBig = document.querySelector('.big-picture');
  var uploadPicture = document.querySelector('#upload-file');
  var editPicture = document.querySelector('.img-upload__overlay');
  var uploadCancel = editPicture.querySelector('#upload-cancel');
  var inputHashtag = document.querySelector('.text__hashtags');
  var inputComment = document.querySelector('.text__description');

  var onInputHashtagFocus = function () {
    document.removeEventListener('keydown', onDialogEcsPress);
  };

  var onInputCommentFocus = function () {
    document.removeEventListener('keydown', onDialogEcsPress);
  };

  var resetUserImgSettings = function () {
    levelBlock.classList.add('hidden');
    picturePreview.removeAttribute('class');
    picturePreview.removeAttribute('style');
    picturePreview.style.transform = 'scale(' + 100 / 100 + ')';
    pictureScale.value = '100';
  };

  var openDialog = function () {
    editPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    pictureScale.value = DEFAULT_SIZE;
    picturePreview.style.transform = 'scale(' + (pictureScale.value / 100) + ')';
    levelBlock.classList.add('hidden');
    document.addEventListener('keydown', onDialogEcsPress);
    inputHashtag.addEventListener('focus', onInputHashtagFocus);
    inputHashtag.addEventListener('blur', function () {
      document.addEventListener('keydown', onDialogEcsPress);
    });
    inputComment.addEventListener('focus', onInputCommentFocus);
  };

  var closeDialog = function () {
    editPicture.classList.add('hidden');
    uploadPicture.textContent = '';
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDialogEcsPress);
  };

  window.closePreview = function () {
    pictureBig.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDialogEcsPress);
  };

  var onDialogEcsPress = function (evt) {
    window.util.isEscEvent(evt, closeDialog);
  };

  window.onPreviewEscPress = function (evt) {
    window.util.isEscEvent(evt, window.closePreview);
  };

  uploadPicture.addEventListener('change', function () {
    openDialog();
  });

  uploadCancel.addEventListener('click', function () {
    closeDialog();
  });

  // Редактирование размера изображения
  var buttonSmaller = document.querySelector('.scale__control--smaller');
  var buttonBigger = document.querySelector('.scale__control--bigger');
  var pictureScale = document.querySelector('.scale__control--value');
  var picturePreview = document.querySelector('.img-upload__preview').querySelector('img');

  var sizeSmaller = function () {
    if (pictureScale.value > MIN_SIZE) {
      pictureScale.value = pictureScale.value - SIZE_STEP;
      picturePreview.style.transform = 'scale(' + (pictureScale.value / 100) + ')';
    }
  };

  var sizeBigger = function () {
    if (pictureScale.value < MAX_SIZE) {
      pictureScale.value = parseInt(pictureScale.value, 10) + SIZE_STEP;
      picturePreview.style.transform = 'scale(' + (pictureScale.value / 100) + ')';
    }
  };

  buttonSmaller.addEventListener('click', function () {
    sizeSmaller();
  });

  buttonBigger.addEventListener('click', function () {
    sizeBigger();
  });

  // Применение эффекта для изображения
  var effectsList = document.querySelector('.effects__list');

  var changeEffects = function () {
    if (effectsList.querySelector('input:checked').value !== 'none') {
      levelBlock.classList.remove('hidden');
    }

    switch (effectsList.querySelector('input:checked').value) {
      case 'chrome':
        picturePreview.classList.add('effects__preview--chrome');
        break;
      case 'sepia':
        picturePreview.classList.add('effects__preview--sepia');
        break;
      case 'marvin':
        picturePreview.classList.add('effects__preview--marvin');
        break;
      case 'phobos':
        picturePreview.classList.add('effects__preview--phobos');
        break;
      case 'heat':
        picturePreview.classList.add('effects__preview--heat');
        break;
    }
  };

  var onEffectsItemClick = function () {
    resetUserImgSettings();

    changeEffects();
  };

  effectsList.addEventListener('click', onEffectsItemClick);

  var levelBlock = document.querySelector('.effect-level');
  var levelPin = document.querySelector('.effect-level__pin');
  var levelBar = document.querySelector('.effect-level__line');
  var levelValue = document.querySelector('.effect-level__value');

  var setEffectValue = function () {
    var levelBarWidth = Math.round(levelBar.getBoundingClientRect().width);
    var levelEffectWidth = Math.round(levelPin.getBoundingClientRect().x - levelBar.getBoundingClientRect().x);
    levelValue.value = Math.round(levelEffectWidth * 100 / levelBarWidth);

    switch (picturePreview.className) {
      case 'effects__preview--chrome':
        picturePreview.style.filter = 'grayscale(' + levelValue.value * CHROME_COEFFICIENT + ')';
        break;
      case 'effects__preview--sepia':
        picturePreview.style.filter = 'sepia(' + levelValue.value * SEPIA_COEFFICIENT + ')';
        break;
      case 'effects__preview--marvin':
        picturePreview.style.filter = 'invert(' + levelValue.value + '%)';
        break;
      case 'effects__preview--phobos':
        picturePreview.style.filter = 'blur(' + levelValue.value * PHOBOS_COEFFICIENT + 'px)';
        break;
      case 'effects__preview--heat':
        picturePreview.style.filter = 'brightness(' + levelValue.value * HEAT_COEFFICIENT + 1 + ')';
        break;
    }
  };

  levelPin.addEventListener('mouseup', function () {
    setEffectValue();
  });

  // Валидация хеш-тегов
  var detectDuplicateHashtag = function (hashtags) {
    var flag = false;

    for (var i = 0; i < hashtags.length; i++) {
      for (var j = i + 1; j < hashtags.length; j++) {
        if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase()) {
          flag = true;
        }
      }
    }

    return flag;
  };

  var removeSpacesInHashtags = function (hashtags) {

    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i] === '') {
        hashtags.splice(i, 1);
        i--;
      }
    }
  };

  var validateHashtags = function (evt) {
    var hashtags = evt.target.value.split(' ');

    removeSpacesInHashtags(hashtags);

    var errorMessage = '';

    for (var i = 0; i < hashtags.length; i++) {
      switch (true) {
        case hashtags[i].length > 0 && hashtags[i][0] !== '#':
          errorMessage = ERROR_MESSAGES[0];
          break;
        case hashtags[i] === '#':
          errorMessage = ERROR_MESSAGES[1];
          break;
        case detectDuplicateHashtag(hashtags):
          errorMessage = ERROR_MESSAGES[2];
          break;
        case hashtags.length > HASHTAGS_MAX_COUNT:
          errorMessage = ERROR_MESSAGES[3];
          break;
        case hashtags[i].length > HASHTAG_MAX_LENGTH:
          errorMessage = ERROR_MESSAGES[4];
          break;
      }
    }

    inputHashtag = evt.target.setCustomValidity(errorMessage);

  };

  var oninputHashtagChange = function (evt) {
    validateHashtags(evt);
  };

  inputHashtag.addEventListener('change', oninputHashtagChange);
})();
