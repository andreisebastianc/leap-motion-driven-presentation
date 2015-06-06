window.Pointy = window.Pointy || {};

(function () {
    function NextSlide() {
        Base.call(this);
        this.handWasMoving = false;
    }

    NextSlide.prototype = Object.create(BaseState.prototype);

    NextSlide.prototype.isMatch = function (frame) {
        var i;
        var l;
        var v;
        var hand;

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

        }

        return rightCondition && leftCondition;
    }

    NextSlide.prototype.handIsMoving = function(hand) {
        var movement = hand.translation(this.frame);
        if ( movement[0] > 2 ) {
            return true;
        }
    };

    NextSlide.prototype.clearState = function () {
        BaseState.prototype.clearState.call(this);
        this.handWasMoving = false;
    }

    NextSlide.prototype.updateState = function (frame) {
        if ( frame.hands.length < 2 ) {
            return false;
        }

        var i;
        var l;
        var v;
        var hand;

        var normal;
        var isMoving;

        for (i = 0, l = frame.hands.length; i < l; i ++) {
            hand = frame.hands[i];
            normal = Math.abs(hand.palmNormal[0]);

            if ( hand.type === 'left' ) {
                if ( normal > 0.3 ) {
                    return Pointy.States.DISCARDED;
                }
            }

            if ( hand.type === 'right' ) {
                isMoving = this.handIsMoving(hand);

                if ( normal > 0.7 ) {
                    if ( this.handWasMoving && !isMoving ) {
                        return Pointy.States.DONE;
                    }
                    else if ( isMoving ) {
                        this.handWasMoving = true;
                    }
                } else {
                    return Pointy.States.DISCARDED;
                }
            }
        }

        return Pointy.States.PENDING;
    };

    window.Pointy.NextSlide = new NextSlide();
}());
