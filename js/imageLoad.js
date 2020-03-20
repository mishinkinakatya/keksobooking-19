'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_SIZE = 70;

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var avatarPreviewSrc = avatarPreview.src;
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo');
  var photoPreviewImg = document.createElement('img');

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photoChooser.addEventListener('change', function () {
    var file = photoChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        photoPreviewImg.src = reader.result;
        photoPreviewImg.alt = 'Фотография жилья';
        photoPreviewImg.width = PHOTO_SIZE;
        photoPreviewImg.height = PHOTO_SIZE;
        photoPreview.appendChild(photoPreviewImg);
      });

      reader.readAsDataURL(file);
    }
  });

  window.resetImage = function () {
    if (photoPreviewImg) {
      photoPreviewImg.remove();
    }
    avatarPreview.src = avatarPreviewSrc;
  };

})();
