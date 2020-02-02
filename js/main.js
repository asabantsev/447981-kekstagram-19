'use strict';

var PHOTO_TITLES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS_MIN = 15;
var COMMENTS_MAX = 200;
var PHOTOS_NUMBER = 25;

var commentsElement = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var randomInteger = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
};

function createPhotosArray(length) {
  for (var i = 0, array = []; i <= length; i++) {
    array.push({
      url: 'photos/' + [i + 1] + '.jpg',
      comments: randomInteger(COMMENTS_MIN, COMMENTS_MAX),
      likes: randomInteger(LIKES_MIN, LIKES_MAX),
      names: NAMES[randomInteger(0, NAMES.length)],
      description: PHOTO_TITLES[randomInteger(0, PHOTO_TITLES.length)]
    });
  }
  return array;
}

function renderPhoto(photo) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__img').title = photo.description;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;

  return pictureElement;
}

var fragment = document.createDocumentFragment();
var photos = createPhotosArray(PHOTOS_NUMBER - 1);
for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPhoto(photos[i]));
}

commentsElement.appendChild(fragment);
