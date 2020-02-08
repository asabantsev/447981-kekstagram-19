'use strict';

var PHOTO_TITLES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var COMMENTS_TEXTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;
var COMMENTS_MAX = 5;
var PHOTOS_NUMBER = 25;

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var userPictures = document.querySelector('.pictures');

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
function createPhotosObjectsArray(photosCount) {
  var photoObjectsArray = [];

  for (var i = 0; i < photosCount; i++) {
    photoObjectsArray[i] = createPhotoObject(i + 1);
  }

  return photoObjectsArray;
}

// отрисовка фотографии по шаблону
function renderPhoto(photo) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  // pictureElement.querySelector('.picture__img').title = photo.description;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;

  return pictureElement;
}

// добавление фотографий пользователей на страницу
function renderUserPictures(photos) {
  var fragment = document.createDocumentFragment();

  photos.forEach(function (photo) {
    fragment.appendChild(renderPhoto(photo));
  });

  userPictures.appendChild(fragment);
}

renderUserPictures(createPhotosObjectsArray(PHOTOS_NUMBER));

// добавление большой фотографии на страницу
var body = document.querySelector('body');
body.classList.add('modal-open');
var pictureBig = document.querySelector('.big-picture');
var commentsContainer = pictureBig.querySelector('.social__comments');
var commentsDefault = commentsContainer.querySelectorAll('.social__comment');

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

// создаем шаблон комментария
function createCommentTemplate(container) {
  container.insertAdjacentHTML('afterbegin',
      '<li class="social__comment">' +
        '<img class="social__picture" width="35" height="35">' +
        '<p class="social__text"></p>' +
      '</li>'
  );
}

// изменение большой фотографии
function renderPictureBig(photos) {
  pictureBig.classList.remove('hidden');

  pictureBig.querySelector('.big-picture__img').querySelector('img').src = photos[0].url;
  pictureBig.querySelector('.likes-count').textContent = photos[0].likes;
  pictureBig.querySelector('.comments-count').textContent = photos[0].comments.length;
  pictureBig.querySelector('.social__caption').textContent = photos[0].description;

  commentsDefault.forEach(function (comment) {
    commentsContainer.removeChild(comment);
  });

  for (var i = 0; i < photos[0].comments.length; i++) {
    createCommentTemplate(commentsContainer);

    commentsContainer.querySelector('.social__comment').querySelector('img').src = photos[0].comments[i].avatar;
    commentsContainer.querySelector('.social__comment').querySelector('img').alt = photos[0].comments[i].name;
    commentsContainer.querySelector('.social__text').textContent = photos[0].comments[i].message;
  }
}

pictureBig.querySelector('.social__comment-count').classList.add('hidden');
pictureBig.querySelector('.comments-loader').classList.add('hidden');

renderPictureBig(createPhotosObjectsArray(PHOTOS_NUMBER));
