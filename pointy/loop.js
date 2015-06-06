window.Pointy = window.pointy || {};

function Loop (options) {
    this._options = options || { enableGestures: true };
}


Loop.prototype.start = function() {
    Leap.loop(this._options, function (frame) {
        var i;
        var l;
        var v;
        var hand;
        var res = '';

        for (i = 0, l = frame.hands.length; i < l; i ++) {
            hand = frame.hands[i];
            res += ' ' + hand.type;
            res += ' ' + hand.palmNormal;
        }

        console.log(res);
    });
};

new Loop().start();

window.Pointy.Loop = Loop;
