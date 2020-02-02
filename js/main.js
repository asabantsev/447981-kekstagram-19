'use strict';

var MESSAGE = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var commentsElement = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var randomInteger = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
};

function createPhotoDesriptionArray(length) {
  for (var i = 1, array = []; i <= length; i++) {
    array.push({
      avatar: 'img/avatar-' + randomInteger(1, 6) + '.svg',
      comments: MESSAGE[randomInteger(0, MESSAGE.length)],
      likes: randomInteger(15, 200),
      names: NAMES[randomInteger(0, NAMES.length)]
    });
  }
  return array;
}

function renderDescription(description) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = description.avatar;
  pictureElement.querySelector('.picture__comments').textContent = description.comments;
  pictureElement.querySelector('.picture__likes').textContent = description.likes;

  return pictureElement;
}

var fragment = document.createDocumentFragment();
var descriptions = createPhotoDesriptionArray(25);
for (var i = 0; i < descriptions.length; i++) {
  fragment.appendChild(renderDescription(descriptions[i]));
}

commentsElement.appendChild(fragment);
