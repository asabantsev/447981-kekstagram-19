'use strict';

(function () {

  var error = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  window.openErrorMessage = function () {
    var errorBlock = error.cloneNode(true);

    main.appendChild(errorBlock);

    var errorButtons = errorBlock.querySelectorAll('.error__button');

    errorButtons.forEach(function (button) {
      button.addEventListener('click', onErrorButtonClick);
    });

    errorBlock.addEventListener('click', onErrorBlockClick);

    document.addEventListener('keydown', onErrorBlockEsc);
  };

  var closeErrorMessage = function () {
    var errorBlockInMain = main.querySelector('.error');
    main.removeChild(errorBlockInMain);

    document.removeEventListener('keydown', onErrorBlockEsc);
  };

  var onErrorButtonClick = function () {
    closeErrorMessage();
  };

  var onErrorBlockClick = function (evt) {
    evt.stopPropagation();

    if (evt.target.classList.contains('error')) {
      closeErrorMessage();
    }
  };

  var onErrorBlockEsc = function (evt) {
    window.util.isEscEvent(evt, closeErrorMessage);
  };

})();
