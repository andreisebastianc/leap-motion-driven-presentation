window.Pointy = window.Pointy || {};

(function () {
    function PreviousSlide() {
        Base.call(this);
        this.handWasMoving = false;
    }

    PreviousSlide.prototype = Object.create(BaseState.prototype);

    PreviousSlide.prototype.isMatch = function (frame) {
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
                if ( normal < 0.3 ) {
                    rightCondition = true;
                }
            }

            if ( hand.type === 'left' ) {
                if ( normal > 0.9 ) {
                    leftCondition = true;
                }
            }

        }

        return rightCondition && leftCondition;
    }

    PreviousSlide.prototype.handIsMoving = function(hand) {
        var movement = hand.translation(this.frame);
        if ( movement[0] > 2 ) {
            return true;
        }
    };

    PreviousSlide.prototype.clearState = function () {
        BaseState.prototype.clearState.call(this);
        this.handWasMoving = false;
    }

    PreviousSlide.prototype.updateState = function (frame) {
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
                isMoving = this.handIsMoving(hand);

                if ( normal > 0.5 ) {
                    if ( this.handWasMoving && !isMoving ) {
                        if ( this.callback ) {
                            this.callback();
                        }
                        return Pointy.States.DONE;
                    }
                    else if ( isMoving ) {
                        this.handWasMoving = true;
                    }
                } else {
                    return Pointy.States.DISCARDED;
                }
                
            }

            if ( hand.type === 'right' ) {
                if ( normal > 0.5 ) {
                    return Pointy.States.DISCARDED;
                }
            }
        }

        return Pointy.States.PENDING;
    };

    window.Pointy.PreviousSlide = new PreviousSlide();
}());
