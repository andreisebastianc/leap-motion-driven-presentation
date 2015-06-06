window.Pointy = window.Pointy || {};

(function iife () {
    function Loop (options) {
        this._options = options || { enableGestures: true };
    }

    var executing = null;
    var loop;

    var gestures = [
        {
            gesture: Pointy.NextSlide,
            callback: function () { debugger; }
        }
    ]

    Loop.prototype.start = function() {
        Leap.loop(this._options, function (frame) {
            var state;

            if ( executing ) {
                state = executing.callback.updateState(frame);
                console.log(state);

                if ( state !== Pointy.States.PENDING ) {
                    executing = null;
                }
            } else {
                for (var i = 0, l = gestures.length; i < l; i ++) {
                    var v = gestures[i];
                    if ( v.gesture.isMatch(frame) ) {
                        v.gesture.start(frame, v.callback);
                        executing = v;
                    }
                }
            }

            Pointy.Draw.isMatch(frame);
        });
    };

    loop = new Loop().start();

    window.Pointy.Loop = loop;
}());
