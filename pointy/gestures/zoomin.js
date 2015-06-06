window.Pointy = window.Pointy || {};

(function () {
    function ZoomIn() {
        Base.call(this);
        this.handsWereMoving = false;
        this.initialDistance = 0;
        this.called = false;
    }

    ZoomIn.prototype = Object.create(BaseState.prototype);

    ZoomIn.prototype.isMatch = function (frame) {
        var i;
        var l;
        var v;
        var hand;

        var normal;

        var rightCondition = false;
        var leftCondition = false;

        var rightPosition = 0;
        var leftPosition = 0;

        if ( frame.hands.length === 1 ) {
            return ;
        }

        for (i = 0, l = frame.hands.length; i < l; i ++) {
            hand = frame.hands[i];
            normal = Math.abs(hand.palmNormal[0]);

            if ( hand.type === 'right' ) {
                if ( normal > 0.9 ) {
                    rightCondition = true;
                    rightPosition = hand.palmPosition[0];
                }
            }

            if ( hand.type === 'left' ) {
                if ( normal > 0.9 ) {
                    leftCondition = true;
                    leftPosition = hand.palmPosition[0];
                }
            }

        }

        if (rightCondition && leftCondition) {
            this.initialDistance = rightPosition - leftPosition;
            console.log('initialDistance: ' + this.initialDistance);
        }

        return rightCondition && leftCondition;
    }

    ZoomIn.prototype.clearState = function () {
        BaseState.prototype.clearState.call(this);
        this.handsWereMoving = false;
        this.called = false;
    }

    ZoomIn.prototype.updateState = function (frame) {
        if ( frame.hands.length < 2 ) {
            return false;
        }

        var i;
        var l;
        var v;
        var hand;

        var normal;
        var leftNormal;
        var rightNormal;
        var isMoving;

        var rightPosition = 0;
        var leftPosition = 0;

        for (i = 0, l = frame.hands.length; i < l; i ++) {
            hand = frame.hands[i];

            if ( hand.type === 'left' ) {
                leftNormal = Math.abs(hand.palmNormal[0]);
                leftPosition = hand.palmPosition[0];
            }

            if ( hand.type === 'right' ) {
                rightNormal = Math.abs(hand.palmNormal[0]);
                rightPosition = hand.palmPosition[0];
            }

            console.log(leftPosition);
            console.log(rightPosition);

            if ( leftPosition !== undefined && rightPosition !== undefined ) {


                if ( this.handsWereMoving && !this.called ) {
                    this.called = true;
                    setTimeout(this.callback, 300);
                    return Pointy.States.DONE;
                }

                if ( rightNormal < 0.5 || leftNormal < 0.5 ) {
                    return Pointy.States.DISCARDED;
                }

                if ( rightPosition - leftPosition > this.initialDistance + 50 ) {
                    this.handsWereMoving = true;
                }
            }

            return Pointy.States.PENDING;
        }

        return Pointy.States.PENDING;
    };

    window.Pointy.ZoomIn = new ZoomIn();
}());
