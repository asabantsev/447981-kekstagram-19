'use strict';

(function () {
  var PHOTO_TITLES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var COMMENTS_TEXTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var AVATAR_MIN = 1;
  var AVATAR_MAX = 6;
  var COMMENTS_MAX = 5;

  // случайное число
  function randomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // создание объекта-фотография
  function createPhotoObject(photoNumber) {
    var photoObject = {};

    photoObject.url = 'photos/' + photoNumber + '.jpg';
    photoObject.description = PHOTO_TITLES[randomInteger(0, PHOTO_TITLES.length - 1)];
    photoObject.likes = randomInteger(LIKES_MIN, LIKES_MAX);
    photoObject.comments = createCommentsObjectsArray();

    return photoObject;
  }

  // создание массива объектов-фотографий
  window.createPhotosObjectsArray = function (photosCount) {
    var photoObjectsArray = [];

    for (var i = 0; i < photosCount; i++) {
      photoObjectsArray[i] = createPhotoObject(i + 1);
    }

    return photoObjectsArray;
  };

  // создание объекта-комментария
  function createCommentObject() {
    var commentObject = {};

    commentObject.avatar = 'img/avatar-' + randomInteger(AVATAR_MIN, AVATAR_MAX) + '.svg';
    commentObject.message = COMMENTS_TEXTS[randomInteger(0, COMMENTS_TEXTS.length - 1)];
    commentObject.name = NAMES[randomInteger(0, NAMES.length - 1)];

    return commentObject;
  }

  // создание массива объектов-комментариев
  function createCommentsObjectsArray() {
    var commentsObjectsArray = [];
    commentsObjectsArray.length = randomInteger(0, COMMENTS_MAX);

    for (var i = 0; i < commentsObjectsArray.length; i++) {
      commentsObjectsArray[i] = createCommentObject();
    }

    return commentsObjectsArray;
  }
})();
