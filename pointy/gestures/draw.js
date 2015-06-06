window.Pointy = window.Pointy || {};

(function () {

  function resizeCanvas() {
    view.setViewSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', resizeCanvas, false);

  function Draw() {
    paper.install(window);
    paper.setup(canvas);
    resizeCanvas();

    this.screenCenter = [window.innerWidth / 2, window.innerHeight / 2];
    this.initialPointerPos = null;

    this.pointer = new Path.Circle(this.screenCenter, 5);
    this.pointer.strokeColor = "red";
    this.pointer.fillColor = "red";
    this.pointer.strokeColor.alpha = 0;
    this.pointer.fillColor.alpha = 0;

    this.drawing = false;

    this.path = null;

    this.ampFactor = 3;
    view.draw();
  }

  Draw.prototype = Object.create(BaseState.prototype);

  Draw.prototype.isMatch = function (frame) {

    if (frame.hands.length != 1) {
      return
    }

    var hand = frame.hands[0];
    var indexFinger, thumbFinger;

    for (var f = 0; f < hand.fingers.length; f++) {
      if (hand.fingers[f].type == 1) {
        indexFinger = hand.fingers[f];
      }

      if (hand.fingers[f].type == 0) {
        thumbFinger = hand.fingers[f];
      }

      if (thumbFinger && indexFinger) {
        break;
      }
    }

    if (!indexFinger || !thumbFinger || !indexFinger.extended) {
      this.pointer.strokeColor.alpha = 0;
      this.pointer.fillColor.alpha = 0;
      return;
    }

    this.pointer.strokeColor.alpha = 1;
    this.pointer.fillColor.alpha = 1;

    if (!this.initialPointerPos) {
      this.initialPointerPos = [indexFinger.stabilizedTipPosition[0], indexFinger.stabilizedTipPosition[1]];
    }

    var currentPos = [indexFinger.stabilizedTipPosition[0], indexFinger.stabilizedTipPosition[1]];
    var delta = [currentPos[0] - this.initialPointerPos[0], currentPos[1] - this.initialPointerPos[1]];
    var newPos = [this.screenCenter[0] + delta[0] * this.ampFactor, this.screenCenter[1] - delta[1] * this.ampFactor];

    this.pointer.position = new Point(newPos);

    if (!thumbFinger.extended) {
        if (!this.drawing) {
          console.log("Start drawing");
          this.drawing = true;
          this.path = new Path();
          this.path.strokeColor = "red";
          this.path.strokeWidth = 5;
        }

        this.path.add(new Point(newPos));
    }

    if (thumbFinger.extended && this.drawing) {
      console.log("Stopped drawing");
      this.drawing = false;

      setTimeout((function (path) {
        return function () {
          path.remove();
          view.draw();
        }
      })(window.Pointy.Draw.path), 3000);
    }


    view.draw();
  }

  Draw.prototype.start = function() {
      return;
  };

  window.Pointy.Draw = new Draw();
}());
