window.Pointy = window.Pointy || {};

function BaseState () {
    this.frame = null;
    this.callback = null;
}

BaseState.prototype.isMatch = function(frame) {
    throw new Error();
};

BaseState.prototype.start = function(frame, callback) {
    this.frame = frame;
    this.callback = callback;
};

BaseState.prototype.updateState = function() {
    throw new Error();
};

BaseState.prototype.clearState = function () {
    this.frame = null;
    this.callback = null;
}

window.Pointy.BaseSTate = BaseState;
