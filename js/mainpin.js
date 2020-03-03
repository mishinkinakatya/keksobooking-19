'use strict';
(function () {

  window.mode.mainPin.addEventListener('mousedown', function (evt) {
    if (evt.which.toString() === '1') {
      window.mode.activateForm();
    }
  });

  window.mode.mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.mode.activateForm();
    }
  });

  // window.util.setupWindow.dialog.addEventListener('mousedown', function (evt) {
  //   evt.preventDefault();
  //   var startCoords = {
  //     x: evt.clientX,
  //     y: evt.clientY
  //   };

  //   var dragged = false;

  //   var mouseMoveHandler = function (moveEvt) {
  //     moveEvt.preventDefault();
  //     dragged = true;

  //     var shift = {
  //       x: startCoords.x - moveEvt.clientX,
  //       y: startCoords.y - moveEvt.clientY
  //     };

  //     startCoords = {
  //       x: moveEvt.clientX,
  //       y: moveEvt.clientY
  //     };

  //     window.util.setupWindow.setup.style.top = (window.util.setupWindow.setup.offsetTop - shift.y) + 'px';
  //     window.util.setupWindow.setup.style.left = (window.util.setupWindow.setup.offsetLeft - shift.x) + 'px';
  //   };

  //   var mouseUpHandler = function (upEvt) {
  //     upEvt.preventDefault();

  //     document.removeEventListener('mousemove', mouseMoveHandler);
  //     document.removeEventListener('mouseup', mouseUpHandler);

  //     if (dragged) {
  //       var сlickPreventDefaultHandler = function (clickEvt) {
  //         clickEvt.preventDefault();
  //         window.util.setupWindow.dialog.removeEventListener('click', сlickPreventDefaultHandler);
  //       };
  //       window.util.setupWindow.dialog.addEventListener('click', сlickPreventDefaultHandler);
  //     }
  //   };

  //   document.addEventListener('mousemove', mouseMoveHandler);
  //   document.addEventListener('mouseup', mouseUpHandler);

  //   var closeDialogHandler = function () {
  //     window.util.setupWindow.setup.style.top = null;
  //     window.util.setupWindow.setup.style.left = null;
  //   };

  //   window.util.setupWindow.setupClose.addEventListener('click', closeDialogHandler);
  //   window.util.setupWindow.setupSubmit.addEventListener('click', closeDialogHandler);
  // });
})();
