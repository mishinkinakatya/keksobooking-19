'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_SIZE = 70;

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview');
  var avatarPreviewImg = avatarPreview.querySelector('img');
  var avatarPreviewSrc = avatarPreviewImg.src;
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo');
  var photoPreviewImg;

  var loadImage = function (chooser, preview) {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var previewImg = preview.querySelector('img');
        if (previewImg) {
          previewImg.src = reader.result;
        } else {
          previewImg = document.createElement('img');
          previewImg.src = reader.result;
          previewImg.alt = 'Фотография жилья';
          previewImg.width = PHOTO_SIZE;
          previewImg.height = PHOTO_SIZE;
          preview.appendChild(previewImg);

          photoPreviewImg = photoPreview.querySelector('img');
        }
      });

      reader.readAsDataURL(file);
    }
  };

  avatarChooser.addEventListener('change', function () {
    loadImage(avatarChooser, avatarPreview);
  });

  photoChooser.addEventListener('change', function () {
    loadImage(photoChooser, photoPreview);
  });

  window.resetImage = function () {
    if (photoPreviewImg) {
      photoPreviewImg.remove();
    }
    avatarPreviewImg.src = avatarPreviewSrc;
  };

})();
