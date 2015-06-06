window.Pointy = window.Pointy || {};

(function iife () {
    function Loop (options) {
        this._options = options || { enableGestures: true };
    }

    var executing = null;
    var loop;

    Loop.prototype.start = function() {
        Leap.loop(this._options, function (frame) {
            if ( executing ) {
                if ( !executing.isTakingPlace(frame) ) {
                    // handle gesture that took place
                    // clean current gesture
                    executing = null;
                }
                return;
            }

            if ( Pointy.NextSlide.isMatch(frame) ) {
                Pointy.NextSlide.start();
                executing = Pointy.NextSlide;
                debugger;
            }

            Pointy.Draw.isMatch(frame);
        });
    };

    loop = new Loop().start();

    window.Pointy.Loop = loop;
}());
