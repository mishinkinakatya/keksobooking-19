'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  // var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  // var photoPreview = document.querySelector('.ad-form__photo');

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

  // photoChooser.addEventListener('change', function () {
  //   var file = photoChooser.files[0];
  //   var fileName = file.name.toLowerCase();

  //   var matches = FILE_TYPES.some(function (it) {
  //     return fileName.endsWith(it);
  //   });

  //   if (matches) {
  //     var reader = new FileReader();

  //     reader.addEventListener('load', function () {
  //       photoPreview.src = reader.result;
  //     });

  //     reader.readAsDataURL(file);
  //   }
  // });

})();
