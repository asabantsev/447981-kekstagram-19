'use strict';

(function () {
  var ERROR_MESSAGES = [
    'Хэш-тег должен начинаться с символа "#"',
    'Хеш-тег не может состоять только из символа "#"',
    'Один и тот же хэш-тег не может быть использован дважды',
    'Нельзя указать больше пяти хэш-тегов',
    'Максимальная длина одного хэш-тега 20 символов, включая символ "#"'
  ];
  var HASHTAGS_MAX_COUNT = 5;
  var HASHTAG_MAX_LENGTH = 20;

  var inputHashtag = document.querySelector('.text__hashtags');

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
