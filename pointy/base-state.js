window.Pointy = window.Pointy || {};

function BaseState () {
}

BaseState.prototype.isMatch = function(frame) {
    throw new Error();
};

BaseState.prototype.start = function() {
    throw new Error();
};

BaseState.prototype.isTakingPlace = function() {
    throw new Error();
};

BaseState.prototype.stop = function() {
    throw new Error();
};

window.Pointy.BaseSTate = BaseState;
