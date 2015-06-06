window.Pointy = window.Pointy || {};

(function () {
    function Draw() {
    }

    Draw.prototype = Object.create(BaseState.prototype);

    Draw.prototype.isMatch = function (frame) {

      if (frame.hands.length != 1) {
        console.log("no hands");
        return
      }

      var hand = frame.hands[0];
      var indexFinger;

      for (var f = 0; f < hand.fingers.length; f++) {
        if (hand.fingers[f].type == 1) {
          indexFinger = hand.fingers[f];
          break;
        }
      }

      if (!indexFinger) {
        console.log("no index");
        return;
      }

      return indexFinger.extended;
    }

    Draw.prototype.start = function() {
        return ;
    };

    window.Pointy.Draw = new Draw();
}());
