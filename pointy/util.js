window.Pointy = window.pointy || {};

function Util () {
}

Util.Finger = {
    Thumb: 'Thumb',
    Index: 'Index',
    Middle: 'Middle',
    Ring: 'Ring',
    Pinky: 'Pinky'
};

Util.FingerByType = [
    Util.Finger.Thumb,
    Util.Finger.Index,
    Util.Finger.Middle,
    Util.Finger.Ring,
    Util.Finger.Pinky
];

Util.getFingerName = function (fingerType) {
    return Util.FingerByType[fingerType];
}

window.Pointy.Util = Util;
