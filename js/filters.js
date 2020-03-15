'use strict';

(function () {

  var RANDOM_IMG_COUNT = 10;

  var imgFilters = document.querySelector('.img-filters');
  var filterButtons = imgFilters.querySelectorAll('.img-filters__button');

  var userPictures = document.querySelector('.pictures');

  imgFilters.classList.remove('img-filters--inactive');

  var removeActiveClass = function () {
    filterButtons.forEach(function (button) {
      if (button.classList.contains('img-filters__button--active')) {
        button.classList.remove('img-filters__button--active');
      }
    });
  };

  var clearPictures = function () {
    var photos = userPictures.querySelectorAll('.picture');

    photos.forEach(function (photo) {
      userPictures.removeChild(photo);
    });
  };

  var getUniquePhotos = function (photos, count) {
    var notUniquePhotos = [];
    var uniquePhotos = [];

    for (var i = 0; uniquePhotos.length < count; i++) {
      notUniquePhotos[i] = photos[window.util.generateRandomNumber(0, photos.length - 1)];
      uniquePhotos = notUniquePhotos.filter(function (it, j) {
        return notUniquePhotos.indexOf(it) === j;
      });
    }

    return uniquePhotos;
  };

  var filterDefault = function () {
    clearPictures();
    window.successHandler(window.photos);
  };

  var filterRandom = function () {
    clearPictures();
    var photosData = window.photos.slice();
    window.successHandler(getUniquePhotos(photosData, RANDOM_IMG_COUNT));
  };

  var filterDiscussed = function () {
    clearPictures();
    var photosData = window.photos.slice().sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
    window.successHandler(photosData);
  };

  var filterButtonMap = {
    'filter-default': filterDefault,
    'filter-random': filterRandom,
    'filter-discussed': filterDiscussed
  };

  var onFilterButtonClick = function (evt) {
    removeActiveClass();
    evt.target.classList.add('img-filters__button--active');
    window.debounce(filterButtonMap[evt.target.id]);
  };

  filterButtons.forEach(function (button) {
    button.addEventListener('click', onFilterButtonClick);
  });

})();
