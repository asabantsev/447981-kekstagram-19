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

  var inputHashtag = window.util.uploadField.querySelector('.text__hashtags');

  var detectDuplicateHashtag = function (tag, index, hashes) {
    var tags = hashes.slice(0);

    tags.splice(index, 1);

    return tags
      .map(function (hashtag) {
        return hashtag.toLowerCase();
      })
      .includes(tag.toLowerCase());
  };

  var validateHashtags = function (evt) {
    var hashes = evt.target.value
      .split(' ')
      .filter(function (tag) {
        return tag;
      });

    evt.target.removeAttribute('style');

    var errorMessage = '';

    hashes.forEach(function (tag, index) {
      if (tag[0] !== '#') {
        errorMessage = ERROR_MESSAGES[0];
      } else if (tag === '#') {
        errorMessage = ERROR_MESSAGES[1];
      } else if (detectDuplicateHashtag(tag, index, hashes)) {
        errorMessage = ERROR_MESSAGES[2];
      } else if (hashes.length > HASHTAGS_MAX_COUNT) {
        errorMessage = ERROR_MESSAGES[3];
      } else if (tag.length > HASHTAG_MAX_LENGTH) {
        errorMessage = ERROR_MESSAGES[4];
      }
    });

    evt.target.setCustomValidity(errorMessage);
  };

  var oninputHashtagChange = function (evt) {
    validateHashtags(evt);
  };

  inputHashtag.addEventListener('change', oninputHashtagChange);

})();
