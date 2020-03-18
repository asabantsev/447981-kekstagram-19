'use strict';

(function () {
  var body = document.querySelector('body');
  var uploadPicture = document.querySelector('#upload-file');
  var editPicture = document.querySelector('.img-upload__overlay');
  var uploadCancel = editPicture.querySelector('#upload-cancel');
  var inputHashtag = document.querySelector('.text__hashtags');
  var inputComment = document.querySelector('.text__description');

  // Загрузка изображения и показ формы редактирования
  var onDialogEcsPress = function (evt) {
    window.util.isEscEvent(evt, closeDialog);
  };

  var onInputHashtagFocus = function () {
    document.removeEventListener('keydown', onDialogEcsPress);
  };

  var onInputCommentFocus = function () {
    document.removeEventListener('keydown', onDialogEcsPress);
  };

  var openDialog = function () {
    editPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    window.util.pictureScale.value = window.util.maxEffectValue;
    window.util.picturePreview.style.transform = 'scale(' + (window.util.pictureScale.value / window.util.maxEffectValue) + ')';
    window.util.levelBlock.classList.add('hidden');
    document.addEventListener('keydown', onDialogEcsPress);
    inputHashtag.addEventListener('focus', onInputHashtagFocus);
    inputHashtag.addEventListener('blur', function () {
      document.addEventListener('keydown', onDialogEcsPress);
    });
    inputComment.addEventListener('focus', onInputCommentFocus);
    window.renderUserPhoto();
  };

  var closeDialog = function () {
    editPicture.classList.add('hidden');
    uploadPicture.textContent = '';
    body.classList.remove('modal-open');
    window.util.resetUserImgSettings();
    document.removeEventListener('keydown', onDialogEcsPress);
  };

  uploadPicture.addEventListener('change', function () {
    openDialog();
  });

  uploadCancel.addEventListener('click', function () {
    closeAndResetDialog();
  });

  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onLoad, onError);

    evt.preventDefault();
  });

  var onLoad = function () {
    closeAndResetDialog();
    window.openSuccessMessage();
  };

  var onError = function () {
    closeAndResetDialog();
    window.openErrorMessage();
  };

  var closeAndResetDialog = function () {
    closeDialog();
    window.util.resetForm();
  };

})();
