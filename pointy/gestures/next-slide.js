window.Pointy = window.Pointy || {};

(function () {
    function NextSlide() {
    }

    NextSlide.prototype = Object.create(BaseState.prototype);

    NextSlide.prototype.isMatch = function (frame) {
        var i;
        var l;
        var v;
        var hand;
        var res;

        var normal;

        var rightCondition = false;
        var leftCondition = false;

        if ( frame.hands.length === 1 ) {
            return ;
        }

        for (i = 0, l = frame.hands.length; i < l; i ++) {
            hand = frame.hands[i];
            normal = Math.abs(hand.palmNormal[0]);

            if ( hand.type === 'right' ) {
                if ( normal > 0.9 ) {
                    rightCondition = true;
                }
            }

            if ( hand.type === 'left' ) {
                if ( normal < 0.3 ) {
                    leftCondition = true;
                }
            }

            console.log(hand.type + ' ' + hand.palmNormal[0]);
        }

        return rightCondition && leftCondition;
    }

    NextSlide.prototype.start = function() {
        return ;
    };

    window.Pointy.NextSlide = new NextSlide();
}());
