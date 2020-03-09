'use strict';

(function () {

  var effectScale = window.util.uploadField.querySelector('.effect-level__line');
  var levelValue = window.util.uploadField.querySelector('.effect-level__value');
  var levelDepth = window.util.uploadField.querySelector('.effect-level__depth');

  var onMouseDown = function (downEvt) {
    downEvt.preventDefault();

    var startCoords = {
      x: downEvt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords.x = moveEvt.clientX;

      var pinPosition = window.util.pin.offsetLeft - shift.x;

      if (pinPosition > effectScale.offsetWidth) {
        pinPosition = effectScale.offsetWidth;
      } else if (pinPosition <= 0) {
        pinPosition = 0;
      }

      window.util.pin.style.left = pinPosition + 'px';

      levelValue.value = Math.round((window.util.pin.offsetLeft * window.util.maxEffectValue) / effectScale.offsetWidth);

      levelDepth.style.width = levelValue.value + '%';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.util.pin.addEventListener('mousedown', onMouseDown);

})();
