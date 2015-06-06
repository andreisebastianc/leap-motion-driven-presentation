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

Util.setTransitionZoom = function () {
    Reveal.configure({transition: 'zoom'});
}

Util.setTransitionSlide = function () {
    Reveal.configure({transition: 'slide'});
}

window.Pointy.Util = Util;
