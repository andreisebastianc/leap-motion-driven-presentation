(function () {
  "use strict";

  function resizeCanvas() {
    view.setViewSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', resizeCanvas, false);

  paper.install(window);
  paper.setup(canvas);
  resizeCanvas();

  var path;
  var tool = new Tool();

	tool.onMouseDown = function(event) {
		path = new Path();
		path.strokeColor = 'red';
    path.strokeWidth = 5;
		path.add(event.point);
	}

	tool.onMouseDrag = function(event) {
		path.add(event.point);
	}

  tool.onMouseUp = function (event) {
    setTimeout(function () {
      path.remove();
      view.draw();
    }, 5000);
  }
})();
