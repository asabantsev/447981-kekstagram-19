'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var MAX_EFFECT_VALUE = 100;

  var uploadField = document.querySelector('.img-upload');
  var pin = uploadField.querySelector('.effect-level__pin');
  var levelBlock = uploadField.querySelector('.effect-level');
  var levelValue = uploadField.querySelector('.effect-level__value');
  var levelDepth = uploadField.querySelector('.effect-level__depth');
  var picturePreview = uploadField.querySelector('.img-upload__preview img');
  var pictureScale = uploadField.querySelector('.scale__control--value');

  var isEscEvent = function (evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };

  var resetUserImgSettings = function () {
    levelBlock.classList.add('hidden');
    picturePreview.removeAttribute('class');
    picturePreview.removeAttribute('style');
    picturePreview.style.transform = 'scale(' + MAX_EFFECT_VALUE / MAX_EFFECT_VALUE + ')';
    pictureScale.value = MAX_EFFECT_VALUE + '%';
    levelValue.value = MAX_EFFECT_VALUE;
    pin.style.left = MAX_EFFECT_VALUE + '%';
    levelDepth.style.width = MAX_EFFECT_VALUE + '%';
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    resetUserImgSettings: resetUserImgSettings,
    uploadField: uploadField,
    maxEffectValue: MAX_EFFECT_VALUE,
    picturePreview: picturePreview,
    pin: pin,
    pictureScale: pictureScale,
    levelBlock: levelBlock
  };
})();
