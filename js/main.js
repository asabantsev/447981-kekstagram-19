'use strict';

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
var ERROR_MESSAGES = [
  'Хэш-тег должен начинаться с символа "#"',
  'Хеш-тег не может состоять только из символа "#"',
  'Один и тот же хэш-тег не может быть использован дважды',
  'Нельзя указать больше пяти хэш-тегов',
  'Максимальная длина одного хэш-тега 20 символов, включая символ "#"'
];
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;
var COMMENTS_MAX = 5;
var PHOTOS_NUMBER = 25;
var ESC_KEY = 'Escape';
var DEFAULT_SIZE = 100;
var SIZE_STEP = 25;
var MIN_SIZE = 25;
var MAX_SIZE = 100;
var HASHTAGS_MAX_COUNT = 5;
var HASHTAG_MAX_LENGTH = 20;
var CHROME_COEFFICIENT = 0.01;
var SEPIA_COEFFICIENT = 0.01;
var PHOBOS_COEFFICIENT = 0.03;
var HEAT_COEFFICIENT = 0.02;

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
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
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
  // pictureBig.classList.remove('hidden');
  // body.classList.add('modal-open');

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

// Загрузка изображения и показ формы редактирования
var uploadPicture = document.querySelector('#upload-file');
var editPicture = document.querySelector('.img-upload__overlay');
var uploadCancel = editPicture.querySelector('#upload-cancel');
var inputHashtag = document.querySelector('.text__hashtags');

var oninputHashtagChange = function (evt) {
  validateHashtags(evt);
};

var onInputHashtagFocus = function () {
  document.removeEventListener('keydown', onDialogEcsPress);
};

var resetUserImgSettings = function () {
  levelBlock.classList.add('hidden');
  picturePreview.removeAttribute('class');
  picturePreview.removeAttribute('style');
  picturePreview.style.transform = 'scale(' + 100 / 100 + ')';
  pictureScale.value = '100';
};

var openDialog = function () {
  editPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  pictureScale.value = DEFAULT_SIZE;
  picturePreview.style.transform = 'scale(' + (pictureScale.value / 100) + ')';
  levelBlock.classList.add('hidden');
  document.addEventListener('keydown', onDialogEcsPress);
  inputHashtag.addEventListener('focus', onInputHashtagFocus);
  inputHashtag.addEventListener('blur', function () {
    document.addEventListener('keydown', onDialogEcsPress);
  });
};

var closeDialog = function () {
  editPicture.classList.add('hidden');
  uploadPicture.textContent = '';
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDialogEcsPress);
};

var onDialogEcsPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closeDialog();
  }
};

uploadPicture.addEventListener('change', function () {
  openDialog();
});

uploadCancel.addEventListener('click', function () {
  closeDialog();
});

// Редактирование размера изображения
var buttonSmaller = document.querySelector('.scale__control--smaller');
var buttonBigger = document.querySelector('.scale__control--bigger');
var pictureScale = document.querySelector('.scale__control--value');
var picturePreview = document.querySelector('.img-upload__preview').querySelector('img');

var sizeSmaller = function () {
  if (pictureScale.value > MIN_SIZE) {
    pictureScale.value = pictureScale.value - SIZE_STEP;
    picturePreview.style.transform = 'scale(' + (pictureScale.value / 100) + ')';
  }
};

var sizeBigger = function () {
  if (pictureScale.value < MAX_SIZE) {
    pictureScale.value = parseInt(pictureScale.value, 10) + SIZE_STEP;
    picturePreview.style.transform = 'scale(' + (pictureScale.value / 100) + ')';
  }
};

buttonSmaller.addEventListener('click', function () {
  sizeSmaller();
});

buttonBigger.addEventListener('click', function () {
  sizeBigger();
});

// Применение эффекта для изображения
var effectsList = document.querySelector('.effects__list');

var changeEffects = function () {
  if (effectsList.querySelector('input:checked').value !== 'none') {
    levelBlock.classList.remove('hidden');
  }

  switch (effectsList.querySelector('input:checked').value) {
    case 'chrome':
      picturePreview.classList.add('effects__preview--chrome');
      break;
    case 'sepia':
      picturePreview.classList.add('effects__preview--sepia');
      break;
    case 'marvin':
      picturePreview.classList.add('effects__preview--marvin');
      break;
    case 'phobos':
      picturePreview.classList.add('effects__preview--phobos');
      break;
    case 'heat':
      picturePreview.classList.add('effects__preview--heat');
      break;
  }
};

var onEffectsItemClick = function () {
  resetUserImgSettings();

  changeEffects();
};

effectsList.addEventListener('click', onEffectsItemClick);

var levelBlock = document.querySelector('.effect-level');
var levelPin = document.querySelector('.effect-level__pin');
var levelBar = document.querySelector('.effect-level__line');
var levelValue = document.querySelector('.effect-level__value');

var setEffectValue = function () {
  var levelBarWidth = Math.round(levelBar.getBoundingClientRect().width);
  var levelEffectWidth = Math.round(levelPin.getBoundingClientRect().x - levelBar.getBoundingClientRect().x);
  levelValue.value = Math.round(levelEffectWidth * 100 / levelBarWidth);

  switch (picturePreview.className) {
    case 'effects__preview--chrome':
      picturePreview.style.filter = 'grayscale(' + levelValue.value * CHROME_COEFFICIENT + ')';
      break;
    case 'effects__preview--sepia':
      picturePreview.style.filter = 'sepia(' + levelValue.value * SEPIA_COEFFICIENT + ')';
      break;
    case 'effects__preview--marvin':
      picturePreview.style.filter = 'invert(' + levelValue.value + '%)';
      break;
    case 'effects__preview--phobos':
      picturePreview.style.filter = 'blur(' + levelValue.value * PHOBOS_COEFFICIENT + 'px)';
      break;
    case 'effects__preview--heat':
      picturePreview.style.filter = 'brightness(' + levelValue.value * HEAT_COEFFICIENT + 1 + ')';
      break;
  }
};

levelPin.addEventListener('mouseup', function () {
  setEffectValue();
});

// Валидация хеш-тегов
var detectDuplicateHashtag = function (hashtags) {
  var flag = false;

  for (var i = 0; i < hashtags.length; i++) {
    for (var j = i + 1; j < hashtags.length; j++) {
      if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase()) {
        flag = true;
      }
    }
  }

  return flag;
};

var removeSpacesInHashtags = function (hashtags) {

  for (var i = 0; i < hashtags.length; i++) {
    if (hashtags[i] === '') {
      hashtags.splice(i, 1);
      i--;
    }
  }
};

var validateHashtags = function (evt) {
  var hashtags = evt.target.value.split(' ');

  removeSpacesInHashtags(hashtags);

  var errorMessage = evt.target.setCustomValidity('');

  for (var i = 0; i < hashtags.length; i++) {
    if (hashtags[i][0] !== '#') {
      errorMessage = evt.target.setCustomValidity(ERROR_MESSAGES[0]);
    } else if (hashtags[i] === '#') {
      errorMessage = evt.target.setCustomValidity(ERROR_MESSAGES[1]);
    } else if (detectDuplicateHashtag(hashtags)) {
      errorMessage = evt.target.setCustomValidity(ERROR_MESSAGES[2]);
    } else if (hashtags.length > HASHTAGS_MAX_COUNT) {
      errorMessage = evt.target.setCustomValidity(ERROR_MESSAGES[3]);
    } else if (hashtags[i].length > HASHTAG_MAX_LENGTH) {
      errorMessage = evt.target.setCustomValidity(ERROR_MESSAGES[4]);
    } else {
      errorMessage = errorMessage;
    }
  }
};

inputHashtag.addEventListener('change', oninputHashtagChange);
