'use strict';

(function () {
  var success = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  window.openSuccessMessage = function () {
    var successBlock = success.cloneNode(true);

    main.appendChild(successBlock);

    var successButton = successBlock.querySelector('.success__button');

    successButton.addEventListener('click', onSuccessButtonClick);
    successBlock.addEventListener('click', onSuccessBlockClick);

    document.addEventListener('keydown', onSuccessBlockEsc);
  };

  var closeSuccessMessage = function () {
    var successBlockInMain = main.querySelector('.success');
    main.removeChild(successBlockInMain);

    document.removeEventListener('keydown', onSuccessBlockEsc);
  };

  var onSuccessButtonClick = function () {
    closeSuccessMessage();
  };

  var onSuccessBlockClick = function (evt) {
    evt.stopPropagation();

    if (evt.target.classList.contains('success')) {
      closeSuccessMessage();
    }
  };

  var onSuccessBlockEsc = function (evt) {
    window.util.isEscEvent(evt, closeSuccessMessage);
  };

})();
